import request from '../common/js/request'

export default {
  getContent(data, loading) {
    let url = '/api/merchant/history'
    return request.get(url, data, loading)
  },
  updateContent(data, loading) {
    let url = '/api/merchant/history'
    return request.post(url, data, loading)
  },
  deleteContentItem(data, loading) {
    let url = '/api/merchant/history_detail'
    return request.post(url, data, loading)
  }
}
