const cans = require('cans')
const { observable, action } = require('cans/mobx')
const { restPlugin } = require('../dist/cansPluginHttp.common.js')
const assert = require('power-assert')

describe('rest', () => {
  const app = cans.default()

  const ENDPOINT = 'http://jsonplaceholder.typicode.com'

  app.use(restPlugin, {
    resources: [ { name: 'posts', url: ENDPOINT } ]
  })

  it('should wait for fetching', done => {
    assert.deepEqual(app.models.rest.posts.data.index, [])
    assert(app.models.rest.posts.loading.index === false)
    done()
  })

  it('should fetch resource', done => {
    app.models.rest.posts.index()
      .then((res) => {
        assert.equal(res.status, 200)
        assert(app.models.rest.posts.data.index.length > 0)
        assert(app.models.rest.posts.loading.index === false)
        done()
      })
      .catch(e => {
        done(e)
      })
  }).timeout(10000)

  it('should create resource', done => {
    const body = { title: 'bar' }
    app.models.rest.posts.create(body)
      .then((res) => {
        assert.equal(res.status, 201)
        assert.equal(res.data.title, body.title)
        assert(app.models.rest.posts.loading.create === false)
        done()
      })
      .catch(e => {
        done(e)
      })
  }).timeout(10000)

  it('should update resource', done => {
    const id = '12'
    const body = { title: 'bar' }
    app.models.rest.posts.update(id, body)
      .then((res) => {
        assert.equal(res.status, 200)
        assert.equal(res.data.title, body.title)
        assert(app.models.rest.posts.loading.update === false)
        done()
      })
      .catch(e => {
        done(e)
      })
  }).timeout(10000)

  it('should delete resource', done => {
    const id = '12'
    app.models.rest.posts.delete(id)
      .then((res) => {
        assert.equal(res.status, 200)
        assert(app.models.rest.posts.loading.delete === false)
        done()
      })
      .catch(e => {
        done(e)
      })
  }).timeout(10000)
})