onRecordAfterUpdateSuccess((e) => {
  const collectionsToLog = ['products', 'promotions', 'posts', 'users', 'images', 'webhooks']
  if (!collectionsToLog.includes(e.collection.name)) return e.next()

  const log = new Record($app.findCollectionByNameOrId('audit_log'))
  log.set('action', 'UPDATE')
  log.set('entity_type', e.collection.name)
  log.set('entity_id', e.record.id)
  log.set('old_values', e.record.original().publicExport())
  log.set('new_values', e.record.publicExport())

  if (e.record.get('updated_by') || e.record.get('created_by')) {
    log.set('user_id', e.record.get('updated_by') || e.record.get('created_by'))
  }
  $app.saveNoValidate(log)
  e.next()
})
