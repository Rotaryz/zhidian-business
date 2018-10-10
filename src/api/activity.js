import request from '../common/js/request'

export default {
  /**
   * 获取活动列表
   * @returns {*}
   */
  getActivityList(data, loading = true) {
    let url = 'api/merchant/activity'
    return request.get(url, data, loading)
  },
  /**
   * 活动下架
   * @returns {*}
   */
  setActivityDown(id, loading = true) {
    let url = `api/merchant/activity-offline/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 活动删除
   * @returns {*}
   */
  setActivityDel(id, loading = true) {
    let url = `api/merchant/activity/${id}`
    return request.delete(url, {}, loading)
  },
  /**
   * 获取商品列表
   * @returns {*}
   */
  getGoodsList(data, loading = true) {
    let url = `api/merchant/search-goods`
    return request.get(url, data, loading)
  },
  /**
   * 获取团购详情
   * @returns {*}
   */
  getGroup(id, loading = true) {
    let url = `api/merchant/groupon/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 获取砍价详情
   * @returns {*}
   */
  getBargain(id, loading = true) {
    let url = `api/merchant/bargain/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 获取兑换券列表
   * @returns {*}
   */
  getPrizeList(data, loading = true) {
    let url = `api/merchant/search-exchange-coupon`
    return request.get(url, data, loading)
  },
  /**
   * 新建团购活动
   * @returns {*}
   */
  newGroupMsg(data, loading = true) {
    let url = `api/merchant/groupon`
    return request.post(url, data, loading)
  },
  /**
   * 编辑团购活动
   * @returns {*}
   */
  editGroupMsg(id, data, loading = true) {
    let url = `api/merchant/groupon/${id}`
    return request.put(url, data, loading)
  },
  /**
   * 新建砍价活动
   * @returns {*}
   */
  newBargainMsg(data, loading = true) {
    let url = `api/merchant/bargain`
    return request.post(url, data, loading)
  },
  /**
   * 编辑砍价活动
   * @returns {*}
   */
  editBargainMsg(id, data, loading = true) {
    let url = `api/merchant/bargain/${id}`
    return request.put(url, data, loading)
  }
}
