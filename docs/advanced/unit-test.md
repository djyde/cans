# Unit test

Testing MobX application is easy:

1. new a store instance
2. pass store to component
3. mutate the observable in store instance
4. shallow the component and test the UI

Testing cans application is super easy too. Let see an example with [mocha]() and [enzyme]():

// TODO: