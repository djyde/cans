# Unit test

Testing MobX application is easy:

1. new a store instance
2. pass store to component
3. mutate the observable in store instance
4. shallow the component and test the UI

Testing cans application is super easy too. Let see an example with [mocha]() and [enzyme]().

Let start with the simplest `Counter` app.

#### Write model

Firstly, write a counter model:

```js
// app/models/counter.js
const counterStore = {
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
  }
}

export default {
  namespace: 'counter',
  ...counterStore
}
```

#### Write view

Secondly write a view:

```js
// app/index.js

import React from 'react'
import cans, { inject } from 'cans'
import { observable } from 'cans/mobx'
import { BrowserRouter, Route } from 'cans/router'

import counterModel from './models/counter'

const app = cans()

app.model(counterModel)

const Counter = inject(({ models }) => {
  return (
    <div>
      <span>{models.counter.count}</span>
      <button onClick={models.counter.incr}>+</button>
      <button onClick={models.counter.decr}>-</button>      
    </div>
  )
})

app.route(() => (
  <BrowserRouter>
    <Route path='/' component={Counter} />
  </BrowserRouter>
))

app.start(document.querySelector('#app'))

```

#### Testing dependencies

We can now write a testing spec for the `Counter` component. But firstly we need to install some testing tools:

```bash
$ yarn add enzyme mocha power-assert jsdom react-addons-test-utils --dev
```

We use `jsdom` to simulate the real DOM environment. 

```js
// test/.setup.js

const jsdom = require('jsdom').jsdom

const exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('<!DOCTYPE html><html><body><div id="app"></div></body></html>')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
```

Create a test scripts:

```json
// package.json
{
  "test": "mocha --compilers js:babel/register test/.setup.js test/*.test.js -R spec"
}
```

#### Write test spec

```js
import React from 'react'
import cans from 'cans'
import { shallow } from 'enzyme'
import assert from 'power-assert'

import counterModel from '../app/models/counter'
import { Counter } from '../app'

describe('Counter', () => {
  const app = cans()

  app.model(counterModel)

  // about the `wrappedComponent`
  // https://github.com/mobxjs/mobx-react#testing-store-injection
  const wrapped = shallow(<Counter.wrappedComponent models={app.models} />)

  it('should set default count', done => {
    const count = wrapped.find('span').first().text()
    assert(count === '0')
    done()
  })

  it('should increase count', done => {
    app.models.counter.incr()
    const count = wrapped.find('span').first().text()
    assert(count === '1')
    done()
  })

  it('should decrease count', done => {
    app.models.counter.decr()
    app.models.counter.decr()
    const count = wrapped.find('span').first().text()
    assert(count === '-1')
    done()
  })
})
```

As you can see, testing cans application(component) is easy. There are some key points:

1. Shallow the view component, pass `app.models` to `models` props.
2. Use `app.models[namespace][action]` to modify observable (You could simulate clicking on button, too).
3. Assert the real DOM node and contet.

See this example on [Github](https://github.com/cansjs/cans-example-unittest)
