import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const _this = () => import('@/main')
const Demo = () => import('pages/Z-DEMO/z-demo')
const ServiceManage = () => import('pages/service-manage/service-manage')
// const EditorService = () => import('pages/editor-service/editor-service')
const Mine = () => import('pages/mine/mine')
const Radar = () => import('pages/radar/radar')
const Shop = () => import('pages/shop/shop')
const Home = () => import('pages/home/home')
const EmployeeManage = () => import('pages/employee-manage/employee-manage')
const NewEmployee = () => import('pages/new-employee/new-employee')
const ExchangeCode = () => import('pages/exchange-code/exchange-code')
const ExchangeRecord = () => import('pages/exchange-record/exchange-record')
const ShopInfo = () => import('pages/shop-info/shop-info')
const ActivityManage = () => import('pages/activity-manage/activity-manage')
const EditorActivity = () => import('pages/editor-activity/editor-activity')
const ExchangeManage = () => import('pages/exchange-manage/exchange-manage')
const EditorPrize = () => import('pages/editor-prize/editor-prize')
const OverView = () => import('pages/overview/overview')
const Ranking = () => import('pages/ranking/ranking')

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
              path: 'shop-info',
              component: ShopInfo,
              meta: {
                title: '门店信息'
              }
            },
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
            },
            {
              path: 'activity-manage',
              component: ActivityManage,
              meta: {
                title: '活动管理'
              },
              children: [
                {
                  path: 'editor-activity',
                  component: EditorActivity,
                  meta: {
                    title: '新建活动'
                  }
                }
              ]
            },
            {
              path: 'exchange-manage',
              component: ExchangeManage,
              meta: {
                title: '兑换券管理'
              },
              children: [
                {
                  path: 'editor-prize',
                  component: EditorPrize,
                  meta: {
                    title: '新建兑换券'
                  }
                }
              ]
            },
            {
              path: 'exchange-code',
              component: ExchangeCode,
              meta: {
                title: '输码核销'
              }
            },
            {
              path: 'exchange-record',
              component: ExchangeRecord,
              meta: {
                title: '核销记录'
              }
            }
          ]
        },
        {
          path: 'radar',
          component: Radar,
          meta: {
            title: 'BOSS-AI'
          },
          children: [
            {
              path: 'overview',
              component: OverView,
              meta: {
                title: '总览'
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
            },
            {
              path: 'ranking',
              component: Ranking,
              meta: {
                title: '排行榜'
              }
            }
          ]
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
  if (to.path === '/radar') {
    next({path: '/radar/overview', replace: true})
  }
  next()
})

export default route
