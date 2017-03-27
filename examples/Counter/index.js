import React from 'react'
import { observer, inject } from '../../lib'

const Counter = inject('counter')(observer(({ counter }) => {
  return (
    <div>
      <span>{counter.count}</span>
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

module.exports = Counter
