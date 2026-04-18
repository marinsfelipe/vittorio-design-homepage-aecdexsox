routerAdd('POST', '/backend/v1/auth/login', (e) => {
  const body = e.requestInfo().body || {}
  if (!body.email || !body.password) return e.badRequestError('Missing email or password')

  // Leverage native auth endpoint internally to securely validate password hashing
  const authRes = $http.send({
    url: 'http://127.0.0.1:8090/api/collections/users/auth-with-password',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: body.email, password: body.password }),
    timeout: 10,
  })

  if (authRes.statusCode !== 200) {
    return e.unauthorizedError('Invalid credentials')
  }

  const userId = authRes.json.record.id
  const user = $app.findRecordById('_pb_users_auth_', userId)

  if (!user.getBool('is_active')) {
    return e.unauthorizedError('Account inactive')
  }

  // Generate custom session token and JWT
  const token = $security.randomString(32)
  const jwt = $security.createJWT(
    { id: userId, token: token },
    $secrets.get('PB_SUPERUSER_TOKEN') || 'secret',
    86400,
  )

  const sessions = $app.findCollectionByNameOrId('sessions')
  const session = new Record(sessions)
  session.set('user_id', userId)
  session.set('token', token)
  const expires = new Date(Date.now() + 86400000)
  session.set('expires_at', expires.toISOString().replace('T', ' '))
  session.set('ip_address', e.request.remoteAddr.split(':')[0])
  $app.save(session)

  user.set('last_login', new Date().toISOString().replace('T', ' '))
  $app.saveNoValidate(user)

  // Return standard format expected by JS SDK
  return e.json(200, { token: jwt, record: user.publicExport() })
})
