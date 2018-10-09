import request from 'common/js/request'

export default {
  // 核销
  verification(data, loading) {
    const url = `/api/merchant/verification`
    return request.post(url, data, loading)
  }
}
