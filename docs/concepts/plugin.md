# Plugin

Plugin is powerful and useful in cans. It can inject everything in your cans app instance. Or only simply return any value that can be access in `app.plugins`.

*Plugins injection behavior will be constrained in futher release. For example, we will provide a method to create custom `model` in `app.models`, instead of let the plugin modify the `app.moddels` directly. Besides, the property `observable` will be renamed, while it not only can return an observable.*

#### Write a plugin

A cans plugin is actually a particular model. They have theire `namespace` and `observable` too. Suppose we want to log our information somewhere we need, we can write a plugin for this:

```js
const loggerPlugin = {
  namespace 'logger',
  observable: app => msg => {
    somewhere.log(msg)
  }
}

app.use(loggerPlugin)

app.model({
  namespace: 'foo',
  observable: app => observable({
    click: action.bound(function () {
      app.plugins.logger('be clicked')
    })
  })
})
```

#### Test the plugin

See [Unit test](/advanced/unit-test)

#### Plugin list

- [cans-plugin-http](https://github.com/djyde/cans-plugin-http) - HTTP (axios) plugin
- [cans-plugin-modal-store](https://github.com/djyde/cans-plugin-modal-store) - cans plugin for creating modal store
