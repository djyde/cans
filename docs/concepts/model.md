# Model

`model` in cans is an object contains `namespace`, `state` and `actions`:

```js
import { observable } from 'cans/mobx'
const counterModel = {
  namespace: 'counter',
  state: {
    count: 0
  },
  actions: {
    incr() {
      /** ... **/
    }
  }
}

app.model(counterModel)
```

All models that had been registry by `app.model()` will define a observable property in `app.models`.

#### Communication between models

You can also pass a high order function to `actions`, which receives an `app` instance. That means you could do a lot with app instance. Such as accessing other models:

```js
const homepageModel = {
  namespace: 'homepage',
  state: {
    posts: []
  },
  actions: {
    fetch() {
      this.posts = ['blablabla']
    }
  }
}

const counterModel = {
  namespace: 'counter',
  actions: app => ({
    refresh() {
      app.models.hompage.fetch() // access homepage model
    }
  })
}

app.model(hompageModel)
app.model(counterModel)
```

### Access models in views

The way we access all models is using `inject()` helper:

```js
import { inject } from 'cans'
const counterModel = inject(({ models }) => (
  <div>
    <span>{models.count}</span>
  </div>
))
```

The views that had been wrapped with `inject` will automatically wrapped with mobx-react's `observer`.

### Using MobX Observable directory

You could pass a MobX Observable to model instead of passing `state` and `actions`:

```js
class Store {
  @observable count = 0

  @action incr = () => {
    this.count += 1
  }
}

const store = new Store()

export default {
  namespace: 'counter',
  observable: store
}
```

### Protected Model

All the models are protected by default, which means that all the models regitered by `app.model()` cannot be change:

```js
app.model({
  namespace: 'foo',
  observable: /** ... **/
})

app.models.foo = {} // Throw error
```

In some cases you don't want your models be protected. Just set the `protected` to `false`:

```js
app.model({
  namespace: 'foo',
  protected: false,
  observable: /** ... **/
})

app.models.foo = {} // it's ok
```
