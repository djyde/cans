# Model

`model` in cans is an object contains `namespace` and `observable`:

```js
import { observable } from 'cans/mobx'
const counterModel = {
  namespace: 'counter',
  observable: observable({ count: 0 })
}

app.model(counterModel)
```

All models that had been registry by `app.model()` will define a observable property in `app.models`.

#### Communication between models

You can also pass a high order function to `observable`, which receives an `app` instance. That means you could do a lot with app instance. Such as accessing other models:

```js
import { observable, action } from 'cans/mobx'

const homepageModel = {
  namespace: 'homepage',
  observable: observable({
    posts: [],
    fetch: action.bound(function() {
      this.posts = ['blablabla']
    })
  })
}

const counterModel = {
  namespace: 'counter',
  observable: app => observable({
    refresh: action.bound(function () {
      app.models.homepage.fetch() // access homepage model
    })
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