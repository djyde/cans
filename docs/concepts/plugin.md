# Plugin

Plugin is powerful and useful in cans. It can inject everything in your cans app instance. 

#### Writing a plugin

A cans plugin is a function that receive two arguments: `app` and possible `options`:

```js
const loggerPlugin = (app, options) => {
  // add function in app instance
  app.logger = (msg) => {
    console.log('[from logger]:', msg)
  }
}

const modalStorePlugin = (app, options) => {
  // registry a model
  const observableMap = {}
  options.modalNames.forEach(name => {
    observableMap[name] = observable({
      visible: false,

      show: action.bound(function () {
        this.visible = true
      }),

      hide: aciton.bound(function () {
        this.visible = false
      })
    })
  })

  app.model({
    namespace: 'modals',
    observable: observableMap
  })
}
```

#### Using a plugin

```js
const app = cans()

app.use(loggerPlugin)

// using plugin with options
app.use(modalStorePlugin, { modalNames: ['createUser'] }) 
// app.models.modals is now registered.

```

#### Test the plugin

See [Unit test](/advanced/unit-test)

#### Plugin list

- [cans-plugin-http](https://github.com/djyde/cans-plugin-http) - HTTP (axios) plugin
- [cans-plugin-modal-store](https://github.com/djyde/cans-plugin-modal-store) - cans plugin for creating modal store
