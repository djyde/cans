import moo from '../lib'
import { BrowserRouter, Route } from '../router'
import React from 'react'
import { observable, action } from '../mobx'

const app = moo()

const counterStore = observable({
  namespace: 'counterStore',

  // state
  count: 0,

  // action
  incr: action.bound(function () {
    this.count += 1
  }),
  decr: action.bound(function () {
    this.count -= 1
  })
})

app.store(counterStore)

const Counter = app.observer(({ stores }) => {
  return (
    <div>
      <span>{stores.counterStore.count}</span>
      <Toolbar />
    </div>
  )
})

const Toolbar = app.observer(({ stores }) => {
  return (
    <div>
      <button onClick={stores.counterStore.incr}>+</button>
      <button onClick={stores.counterStore.decr}>-</button>
    </div>
  )
})

const route = () => (
  <BrowserRouter>
    <Route path='/' component={Counter} />
  </BrowserRouter>
)

app.route(route)

app.start(document.querySelector('#app'))
