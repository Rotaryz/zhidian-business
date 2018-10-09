import request from 'common/js/request'

export default {
  // 核销
  verification(data, loading) {
    const url = `/api/merchant/verification`
    return request.post(url, data, loading)
  },
  getVerificationLog(data, loading) {
    const url = `/api/merchant/verification-log`
    return request.get(url, data, loading)
  }
}
