# Why MobX and React

The best way to build web User Interface is to **separate the state and the UI**. This is what [Elm Architecture](http://guide.elm-lang.org/architecture/) dose. It separates every Elm program into **Model**, **Update** and **View** parts. It’s good. But many developers are not familiar with functional programming.

Though I am not familiar with functional programming, I always learn a lot from it. I love FP because it is a good tool to write less bug and write more maintainable code. This is why I love React too. Every UI component can write as a function of state (`(state) => UI`), which let you test the UI more easily, just pass different state and expect the return value.

If you are not familiar with MobX, just see an example:

```js
// https://jsbin.com/fumerup/edit?js,output

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

class TickerStore {
  @observable time = 0
  
  @action incr = () => {
    this.time += 1
  }
  
  @action desc = () => {
    this.time -= 1
  }
}

const Ticker = observer(({ tickerStore }) => (
  <div>
    <span>tick {tickerStore.time} times</span>
    <button onClick={tickerStore.incr}>+</button>
    <button onClick={tickerStore.desc}>-</button>
  </div>
))

const tickerStore = new TickerStore()

ReactDOM.render(<Ticker tickerStore={tickerStore} />, document.querySelector('#app'))
```

When MobX `observable` is changed, the components which are wrapped wth `observer` will be re-rendered. In this example, when the `time` observable was changed by `action`, the `Ticker` component will be re-rendered by `mobx-react`. MobX knows when the component should be re-rendered.

This is the power of combining MobX and React. MobX manages all the state, and tells the component when should be re-rendered. React just do the good render job for your views. 

This is why testing MobX application is easy:

1. new a store instance
2. pass store to component
3. mutate the observable in store instance
4. shallow the component and test the UI
