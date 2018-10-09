import request from 'common/js/request'

export default {
  // 获取员工列表
  getStaffList(data, loading) {
    const url = `/api/merchant/ws-boss-employee-ranking`
    return request.post(url, data, loading)
  }
}
