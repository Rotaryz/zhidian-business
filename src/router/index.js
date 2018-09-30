import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const _this = () => import('@/main')

const ServiceManage = () => import('pages/service-manage/service-manage')
const EditorService = () => import('pages/editor-service/editor-service')
const Mine = () => import('pages/mine/mine')
const Radar = () => import('pages/radar/radar')
const Shop = () => import('pages/shop/shop')
const Home = () => import('pages/home/home')
const EmployeeManage = () => import('pages/employee-manage/employee-manage')
const NewEmployee = () => import('pages/new-employee/new-employee')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'mine',
          component: Mine,
          meta: {
            title: '我的'
          },
          children: [
            {
              path: 'employee-manage',
              component: EmployeeManage,
              meta: {
                title: '店员管理'
              },
              children: [
                {
                  path: 'new-employee',
                  component: NewEmployee,
                  meta: {
                    title: '新建店员'
                  }
                }]
            }
          ]
        },
        {
          path: 'shop',
          component: Shop,
          meta: {
            title: '商户助手'
          },
          children: [
            {
              path: 'service-manage',
              component: ServiceManage,
              meta: {
                title: '服务管理'
              },
              children: [
                {
                  path: 'editor-service',
                  component: EditorService,
                  meta: {
                    title: '新建服务'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'radar',
          component: Radar,
          meta: {
            title: 'BOSS-AI'
          }
        }
      ]
    },
    {
      path: '/service-manage',
      component: ServiceManage,
      meta: {
        title: '服务管理'
      }
    }
  ]
})

const DEFAULT_TITLE = '商户助手'
const DEFAULT_ROUTE = '/shop'
const OAUTH_ROUTE = '/shop' // todo

// route.beforeEach(async (to, from, next) => {
//   const vue = await _this()
//   const self = vue.default
//   document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
//   const token = self.$storage.get('token', '')
//   if (token) {
//     // next({path: DEFAULT_ROUTE, replace: true})
//   } else {
//     // next({path: OAUTH_ROUTE, replace: true})
//     self.$login.show()
//   }
//   next()
// })
route.beforeEach(async (to, from, next) => {
  const vue = await _this()
  const self = vue.default
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  if (to.path === '/') {
    const token = storage.get('token', '')
    if (token) {
      next({path: DEFAULT_ROUTE, replace: true})
    } else {
      next({path: OAUTH_ROUTE, replace: true})
      self.$login.show()
    }
  }
  next()
})

export default route
