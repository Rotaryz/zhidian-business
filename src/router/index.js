import Vue from 'vue'
import Router from 'vue-router'

const ServiceManage = () => import('pages/service-manage/service-manage')
const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
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
      path: '/home',
      component: Home,
      meta: {
        title: '商家助手'
      }
    }
  ]
})

export default route
