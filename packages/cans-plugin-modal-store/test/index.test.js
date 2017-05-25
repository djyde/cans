const cans = require('cans')
const modalStorePlugin = require('../')
const assert = require('power-assert')

describe('modal store', () => {
  const app = cans.default()

  app.use(modalStorePlugin, {
    modals: [
      { name: 'createUser', title: (record) => record.id ? 'Edit user' : 'New user' }
    ]
  })

  beforeEach(() => {
    app.models.modals.createUser.hide()
  })

  it('show/hide', done => {
    app.models.modals.createUser.show()
    assert(app.models.modals.createUser.visible === true)
    app.models.modals.createUser.hide()
    assert(app.models.modals.createUser.visible === false)
    done()
  })

  it('should get title by record', done => {
    app.models.modals.createUser.show()
    assert.equal(app.models.modals.createUser.title, 'New user')

    app.models.modals.createUser.show({ id: '234', title: 'hi' })
    assert.equal(app.models.modals.createUser.title, 'Edit user')
    done()
  })

  it('should reset record', done => {
    app.models.modals.createUser.show({ id: '234', title: 'hi' })
    assert.equal(app.models.modals.createUser.record.id, '234')
    app.models.modals.createUser.resetRecord()
    assert(!app.models.modals.createUser.record.id)
    assert.equal(app.models.modals.createUser.title, 'New user')
    done()
  })
})
