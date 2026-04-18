onRecordAfterCreateSuccess((e) => {
  const collectionsToLog = ['products', 'promotions', 'posts', 'users', 'images', 'webhooks']
  if (!collectionsToLog.includes(e.collection.name)) return e.next()

  const log = new Record($app.findCollectionByNameOrId('audit_log'))
  log.set('action', 'CREATE')
  log.set('entity_type', e.collection.name)
  log.set('entity_id', e.record.id)
  log.set('new_values', e.record.publicExport())

  if (e.record.get('created_by')) {
    log.set('user_id', e.record.get('created_by'))
  }
  $app.saveNoValidate(log)
  e.next()
})
