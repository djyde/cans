<img width="256" height="128" alt="logo" src="https://cloud.githubusercontent.com/assets/914329/24503261/e6868e0a-1583-11e7-8a98-7dd24c564b8b.png" />

[![npm](https://img.shields.io/npm/v/cans.svg)](https://www.npmjs.com/package/cans)
[![npm](https://img.shields.io/npm/dm/cans.svg)](https://www.npmjs.com/package/cans)
[![circle](https://circleci.com/gh/djyde/cans.svg?style=shield)](https://circleci.com/gh/djyde/cans)
[![David](https://img.shields.io/david/djyde/cans.svg)]()

A framework for building React MobX application.

## quick start

```js
import cans, { inject } from 'cans'
import { BrowserRouter, Route } from 'cans/router'

const app = cans()

// model
app.model({
  namespace: 'counter',
  state: {
    count: 0
  },
  actions: {
    incr() {
      this.count += 1
    },
    decr() {
      this.count -= 1
    }
  },
  computed: {
    content() {
      return `Count: ${this.count}`
    }
  }
})

// view
const Counter = inject(({ models })) => {
  return (
    <div>
      <span>{models.counter.content}</span>
      <button onClick={models.counter.incr}>+</button>
      <button onClick={models.counter.decr}>-</button>
    </div>
  )
}

// router
const route = () => (
  <BrowserRouter>
    <Route path='/' component={Counter} />
  </BrowserRouter>
)
app.route(route)

// mount the app
app.start(document.querySelector('#root'))
```

## Documents

- [Dodcument](http://cans.js.org)

### Posts

- [cans: A framework for building React MobX application](https://medium.com/@djyde/cans-a-framework-for-building-react-mobx-application-78bff88c3b3f)

- [Building CRUD in a few minutes with cans and antd](https://medium.com/@djyde/building-curd-in-a-few-minutes-with-cans-and-antd-ba2b08a3919f)

## Plugins

- [cans-plugin-http](https://github.com/djyde/cans-plugin-http) HTTP (axios) plugin for cans
- [cans-plugin-modal-store](https://github.com/djyde/cans-plugin-modal-store) cans plugin for creating modal stores

## Examples

- [cans-example-dashboard](https://github.com/cansjs/cans-example-dashboard/)

👀 See more examples in [cans-example](https://github.com/djyde/cans-example)

## Build

``` bash
$ yarn

$ yarn test # unit-test

$ yarn run example # run example
```

## See Also

- [React-Router](https://github.com/ReactTraining/react-router)
- [MobX](https://mobxjs.github.io/mobx/)

# License

MIT License
