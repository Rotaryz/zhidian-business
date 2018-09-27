import Vue from 'vue'
import base from 'common/mixins/base'
import storage from 'storage-controller'
import echarts from 'echarts'
import AwesomePicker from 'vue-awesome-picker'
import components from './components-plugins'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    Vue.prototype.$echarts = echarts
    Vue.prototype.$storage = storage
  }
}
// 使用插件
Vue.use(AppPlugin)
Vue.use(AwesomePicker)
Vue.use(components.Toast)
Vue.use(components.Loading)
