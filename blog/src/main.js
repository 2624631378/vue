// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './routers.js'
import store from './store.js'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://wd8261812323nryzto.wilddogio.com'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
