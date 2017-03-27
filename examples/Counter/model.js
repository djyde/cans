import { observable, action } from '../../mobx'

exports.counterStore = observable({
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
