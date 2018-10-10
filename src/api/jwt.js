import request from 'common/js/request'

export default {
  // 授权
  getToken(data, loading) {
    const url = `/api/jwt/merchant/login`
    return request.post(url, data, loading)
  },
  /**
   * 获取验证码
   * @returns {Promise.<TResult>}
   */
  getSms(data, loading) {
    const url = `/api/sms`
    return request.post(url, data, loading)
  }
}
