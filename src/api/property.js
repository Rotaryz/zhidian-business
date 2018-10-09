import request from '../common/js/request'

export default {
  getShopIncome(data, loading) {
    let url = '/api/merchant/income'
    return request.get(url, data, loading)
  },
  getStaffsIncome(data, loading) {
    let url = '/api/merchant/employee-commission'
    return request.get(url, data, loading)
  },
  getWithdrawalLog(data, loading) {
    let url = '/api/merchant/withdrawal-log'
    return request.get(url, data, loading)
  },
  getWithdrawalInfo(data, loading) {
    let url = '/api/merchant/withdrawal-info'
    return request.get(url, data, loading)
  },
  getBankCardList(data, loading) {
    let url = '/api/merchant/banks'
    return request.get(url, data, loading)
  },
  updateBankCard(data, loading) {
    let url = '/api/merchant/bank-cards'
    return request.post(url, data, loading)
  },
  getMoney(data, loading) {
    let url = '/api/merchant/withdrawal'
    return request.post(url, data, loading)
  }
}
