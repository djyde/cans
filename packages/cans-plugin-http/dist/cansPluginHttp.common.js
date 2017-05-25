'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var cans_mobx = require('cans/mobx');

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

var httpPlugin = function (app, options) {
  if ( options === void 0 ) options = {};

  app.http = options.axiosConfig ? axios.create(options.axiosConfig) : axios;
};

var restPlugin = function (app, options) {
  if ( options === void 0 ) options = {};

  var resources = options.resources || [];
  var storeMap = {};
  resources.forEach(function (resource) {
    var totalFn = resource.total;
    var endpoint = (resource.url) + "/" + (resource.name);
    var o = cans_mobx.observable({
      data: resource.defaultData || {
        index: [],
        show: {}
      },
      loading: {
        index: false,
        show: false,
        create: false,
        update: false,
        delete: false
      },
      pagination: {
        total: 0
      },

      setLoadingStatus: cans_mobx.action.bound(function (name, status) {
        this.loading[name] = status;
      }),

      index: cans_mobx.action.bound(function (axiosConfig) {return __async(function*(){
        var this$1 = this;

        this.loading.index = true;
        try {
          var res = yield axios.get(endpoint, axiosConfig);
          cans_mobx.runInAction('fetch resource success', function () {
            if (totalFn) {
              this$1.pagination.total = totalFn(res);
            }
            this$1.data.index = res.data;
          });
          return res
        } catch (e) {
          throw e
        } finally {
          this.setLoadingStatus('index', false);
        }
      }.call(this))}),

      show: cans_mobx.action.bound(function (id) {return __async(function*(){
        var this$1 = this;

        this.loading.show = true;
        try {
          var res = yield axios.get((endpoint + "/" + id));
          cans_mobx.runInAction('show resource success', function () {
            this$1.data.show = res.data;
          });
          return res
        } catch (e) {
          throw e
        } finally {
          this.setLoadingStatus('show', false);
        }
      }.call(this))}),

      create: cans_mobx.action.bound(function (data) {return __async(function*(){
        this.loading.create = true;
        try {
          var res = yield axios.post(("" + endpoint), data);
          return res
        } catch (e) {
          throw e
        } finally {
          this.setLoadingStatus('create', false);
        }
      }.call(this))}),

      update: cans_mobx.action.bound(function (id, body) {return __async(function*(){
        this.loading.update = true;
        try {
          var res = yield axios.put((endpoint + "/" + id), body);
          return res
        } catch (e) {
          throw e
        } finally {
          this.setLoadingStatus('update', false);
        }
      }.call(this))}),

      delete: cans_mobx.action.bound(function (id) {return __async(function*(){
        this.loading.delete = true;
        try {
          var res = yield axios.delete((endpoint + "/" + id));
          return res
        } catch (e) {
          throw e
        } finally {
          this.setLoadingStatus('delete', false);
        }
      }.call(this))})
    });
    storeMap[resource.name] = o;
  });

  app.model({
    namespace: 'rest',
    observable: storeMap
  });
};

exports.httpPlugin = httpPlugin;
exports.restPlugin = restPlugin;
