# inject

`inject` is a magic function that makes your view component reactive.

### inject(view: ReactComponent)

Wrapping your view with `mobx-react`'s `observer`, and inject the whole `app.models` into `models` props at the same time.

Example:

```js
const Counter = inject(({ models }) => (
  <div>
    <span>{models.counter.count}</span>
  </div>
))
```
