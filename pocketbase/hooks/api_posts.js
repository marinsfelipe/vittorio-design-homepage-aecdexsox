routerAdd('GET', '/backend/v1/public/posts', (e) => {
  const start = Date.now()
  const ip = e.request.remoteAddr.split(':')[0]
  const minuteAgo = new Date(Date.now() - 60000).toISOString().replace('T', ' ')

  const recent = $app.findRecordsByFilter(
    'api_request_log',
    `ip_address = '${ip}' && created >= '${minuteAgo}'`,
    '',
    100,
    0,
  )
  if (recent.length >= 100) return e.json(429, { error: 'Too many requests' })

  try {
    const records = $app.findRecordsByFilter(
      'posts',
      'is_deleted = false && is_published = true',
      '-published_at',
      100,
      0,
    )

    const log = new Record($app.findCollectionByNameOrId('api_request_log'))
    log.set('endpoint', e.request.url.path)
    log.set('method', 'GET')
    log.set('status_code', 200)
    log.set('response_time_ms', Date.now() - start)
    log.set('ip_address', ip)
    $app.saveNoValidate(log)

    return e.json(
      200,
      records.map((r) => r.publicExport()),
    )
  } catch (err) {
    return e.internalServerError(err.message)
  }
})
