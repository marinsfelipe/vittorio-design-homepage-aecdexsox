routerAdd('GET', '/backend/v1/public/products/{id}', (e) => {
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

  const id = e.request.pathValue('id')
  try {
    const record = $app.findFirstRecordByFilter('products', `id = '${id}' && is_deleted = false`)
    const images = $app.findRecordsByFilter(
      'product_images',
      `product_id = '${id}'`,
      'display_order',
      100,
      0,
    )

    const result = record.publicExport()
    result.images = images.map((i) => i.publicExport())

    const log = new Record($app.findCollectionByNameOrId('api_request_log'))
    log.set('endpoint', e.request.url.path)
    log.set('method', 'GET')
    log.set('status_code', 200)
    log.set('response_time_ms', Date.now() - start)
    log.set('ip_address', ip)
    $app.saveNoValidate(log)

    return e.json(200, result)
  } catch (_) {
    return e.notFoundError('Product not found')
  }
})
