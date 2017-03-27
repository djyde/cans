import cans, { observer, inject } from '../lib'
import { observable, action } from '../mobx'
import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'

describe('Observer', () => {

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

  const Counter = inject('counter')(observer(({ counter }) => {
    return (
      <div>
        <span id='count'>{counter.count}</span>
        <Toolbar />
      </div>
    )
  }))

  const Toolbar = inject('counter')(observer(({ counter }) => {
    return (
      <div>
        <button onClick={counter.incr}>+</button>
        <button onClick={counter.decr}>-</button>
      </div>
    )
  }))

  const wrapped = shallow(<Counter.wrappedComponent counter={counterModel.observable} />)

  it('should increase count', done => {
    counterModel.observable.incr()
    assert.equal(wrapped.find('#count').first().text(), '1')
    done()
  })

  it('should decre count', done => {
    counterModel.observable.decr()
    counterModel.observable.decr()
    assert.equal(wrapped.find('#count').first().text(), '-1')
    done()    
  })

})
