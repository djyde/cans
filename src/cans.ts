import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject as mobxInject, Provider, observer } from 'mobx-react'
import { defineReadOnlyProperty, isProtected } from './utils'

export interface ICansModel {
  namespace: string,
  protected?: boolean,
  observable: any
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

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div')
  private __mountedRoot?: Element | null

  private __models: ICansModel[] = []
  private __modelsObject: ICansModelObject = {}

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
    const o = typeof model.observable === 'function' ? model.observable(this) : model.observable
    if (isProtected(model)) {
      // every model is protected by default
      defineReadOnlyProperty(this.__modelsObject, model.namespace, o, 'This model is readonly')
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

const createCansApp = () => {
  return new Cans()
}

// model inject helper
export const inject = (view) => mobxInject(models => ({ models }))(observer(view))

export {
  observer
}

export default createCansApp
