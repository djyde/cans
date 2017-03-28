import React from 'react'
import { observer, inject, mobxInject } from '../../lib'

const Counter = inject(({ models }) => {
  return (
    <div>
      <span>{models.counter.count}</span>
      <Toolbar title='test'/>
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

module.exports = Counter
