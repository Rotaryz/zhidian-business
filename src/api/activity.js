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
  }
}
