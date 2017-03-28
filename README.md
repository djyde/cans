# cans

[![npm](https://img.shields.io/npm/v/cans.svg)](https://www.npmjs.com/package/cans)
[![circle](https://circleci.com/gh/djyde/cans.svg?style=shield)](https://circleci.com/gh/djyde/cans)
[![David](https://img.shields.io/david/djyde/cans.svg)]()

A framework for building React MobX application.

## quick start

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

## Plugin system

`cans` provides a plugin system. Plugins are used to inject custom object (maybe a `function` or `observable`) in `app.plugins`, which can be called in models' observable.

`plugin` is a particular `model`. It has `namespace` and `observable`(may change the name further) too. 

```js
// example loggerPlugin

const loggerPlugin = {
  namespace: 'logger',

  observable: app => {
    return function (msg) {
      console.log('[from logger]:', msg)
    }
  }
}

app.use(loggerPlugin)

app.model({
  namespace: 'foo',

  observable: app => {
    return observable({
      click: action.bound(function () {
        app.plugins.logger('log something...')
      })
    })
  }
})

```

## Plugins

- [cans-plugin-http](https://github.com/djyde/cans-plugin-http) HTTP (axios) plugin for cans
- [cans-plugin-modal-store](https://github.com/djyde/cans-plugin-modal-store) cans plugin for creating modal stores

## APIs

#### `app = cans()`

Create new `cans` application instance.

#### `app.model(model: { namespace: string, observable: MobXObservable | (app: Cans) => MobXObservable })`

Registry app model.

#### `app.route(() => ReactRouterElement)`

Registry router. The React router will be wrapped in `mobx-react`'s `<Provider>`.

#### `app.use(plugin)`

#### `inject(view)`

mobx-react inject helper. Will inject the registried models wich will be pass to view props, and automatically wrapped the view with `observer`

#### `app.models`

return all registried models (observable)

#### `app.plugins(plugin: { namespace: string, observable: (app: Cans) => any })`

return all registried plugins (observable or anything)

## examples

👀 See more examples in [cans-example](https://github.com/djyde/cans-example)

## See Also

- [React-Router](https://github.com/ReactTraining/react-router)
- [MobX](https://mobxjs.github.io/mobx/)

# License

MIT License
