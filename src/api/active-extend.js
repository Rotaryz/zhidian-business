import request from 'common/js/request'

export default {
  getPrizeList(data, loading = true) {
    let url = '/api/merchant/prize-pools'
    return request.get(url, data, loading)
  },
  updateWheel(data, loading = true) {
    let url = '/api/merchant/lucky-draw'
    return request.post(url, data, loading)
  }
}
