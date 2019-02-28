import Vue from 'vue'
import VueRouter from 'vue-router'
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import SingleBlog from './components/SingleBlog'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: "showblog",
  component: ShowBlogs
}, {
  path: '/addblog',
  name: "addblog",
  component: AddBlog
},{
  path:'/singleblog',
  name:"singleblog",
  component:SingleBlog
}
]

const router = new VueRouter({
  routes,
  mode:"history"
  
})

export default router
