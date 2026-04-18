routerAdd('GET', '/backend/v1/public/products', (e) => {
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
    const page = parseInt(e.request.url.query().get('page')) || 1
    const limit = 20
    const offset = (page - 1) * limit

    const records = $app.findRecordsByFilter(
      'products',
      'is_deleted = false',
      '-created',
      limit,
      offset,
    )
    const total = $app.countRecords('products', 'is_deleted = false')

    const log = new Record($app.findCollectionByNameOrId('api_request_log'))
    log.set('endpoint', e.request.url.path)
    log.set('method', 'GET')
    log.set('status_code', 200)
    log.set('response_time_ms', Date.now() - start)
    log.set('ip_address', ip)
    $app.saveNoValidate(log)

    return e.json(200, {
      items: records.map((r) => r.publicExport()),
      total: total,
      page: page,
      limit: limit,
    })
  } catch (err) {
    return e.internalServerError(err.message)
  }
})
