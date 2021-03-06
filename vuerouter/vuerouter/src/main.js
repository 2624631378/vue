// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './router/routes.js'


// Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  mode: 'history',
});

// router.beforeEach((to, from, next) => {
//   if (to.path == '/login' || to.path == '/register') {
//     next()
//   } else {
//     alert('请先登录或者注册')
//     next('/login')
//   }
// }) 

// router.afterEach(()=>{})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),

})
