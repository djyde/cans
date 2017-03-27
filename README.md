# cans

Building MobX in Choo way

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

#### `cans()`

Create new `cans` application instance.

#### `app.store(MobXObservable)`

Registry MobX store.

#### `app.route(ReactRouterComponent)`

Registry router

#### `app.observer(component: ({ stores, ...props }) => JSX.Element)`

# License

MIT License