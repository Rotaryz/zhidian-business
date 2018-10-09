import request from '../common/js/request'

export default {
  /**
   * 获取订单列表
   * @returns {*}
   */
  getList(data, loading = true) {
    let url = 'api/merchant/order'
    return request.get(url, data, loading)
  },
  /**
   * 获取订单列表
   * @returns {*}
   */
  getStaffList(data, loading = true) {
    let url = 'api/merchant/employees'
    return request.get(url, data, loading)
  },
  /**
   * 获取订单详情
   * @returns {*}
   */
  getDetail(id, loading = true) {
    let url = `api/merchant/order/${id}`
    return request.get(url, {}, loading)
  }
}
