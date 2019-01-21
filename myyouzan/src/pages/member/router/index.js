import Vue from 'vue'
import member from '../components/member.vue'
import address from '../components/address.vue'
import address_add from '../components/address_add.vue'
import address_edit from '../components/address_edit.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: "memberlink",
  component: member,

},
{
  path: '/address',
  name: "addresslink",
  component: address,
  beforeEnter: (to, from, next) => {
    alert('请先登录或者注册')
   
  }
},
{
  path: '/address_add',
  name: "address_addlink",
  component: address_add,
},
{
  path: '/address_edit',
  name: "address_editlink",
  component: address_edit,
}
]

const router = new VueRouter({
  routes,

})
export default router