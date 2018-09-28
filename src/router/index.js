import Vue from 'vue'
import Router from 'vue-router'
// import storage from 'storage-controller'

const _this = () => import('@/main')

const ServiceManage = () => import('pages/service-manage/service-manage')
const Login = () => import('pages/login/login')
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
      path: '/service-manage',
      component: ServiceManage,
      meta: {
        title: '服务管理'
      }
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

const DEFAULT_TITLE = '商户助手'
// const DEFAULT_ROUTE = '/shop'
// const OAUTH_ROUTE = '/' // todo

route.beforeEach(async (to, from, next) => {
  const vue = await _this()
  const self = vue.default
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  const token = self.$storage.get('token', '')
  console.log(555)
  if (token) {
    // next({path: DEFAULT_ROUTE, replace: true})
  } else {
    // next({path: OAUTH_ROUTE, replace: true})
    console.log(111)
    self.$login.show()
  }
  next()
})

export default route
