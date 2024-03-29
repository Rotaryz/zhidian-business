import request from '../common/js/request'

export default {
  /**
   * 获取活动列表
   * @returns {*}
   */
  getList(data, loading = true) {
    let url = 'api/merchant/exchange-coupon'
    return request.get(url, data, loading)
  },
  /**
   * 删除兑换券
   * @returns {*}
   */
  setPrizeDel(id, loading = true) {
    let url = `api/merchant/exchange-coupon/${id}`
    return request.delete(url, {}, loading)
  },
  /**
   * 获取兑换券详情
   * @returns {*}
   */
  getPrizeDetail(id, loading = true) {
    let url = `api/merchant/exchange-coupon/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 新建兑换券
   * @returns {*}
   */
  newPrize(data, loading = true) {
    let url = `api/merchant/exchange-coupon`
    return request.post(url, data, loading)
  },
  /**
   * 编辑兑换券
   * @returns {*}
   */
  editPrize(id, data, loading = true) {
    let url = `api/merchant/exchange-coupon/${id}`
    return request.put(url, data, loading)
  }
}
