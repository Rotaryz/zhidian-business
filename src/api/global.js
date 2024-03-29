import request from '../common/js/request'

export default {
  /**
   * 获取微信JSSDK配置
   * @returns {*}
   */
  jssdkConfig (data, loading = false) {
    let url = '/api/wechat/jssdk'
    return request.get(url, data, loading)
  },
  getShopDashboard (data, loading) {
    let url = '/api/merchant/stores/dashboard'
    return request.get(url, data, loading)
  }
}
