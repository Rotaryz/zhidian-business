import request from '../common/js/request'

export default {
  /**
   * 获取服务列表
   * @returns {*}
   */
  getServiceList(data, loading = true) {
    let url = 'api/merchant/goods'
    return request.get(url, data, loading)
  },
  /**
   * 获取服务详情
   * @returns {*}
   */
  getServiceDetail(id, loading = true) {
    let url = `api/merchant/goods/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 获取服务是否关联活动
   * @returns {*}
   */
  getServiceConect(id, loading = true) {
    let url = `api/merchant/goods/before-destroy/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 下架服务
   * @returns {*}
   */
  setServiceDown(id, loading = true) {
    let url = `api/merchant/goods-offline/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 删除服务
   * @returns {*}
   */
  setServiceDel(id, loading = true) {
    let url = `api/merchant/goods/${id}`
    return request.delete(url, {}, loading)
  },
  /**
   * 编辑服务
   * @returns {*}
   */
  setServiceMsg(id, data, loading = true) {
    let url = `api/merchant/goods/${id}`
    return request.put(url, data, loading)
  },
  /**
   * 新建服务
   * @returns {*}
   */
  newServiceMsg(data, loading = true) {
    console.log(data)
    let url = `api/merchant/goods`
    return request.post(url, data, loading)
  }
}
