import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject as mobxInject, Provider, observer } from 'mobx-react'
import { defineReadOnlyProperty, isProtected } from './utils'

export interface ICansModel {
  namespace: string,
  protected?: boolean,
  observable: (app: Cans) => IObservable | IObservable | object
}

export interface ICansModelObject {
  [namespace: string]: IObservable
}

export interface ICansPluginObject {
  [namespace: string]: any
}

export interface ICansPlugin {
  namespace: string,
  protected?: boolean,
  observable: (app: Cans) => any
}

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div')
  private __mountedRoot?: Element

  private __plugins: ICansPlugin[] = []
  private __pluginsObject: ICansPluginObject = {}  

  private __models: ICansModel[] = []
  private __modelsObject: ICansModelObject = {}

  private __getInjectList () {
    return this.__models.map(model => model.namespace).filter(_ => _)
  }

  get models () {
    return this.__modelsObject
  }

  get plugins () {
    return this.__pluginsObject
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

  start (el: Element) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
  }

  use (plugin: ICansPlugin) {
    // registry plugin
    const o = plugin.observable(this)
    if (isProtected(plugin)) {
      defineReadOnlyProperty(this.__pluginsObject, plugin.namespace, o, 'This plugin is readonly')
    } else {
      this.__pluginsObject[plugin.namespace] = plugin.observable(this)
    }
    this.__plugins.push(plugin)
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
