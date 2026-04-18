onRecordAfterDeleteSuccess((e) => {
  const collectionsToLog = ['products', 'promotions', 'posts', 'users', 'images', 'webhooks']
  if (!collectionsToLog.includes(e.collection.name)) return e.next()

  const log = new Record($app.findCollectionByNameOrId('audit_log'))
  log.set('action', 'DELETE')
  log.set('entity_type', e.collection.name)
  log.set('entity_id', e.record.id)
  log.set('old_values', e.record.publicExport())

  $app.saveNoValidate(log)
  e.next()
})
