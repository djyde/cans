import * as React from 'react'
import { render } from 'react-dom'
import { IObservable, observable } from 'mobx'
import { Observer, inject, Provider, observer } from 'mobx-react'

export interface IMooObservable extends IObservable {
  namespace: string
}

export class Moo {

  private __routerComponent: JSX.Element = React.createElement('div', null, 'moo')
  private __mountedRoot?: HTMLElement
  private stores: IMooObservable[] = []

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

  store (store: IMooObservable) {
    this.stores.push(store)
  }

  start (el: HTMLElement) {
    render(this.__routerComponent, el)
    this.__mountedRoot = el
  }

  observer (view) {
    const injection = inject((stores: IMooObservable[]) => ({ stores: stores }))
    return injection(observer(view))
  }
}

const createMooApp = () => {
  return new Moo()
}

export default createMooApp

declare var module: any
module.exports = createMooApp
