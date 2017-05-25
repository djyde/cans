'use strict';

var cans_mobx = require('cans/mobx');

var noop = function () {};

var modalStorePlugin = function (app, options) {
  if ( options === void 0 ) options = {};

  var modals = options.modals || [];
  app.model({
    namespace: 'modals',
    observable: function (app) {
      var stateMap = {};
      modals.forEach(function (modal) {
        var emptyRecord = modal.emptyRecord || {};
        var titleFn = modal.title || noop;
        stateMap[modal.name] = cans_mobx.observable({
          visible: false,
          confirmLoading: false,
          record: emptyRecord,

          show: cans_mobx.action.bound(function (record) {
            if ( record === void 0 ) record = emptyRecord;

            this.record = record;
            this.visible = true;
          }),

          get title () {
            return titleFn(this.record) || ''
          },

          resetRecord: cans_mobx.action.bound(function () {
            this.record = emptyRecord;
          }),

          hide: cans_mobx.action.bound(function () {
            this.visible = false;
          }),

          startLoading: cans_mobx.action.bound(function () {
            this.confirmLoading = true;
          }),

          stopLoading: cans_mobx.action.bound(function () {
            this.confirmLoading = false;
          })
        });
      });
      return stateMap
    }
  });
};
module.exports = modalStorePlugin;
