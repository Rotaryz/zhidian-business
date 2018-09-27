import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('pages/login/login')
// const Home = () => import('pages/home/home')
const Mine = () => import('pages/mine/mine')
const Radar = () => import('pages/radar/radar')
const Shop = () => import('pages/shop/shop')
const Demo = () => import('pages/Z-DEMO/z-demo')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/shop'
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/shop',
      component: Shop,
      meta: {
        title: '商户助手'
      },
      children: [
        {
          path: 'login',
          component: Login,
          meta: {
            title: '登录'
          },
          children: [
            {
              path: 'demo',
              component: Demo,
              meta: {
                title: 'demo'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/radar',
      component: Radar,
      meta: {
        title: 'BOSS-AI'
      }
    }
  ]
})

// const DEFAULT_TITLE = '商户助手'
// const DEFAULT_ROUTE = '/shop'
// const OAUTH_ROUTE = '/' // todo
//
// route.beforeEach((to, from, next) => {
//   document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
//   if (to.path === '/') {
//     const token = this.$storage.get('token', '')
//     if (token) {
//       next({path: DEFAULT_ROUTE, replace: true})
//     } else {
//       next({path: OAUTH_ROUTE, replace: true})
//     }
//   }
//   next()
// })

export default route
