import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('pages/hello-world/hello-world')
const ServiceManage = () => import('pages/service-manage/service-manage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/service-manage',
      component: ServiceManage
    }
  ]
})
