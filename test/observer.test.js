import cans, { observer, inject } from '../lib'
import { observable, action } from '../mobx'
import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'

describe('Observer', () => {

  describe('normal observable', () => {
    const app = cans()

    const counterModel = {
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
    }

    app.model(counterModel)

    const Counter = inject(({ models }) => {
      return (
        <div>
          <span id='count'>{models.counter.count}</span>
          <Toolbar title='test' />
        </div>
      )
    })

    const Toolbar = inject(({ models, title }) => {
      return (
        <div>
          <div id='title'>{title}</div>
          <button onClick={models.counter.incr}>+</button>
          <button onClick={models.counter.decr}>-</button>
        </div>
      )
    })

    const wrapped = shallow(<Counter.wrappedComponent models={{ counter: app.models.counter }} />)

    it('should increase count', done => {
      app.models.counter.incr()
      assert.equal(wrapped.find('#count').first().text(), '1')
      done()
    })

    it('should decre count', done => {
      app.models.counter.decr()
      app.models.counter.decr()
      assert.equal(wrapped.find('#count').first().text(), '-1')
      done()
    })
  })

  describe('high order observable', () => {
    const app = cans()

    const counterModel = {
      namespace: 'counter',
      observable: app => observable({
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
    }

    app.model(counterModel)

    const Counter = inject(({ models }) => {
      return (
        <div>
          <span id='count'>{models.counter.count}</span>
          <Toolbar title='test' />
        </div>
      )
    })

    const Toolbar = inject(({ models, title }) => {
      return (
        <div>
          <div id='title'>{title}</div>
          <button onClick={models.counter.incr}>+</button>
          <button onClick={models.counter.decr}>-</button>
        </div>
      )
    })

    const wrapped = shallow(<Counter.wrappedComponent models={{ counter: app.models.counter }} />)

    it('should increase count', done => {
      app.models.counter.incr()
      assert.equal(wrapped.find('#count').first().text(), '1')
      done()
    })

    it('should decre count', done => {
      app.models.counter.decr()
      app.models.counter.decr()
      assert.equal(wrapped.find('#count').first().text(), '-1')
      done()
    })
  })

})
