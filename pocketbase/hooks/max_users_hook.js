onRecordValidate((e) => {
  if (e.record.getBool('is_active')) {
    const count = $app.countRecords('_pb_users_auth_', 'is_active = true')
    const isNew = e.record.isNew()
    const wasActive = !isNew && e.record.original().getBool('is_active')

    if ((isNew || !wasActive) && count >= 3) {
      throw new BadRequestError('Maximum of 3 active users allowed by business rules')
    }
  }
  e.next()
}, '_pb_users_auth_')
