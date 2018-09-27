import ToastComponent from 'components/toast/toast'
import LoadingComponent from 'components/loading/loading'

const Toast = {}

// 注册Toast
Toast.install = function (Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const ToastConstructor = Vue.extend(ToastComponent)
  // 生成一个该子类的实例
  const instance = new ToastConstructor()

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  // instance.$el.setAttribute('ref', 'toast')
  document.body.appendChild(instance.$el)
  // 通过Vue的原型注册一个方法
  Vue.prototype.$showToast = (content, time) => {
    if (!content) return
    instance.show(content, time)
  }
}

const Loading = {}

Loading.install = function (Vue) {
  const LoadingConstructor = Vue.extend(LoadingComponent)
  const instance = new LoadingConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  Vue.prototype.$showLoading = (content) => {
    instance.show(content)
  }
  Vue.prototype.$hideLoading = () => {
    instance.hide()
  }
}

export default {
  Toast,
  Loading
}
