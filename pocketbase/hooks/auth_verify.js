routerAdd('GET', '/backend/v1/auth/verify', (e) => {
  const authHeader = e.request.header.get('Authorization') || ''
  const tokenStr = authHeader.replace('Bearer ', '').trim()
  if (!tokenStr) return e.unauthorizedError('Missing token')

  try {
    const payload = $security.parseJWT(tokenStr, $secrets.get('PB_SUPERUSER_TOKEN') || 'secret')
    const session = $app.findFirstRecordByData('sessions', 'token', payload.token)
    const expires = new Date(session.getString('expires_at'))

    if (expires < new Date()) {
      $app.delete(session)
      return e.unauthorizedError('Token expired')
    }

    const user = $app.findRecordById('_pb_users_auth_', session.getString('user_id'))
    if (!user.getBool('is_active')) return e.unauthorizedError('Account inactive')

    return e.json(200, { valid: true, record: user.publicExport() })
  } catch (_) {
    return e.unauthorizedError('Invalid or missing token')
  }
})
