export const defineReadOnlyProperty = (scope: object, name: string, value: any, message: string = 'property is readonly') => {
  Object.defineProperty(scope, name, {
    get() {
      return value
    },
    set() {
      throw Error(message)
    }
  })
}

export const isProtected = (property: any) => {
  return property.protected === true || property.protected === undefined
}
