routerAdd('POST', '/backend/v1/auth/logout', (e) => {
  const authHeader = e.request.header.get('Authorization') || ''
  const tokenStr = authHeader.replace('Bearer ', '').trim()
  if (!tokenStr) return e.json(200, { success: true })

  try {
    const payload = $security.parseUnverifiedJWT(tokenStr)
    if (payload && payload.token) {
      try {
        const session = $app.findFirstRecordByData('sessions', 'token', payload.token)
        $app.delete(session)
      } catch (_) {}
    }
  } catch (_) {}
  return e.json(200, { success: true })
})
