import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject as mobxInject, Provider, observer } from 'mobx-react'

export interface ICansModel {
  namespace: string,
  observable: (app: Cans) => IObservable | IObservable
}

export interface ICansModelObject {
  [namespace: string]: IObservable
}

export interface ICansPluginObject {
  [namespace: string]: any
}

export interface ICansPlugin {
  namespace: string,
  observable: any
}

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div', null, 'cans')
  private __mountedRoot?: HTMLElement
  private __plugins: ICansPlugin[] = []
  private __models: ICansModel[] = []

  public models: ICansModelObject = {}
  public plugins: ICansPluginObject = {}

  private __getInjectList () {
    return this.__models.map(model => model.namespace).filter(_ => _)
  }

  route (routeFunc: () => JSX.Element) {
    // wrap provider
    const providerProps = {}
    this.__routerComponent = React.createElement(Provider, this.models, routeFunc())
  }

  model (model: ICansModel) {
    // registry model
    if (typeof model.observable === 'function') {
      this.models[model.namespace] = model.observable(this)
    } else {
      this.models[model.namespace] = model.observable
    }
    this.__models.push(model)
  }

  start (el: HTMLElement) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
  }

  use (plugin: ICansPlugin) {
    // registry plugin
    this.plugins[plugin.namespace] = plugin.observable(this)
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
