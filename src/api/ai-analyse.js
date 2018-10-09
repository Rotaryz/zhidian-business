import request from 'common/js/request'

export default {
  // 员工销售力排行榜（boss端）
  getStaffSellList(data, loading) {
    const url = `api/merchant/boss-analysis/boss-shop-sell-rank`
    return request.post(url, data, loading)
  }
}
