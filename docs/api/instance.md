# Instance

### app = cans(options)

Return a cans app instance

#### options

- useStrict: boolean. Enable MobX strict mode.

### app.model(model)

Registry a model.

##### model

See [model](/concepts/model).

### app.use(plugin)

Registry a plugin.

##### plugin

See [plugin](/concepts/plugin).

### app.route(() => ReactRouterRouteComponent)

Apply the route.

See [router](/concepts/router)

### app.start(el: Element)

Mount the app.
