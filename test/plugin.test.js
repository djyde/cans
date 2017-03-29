import cans, { observer, inject } from '../lib/cans'
import { observable, action } from '../mobx'
import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'

const httpPlugin = {
  namespace: 'http',
  observable: app => {
    return (url) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('blablabla')
        }, 1000)
      })
    }
  }
}
describe('plugin system', () => {
  const app = cans()

  app.use(httpPlugin)

  app.model({
    namespace: 'weather',
    observable: app => {
      return observable({
        data: '',

        applyData: action.bound(function (data) {
          this.data = data
        }),

        fetchWeather: action.bound(async function () {
          const data = await app.plugins.http('blablabla')
          this.applyData(data)
        })
      })
    }
  })

  const Weather = inject(({ models }) => {
    return (
      <div>
        <p id='data'>{models.weather.data}</p>
        <button onClick={models.weather.fetchWeather}>fetch weather...</button>
      </div>
    )
  })

  it('should use plugin', done => {
    assert(app.plugins.http)
    done()
  })

  it('should fetch weather data', async function () {
    try {
      await app.models.weather.fetchWeather()
    } catch (e) {
      done(e)
    }  
  })

  it('should change weather data', done => {
    const wrapped = shallow(<Weather.wrappedComponent models={{ weather: app.models.weather }} />)

    assert.equal(wrapped.find('#data').first().text(), 'blablabla')

    done()
  })
})