import moo from '../lib'
import { observable, action } from '../mobx'
import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'

describe('Observer', () => {

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
        <span id='count'>{stores.counterStore.count}</span>
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

  const wrapped = shallow(<Counter.wrappedComponent stores={{counterStore}} />)

  it('should increase count', done => {
    counterStore.incr()
    assert(wrapped.find('#count').first().text() === '1')
    done()
  })

  it('should decre count', done => {
    counterStore.decr()
    assert(wrapped.find('#count').first().text() === '0')
    done()
  })

})