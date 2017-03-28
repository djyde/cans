import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject as mobxInject, Provider, observer } from 'mobx-react'

export interface ICansModel {
  namespace: string,
  observable: IObservable
}

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div', null, 'cans')
  private __mountedRoot?: HTMLElement
  private models: ICansModel[] = []

  private __getInjectList () {
    return this.models.map(model => model.namespace).filter(_ => _)
  }

  route (routeFunc: () => JSX.Element) {
    // wrap provider
    const providerProps = {}
    this.models.forEach(model => {
      providerProps[model.namespace] = model.observable
    })
    this.__routerComponent = React.createElement(Provider, providerProps, routeFunc())
  }

  model (model: ICansModel) {
    this.models.push(model)
  }

  start (el: HTMLElement) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
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

declare var module: any
export default createCansApp
