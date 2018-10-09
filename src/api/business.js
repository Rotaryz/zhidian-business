import request from 'common/js/request'

export default {
  /**
   * 我的名片-个性签名编辑
   * @returns {*}
   */
  Myqrcode (data) {
    let url = 'api/employee/my-new-qrcode'
    return request.get(url, data)
  },
  /**
   * 我的店铺-个性签名编辑
   * @returns {*}
   */
  Myshop (shopId) {
    let url = `api/merchant/shops/${shopId}/qrcode`
    return request.get(url, Object.assign({}, {is_hyaline: 0}))
  }
}
