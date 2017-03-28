# cans

[![npm](https://img.shields.io/npm/v/cans.svg)](https://www.npmjs.com/package/cans)
[![circle](https://circleci.com/gh/djyde/cans.svg?style=shield)](https://circleci.com/gh/djyde/cans)
[![David](https://img.shields.io/david/djyde/cans.svg)]()

Building React MobX application in [choo](https://github.com/yoshuawuyts/choo) way

## Quick Demo

```js
import cans, { inject } from 'cans'
import { observable, action } from 'cans/mobx' // MobX core
import { BrowserRouter, Route } from 'cans/router' // react-router(v4) core

const app = cans()

// model
app.model({
  namespace: 'counter',

  // MobX Observable
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

// view
const Counter = inject(({ models }) => {
  return (
    <div>
      <span>{models.counter.count}</span>
      <button onClick={models.counter.incr}>+</button>
      <button onClick={models.counter.decr}>-</button>
    </div>
  )
}))

// router
const route = () => (
  <BrowserRouter>
    <Route path='/counter' component={Counter} />
  </BrowserRouter>
)

app.route(route)

// mount the app
app.start(document.querySelector('#app'))
```

## APIs

#### `app = cans()`

Create new `cans` application instance.

#### `app.model(model: { namespace: string, observable: MobXObservable })`

Registry app model.

#### `app.route(() => ReactRouterElement)`

Registry router. The React router will be wrapped in `mobx-react`'s `<Provider>`.

### `inject(view)`

mobx-react inject helper. Will inject the registried models wich will be pass to view props, and automatically wrapped the view with `observer`

## See Also

- [React-Router](https://github.com/ReactTraining/react-router)
- [MobX](https://mobxjs.github.io/mobx/)

# License

MIT License
