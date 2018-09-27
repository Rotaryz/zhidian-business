import request from 'common/js/request'
import { BASE_URL } from 'common/js/config'
const baseURL = BASE_URL

export default {
  /**
   * 获取签名
   * @returns {Promise.<*>}
   */
  getUploadSign() {
    const url = `${baseURL.upload}/api/cos/upload-sign?method=put`
    return request.get(url, {})
  },
  /**
   * 获取文件夹存储桶
   * @param data
   * @returns {Promise.<*>}
   */
  getUploadParam(data) {
    const url = `${baseURL.upload}/api/cos/upload-param`
    return request.get(url, data)
  },
  /**
   * 数据入库
   * @param data
   * @returns {Promise.<*>}
   */
  saveFile(data) {
    const url = `${baseURL.upload}/api/cos/save-file`
    return request.post(url, data)
  }
}
