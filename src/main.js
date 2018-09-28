// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.components.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import store from './store'
import './utils/app-plugins'
// import request from 'common/js/request'

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

console.log('main')
// console.log(request)
