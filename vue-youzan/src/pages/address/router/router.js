import Vue from 'vue'
import Router from 'vue-router'
import address from '../components/address'
import addressedit from '../components/address_edit'
import addressadd from '../components/address_add'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/',
      name:'addressIndex',
      component: address
    },
    {
      path: '/address_edit',
      component: addressedit
    },
    {
      path: '/address_add',
      name:"addressAdd",
      component: addressadd
    },
    
  ]
})
