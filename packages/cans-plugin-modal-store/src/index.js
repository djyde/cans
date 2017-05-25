import { observable, action } from 'cans/mobx'

const noop = () => {}

const modalStorePlugin = (app, options = {}) => {
  const modals = options.modals || []
  app.model({
    namespace: 'modals',
    observable: app => {
      const stateMap = {}
      modals.forEach(modal => {
        const emptyRecord = modal.emptyRecord || {}
        const titleFn = modal.title || noop
        stateMap[modal.name] = observable({
          visible: false,
          confirmLoading: false,
          record: emptyRecord,

          show: action.bound(function (record = emptyRecord) {
            this.record = record
            this.visible = true
          }),

          get title () {
            return titleFn(this.record) || ''
          },

          resetRecord: action.bound(function () {
            this.record = emptyRecord
          }),

          hide: action.bound(function () {
            this.visible = false
          }),

          startLoading: action.bound(function () {
            this.confirmLoading = true
          }),

          stopLoading: action.bound(function () {
            this.confirmLoading = false
          })
        })
      })
      return stateMap
    }
  })
}
module.exports = modalStorePlugin
