import cans from '../lib'
import { observable, action } from '../mobx'
import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'

import { BrowserRouter, Route } from '../router'

describe('cans', () => {

  let app

  const App = () => <div>cans index</div>

  const router = () => (
    <BrowserRouter>
      <Route path='/' component={App} />
    </BrowserRouter>
  )

  const rootEl = document.querySelector('#app')

  beforeEach(() => {
    app = cans()
  })

  afterEach(() => {
    app = null
  })

  describe('#route', () => {

    it('should set route', done => {
      app.route(router)
      assert(app.__routerComponent)
      done()
    })
  })

  describe('#start', () => {
    it('should throw error if router is not defined', done => {
      assert.throws(app.start)
      done()
    })

    it('should mount to specific element', done => {
      app.route(router)
      app.start(rootEl)
      assert(app.__mountedRoot === rootEl)
      done()
    })
  })
})
