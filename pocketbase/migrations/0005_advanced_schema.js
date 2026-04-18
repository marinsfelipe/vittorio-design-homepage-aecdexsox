migrate(
  (app) => {
    // 1. Update Users Collection
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!users.fields.getByName('role'))
      users.fields.add(new SelectField({ name: 'role', maxSelect: 1, values: ['admin', 'editor'] }))
    if (!users.fields.getByName('last_login'))
      users.fields.add(new DateField({ name: 'last_login' }))
    if (!users.fields.getByName('is_active')) users.fields.add(new BoolField({ name: 'is_active' }))
    app.save(users)

    // 2. Update Products Collection
    const products = app.findCollectionByNameOrId('products')

    // Clean duplicates before adding unique index
    app
      .db()
      .newQuery(
        `DELETE FROM products WHERE id NOT IN (SELECT MIN(id) FROM products GROUP BY code) AND code IS NOT NULL AND code != ''`,
      )
      .execute()

    if (!products.fields.getByName('code')) products.fields.add(new TextField({ name: 'code' }))

    // Replace old 'line' field with new Select field
    if (products.fields.getByName('line')) products.fields.removeByName('line')
    products.fields.add(
      new SelectField({
        name: 'line',
        maxSelect: 1,
        values: ['Strongest', 'Speciale', 'Aprezzo', 'Fredda'],
      }),
    )

    if (!products.fields.getByName('description'))
      products.fields.add(new TextField({ name: 'description' }))
    if (!products.fields.getByName('price'))
      products.fields.add(new NumberField({ name: 'price', min: 0 }))
    if (!products.fields.getByName('stock'))
      products.fields.add(new NumberField({ name: 'stock', min: 0, onlyInt: true }))
    if (!products.fields.getByName('specifications'))
      products.fields.add(new JSONField({ name: 'specifications' }))
    if (!products.fields.getByName('is_deleted'))
      products.fields.add(new BoolField({ name: 'is_deleted' }))
    if (!products.fields.getByName('created_by'))
      products.fields.add(
        new RelationField({ name: 'created_by', collectionId: '_pb_users_auth_', maxSelect: 1 }),
      )

    products.listRule = 'is_deleted = false'
    products.viewRule = 'is_deleted = false'
    app.save(products)
    products.addIndex('idx_products_code', true, 'code', "code != ''")
    app.save(products)

    // 3. Create Sessions Collection
    const sessions = new Collection({
      name: 'sessions',
      type: 'base',
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'token', type: 'text', required: true },
        { name: 'expires_at', type: 'date', required: true },
        { name: 'ip_address', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_sessions_token ON sessions (token)'],
    })
    app.save(sessions)

    // 4. Create Promotions Collection
    const promotions = new Collection({
      name: 'promotions',
      type: 'base',
      listRule: 'is_deleted = false',
      viewRule: 'is_deleted = false',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'image_url', type: 'text' },
        { name: 'discount_percent', type: 'number', min: 0, max: 100 },
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
        { name: 'is_active', type: 'bool' },
        { name: 'is_deleted', type: 'bool' },
        { name: 'created_by', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(promotions)

    // 5. Create Product Images Collection
    const product_images = new Collection({
      name: 'product_images',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'product_id',
          type: 'relation',
          required: true,
          collectionId: products.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'image_url', type: 'text', required: true },
        { name: 'alt_text', type: 'text' },
        { name: 'display_order', type: 'number', min: 0, onlyInt: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(product_images)

    // 6. Create Posts Collection
    const posts = new Collection({
      name: 'posts',
      type: 'base',
      listRule: 'is_deleted = false',
      viewRule: 'is_deleted = false',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'editor' },
        { name: 'excerpt', type: 'text' },
        { name: 'featured_image_url', type: 'text' },
        { name: 'is_published', type: 'bool' },
        { name: 'published_at', type: 'date' },
        { name: 'is_deleted', type: 'bool' },
        { name: 'created_by', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(posts)

    // 7. Create Images Collection
    const images = new Collection({
      name: 'images',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'filename', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'alt_text', type: 'text' },
        {
          name: 'category',
          type: 'select',
          maxSelect: 1,
          values: ['Produtos', 'Promoções', 'Blog', 'Outros'],
        },
        { name: 'file_size', type: 'number', min: 0, onlyInt: true },
        { name: 'dimensions', type: 'text' },
        { name: 'uploaded_by', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(images)

    // 8. Create Audit Log Collection
    const audit_log = new Collection({
      name: 'audit_log',
      type: 'base',
      listRule: "@request.auth.role = 'admin'",
      viewRule: "@request.auth.role = 'admin'",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'user_id', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'action', type: 'text', required: true },
        { name: 'entity_type', type: 'text', required: true },
        { name: 'entity_id', type: 'text', required: true },
        { name: 'old_values', type: 'json' },
        { name: 'new_values', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(audit_log)

    // 9. Create API Request Log Collection
    const api_request_log = new Collection({
      name: 'api_request_log',
      type: 'base',
      listRule: "@request.auth.role = 'admin'",
      viewRule: "@request.auth.role = 'admin'",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'endpoint', type: 'text', required: true },
        { name: 'method', type: 'text', required: true },
        { name: 'status_code', type: 'number', onlyInt: true },
        { name: 'response_time_ms', type: 'number', onlyInt: true },
        { name: 'ip_address', type: 'text' },
        { name: 'user_id', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_api_request_log_ip_created ON api_request_log (ip_address, created)',
      ],
    })
    app.save(api_request_log)

    // 10. Create Webhooks Collection
    const webhooks = new Collection({
      name: 'webhooks',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'url', type: 'text', required: true },
        { name: 'event_type', type: 'text', required: true },
        { name: 'is_active', type: 'bool' },
        { name: 'created_by', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(webhooks)
  },
  (app) => {
    // Migrations are immutable in production. Revert logic omitted for brevity.
  },
)
