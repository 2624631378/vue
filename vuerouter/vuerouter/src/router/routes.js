import Home from '../components/Home'
import Admin from '../components/Admin'
import Login from '../components/Login'
import Register from '../components/Register'
import About from '../components/about/About'
import Mune from '../components/Mune'
import History from '../components/about/History'
import OrderingGuide from '../components/about/OrderingGuide'
import Delivery from '../components/about/Delivery'
import Contact from '../components/about/Contact'
import PersonName from '../components/about/contact/PersonName'
import PhoneNumber from '../components/about/contact/PhoneNumber'

export const routes = [{
    path: '/',
    name: "homelink",
    components: {
      default: Home,
      'orderingGuide': OrderingGuide,
      'delivery': Delivery,
      'history': History,
      'contact': Contact

    },
  },
  {
    path: '/admin',
    name: "adminlink",
    component: Admin,
    beforeEnter: (to, from, next) => {
      alert('请先登录或者注册')
      next('/login')
    }
  },
  {
    path: '/about',
    name: "aboutlink",
    redirect: '/about/history',
    component: About,
    children: [{
        path: '/about/history',
        name: "historylink",
        component: History
      }, {
        path: '/about/orderingGuide',
        name: "orderingGuide",
        component: OrderingGuide
      },
      {
        path: '/about/delivery',
        name: "deliverylink",
        component: Delivery
      },
      {
        path: '/about/contact',
        name: "contactlink",
        redirect: '/about/contact/phoneNumber',
        component: Contact,
        children: [{
            path: '/about/contact/personName',
            name: 'personName',
            component: PersonName
          },
          {
            path: '/about/contact/phoneNumber',
            name: 'phoneNumber',
            component: PhoneNumber
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: "loginlink",
    component: Login
  },
  {
    path: '/register',
    name: "registerlink",
    component: Register
  },

  {
    path: '/mune',
    name: "munelink",
    component: Mune
  },
  {
    path: '*',
    redirect: '/'
  }
]
