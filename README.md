# cans

[![npm](https://img.shields.io/npm/v/cans.svg)](https://www.npmjs.com/package/cans)
[![circle](https://circleci.com/gh/djyde/cans.svg?style=shield)](https://circleci.com/gh/djyde/cans)
[![David](https://img.shields.io/david/djyde/cans.svg)]()

Building React MobX application in [choo](https://github.com/yoshuawuyts/choo) way

## Quick Demo

```js
import cans from 'cans'
import { observable, action } from 'cans/mobx' // MobX core
import { BrowserRouter, Route } from 'cans/router' // react-router(v4) core

const app = cans()

// MobX observable
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

// Registry stores
app.store(counterStore)

// View
const Counter = app.observer(({ stores }) => {
  return (
    <div>
      <span>{stores.counterStore.count}</span>
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

// Registry route
app.route(route)

// mount the app
app.start(document.querySelector('#app'))
```

## APIs

#### `app = cans()`

Create new `cans` application instance.

#### `app.store(MobXObservable)`

Registry MobX store.

#### `app.route(ReactRouterComponent)`

Registry router

#### `app.observer(component: ({ stores, ...props }) => JSX.Element)`

## See Also

- [React-Router](https://github.com/ReactTraining/react-router)
- [MobX](https://mobxjs.github.io/mobx/)

# License

MIT License
