import request from 'common/js/request'

export default {
  /**
   * 获取活动列表
   * @returns {*}
   */
  getPrizeList(data, loading = true) {
    let url = '/api/merchant/prize-pools'
    return request.get(url, data, loading)
  }
}
