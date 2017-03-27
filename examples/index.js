import cans from '../lib'
import { BrowserRouter, Route } from '../router'
import React from 'react'
import { observable, action } from '../mobx'
import Counter from './Counter'
import { counterStore } from './Counter/model'

const app = cans()

app.model({
  namespace: 'counter',
  observable: observable({
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
})

const route = () => (
  <BrowserRouter>
    <Route path='/' component={Counter} />
  </BrowserRouter>
)

app.route(route)

app.start(document.querySelector('#app'))
