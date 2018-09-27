import Vue from 'vue'
import base from 'common/mixins/base'
import storage from 'storage-controller'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
  }
}
// 使用插件
Vue.use(AppPlugin)
