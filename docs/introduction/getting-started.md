# Getting Started

#### Installation

```bash
$ yarn add cans
```

#### Simplest counter application

Let see a simplest counter application write in cans:

```js
import cans, { inject } from 'cans'
import { observable, action } from 'cans/mobx'
import { BrowserRouter, Route } from 'cans/router'

const app = cans()

// model
app.model({
  namespace: 'counter',
  observable: observable({
    count: 0,
    
    incr: action.bound(function () {
      this.count += 1
    }),
    
    decr: action.bound(function () {
      this.count -= 1
    })
  })
})

// view
const Counter = inject(({ models })) => {
  return (
    <div>
      <span>{models.counter.count}</span>
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

We use `app.model()` to registry a model. For the view component, we use `inject` to wrap a React component, which will automatically re-render by MobX. As for the route, it is a function that return a `react-router` route component.

Finally, we use `app.start()` to mount the app.
