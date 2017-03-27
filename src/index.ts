import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject, Provider, observer } from 'mobx-react'

export interface ICansObservable extends IObservable {
  namespace: string
}

export class Cans {

  private __routerComponent: JSX.Element = React.createElement('div', null, 'cans')
  private __mountedRoot?: HTMLElement
  private stores: ICansObservable[] = []

  private __getInjectList () {
    return this.stores.map(store => store.namespace).filter(_ => _)
  }

  route (routeFunc: () => JSX.Element) {
    // wrap provider
    const providerProps = {}
    this.stores.forEach(store => {
      providerProps[store.namespace] = store
    })
    this.__routerComponent = React.createElement(Provider, providerProps, routeFunc())
  }

  store (store: ICansObservable) {
    this.stores.push(store)
  }

  start (el: HTMLElement) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
  }

  observer (view) {
    const injection = inject((stores: ICansObservable[]) => ({ stores: stores }))
    return injection(observer(view))
  }
}

const createCansApp = () => {
  return new Cans()
}

export default createCansApp

declare var module: any
module.exports = createCansApp
