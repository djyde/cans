import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable, useStrict, extendObservable, action, computed } from 'mobx'
import { inject as mobxInject, Provider, observer } from 'mobx-react'
import { defineReadOnlyProperty, isProtected } from './utils'

export interface ICansModel {
  namespace: string,
  protected?: boolean,
  observable?: any,
  actions?: { [name: string]: (app: Cans) => () => void } | { [name: string]: () => void },
  state?: { [name: string]: any },
  computed?: { [name: string]: () => any }
}

export interface ICansModelObject {
  [namespace: string]: IObservable
}

export interface ICansPluginObject {
  [namespace: string]: any
}

export interface ICansPlugin {
  (app: Cans, options: any): void
}

const modelToObservable = (app: Cans, model: ICansModel) => {
  let o = extendObservable({})
  if (model.observable) {
    o = typeof model.observable === 'function' ? model.observable(app) : model.observable
  }

  // apply state
  if (model.state) {
    extendObservable(o, model.state)
  }

  // apply actions
  if (model.actions) {
    const actions = typeof model.actions === 'function' ? model.actions(app) : model.actions
    for (let name in actions) {
      extendObservable(o, {
        [name]: action.bound(actions[name] as any)
      })
    }
  }

  // apply computed
  if (model.computed) {
    for (let name in model.computed) {
      extendObservable(o, {
        [name]: computed(model.computed[name])
      })
    }
  }

  return o
}

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div')
  private __mountedRoot?: Element | null

  private __models: ICansModel[] = []
  private __modelsObject = {}

  private __getInjectList () {
    return this.__models.map(model => model.namespace).filter(_ => _)
  }

  get models () {
    return this.__modelsObject
  }

  route (routeFunc: () => JSX.Element) {
    // wrap provider
    const providerProps = {}
    this.__routerComponent = React.createElement(Provider, this.models, routeFunc())
  }

  model (model: ICansModel) {
    // registry model
    const o = modelToObservable(this, model)
    if (isProtected(model)) {
      // every model is protected by default
      defineReadOnlyProperty(this.__modelsObject, model.namespace, o, `model [${model.namespace}] is protected.`)
    } else {
      this.__modelsObject[model.namespace] = o
    }
    this.__models.push(model)
  }

  start (el: Element | null = null) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
  }

  use (plugin: ICansPlugin, options?) {
    plugin(this, options)
  }
}

export interface ICansOptions {
  useStrict?: boolean
}

const createCansApp = (options: ICansOptions = {}) => {
  if (options.useStrict === true) {
    useStrict(true)
  }
  return new Cans()
}

// model inject helper
export const inject = (view) => mobxInject(models => ({ models }))(observer(view))

export default createCansApp
