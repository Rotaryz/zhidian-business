import Vue from 'vue'
import base from 'common/mixins/base'
import storage from 'storage-controller'
import echarts from 'echarts'
import AwesomePicker from 'vue-awesome-picker'
import components from './components-plugins'
import {ERR_OK} from 'common/js/config'
import * as handle from './cos/handle'
import {fileType} from './cos/file-config'
import * as cos from './cos/cos'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    Vue.prototype.$echarts = echarts
    Vue.prototype.$storage = storage
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$handle = handle
    Vue.prototype.$cosFileType = fileType
    Vue.prototype.$cos = cos
  }
}
// 使用插件
Vue.use(AppPlugin)
Vue.use(AwesomePicker)
Vue.use(components.Toast)
Vue.use(components.Loading)
