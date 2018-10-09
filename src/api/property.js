import request from '../common/js/request'

export default {
  getShopIncome(data, loading) {
    let url = '/api/merchant/income'
    return request.get(url, data, loading)
  },
  getStaffsIncome(data, loading) {
    let url = '/api/merchant/employee-commission'
    return request.get(url, data, loading)
  }
}
