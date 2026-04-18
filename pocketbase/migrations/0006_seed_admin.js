migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'contato@vittoriodesign.com.br')
      return // already exists
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('contato@vittoriodesign.com.br')
    record.setPassword('Skip@Pass123')
    record.setVerified(true)
    record.set('name', 'Admin Vittorio')
    record.set('role', 'admin')
    record.set('is_active', true)
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'contato@vittoriodesign.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
