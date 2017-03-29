# Router

cans use `react-router-dom` v4 as its router. Feel free to import all of `react-router-dom` component.

```js
import { BrowserRouter, Route } from 'mobx/router'
```

#### Registry the route

You need to use `app.route()` to registry the route component. This is important because cans will wrap it with `mobx-react`'s `<Provider>`. This is how `inject()` can get the wrapped view components updated:

```js
app.route(() => (
  <BrowserRouter>
    <Route path='/foo' component={Foo} />
  </BrowserRouter>
))
```