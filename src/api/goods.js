import request from '../common/js/request'

export default {
  /**
   * 获取商品列表
   * @returns {*}
   */
  getGoodsList(data, loading = true) {
    let url = 'api/merchant/product'
    return request.get(url, data, loading)
  },
  /**
   * 获取商品详情
   * @returns {*}
   */
  getGoodsDetail(id, loading = true) {
    let url = `api/merchant/product/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 获取商品是否关联活动
   * @returns {*}
   */
  getGoodsConect(id, loading = true) {
    let url = `api/merchant/product/before-destroy/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 下架商品
   * @returns {*}
   */
  setGoodsDown(id, loading = true) {
    let url = `api/merchant/product-offline/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 删除商品
   * @returns {*}
   */
  setGoodsDel(id, loading = true) {
    let url = `api/merchant/product/${id}`
    return request.delete(url, {}, loading)
  },
  /**
   * 编辑商品
   * @returns {*}
   */
  setGoodsMsg(id, data, loading = true) {
    let url = `api/merchant/product/${id}`
    return request.put(url, data, loading)
  },
  /**
   * 新建商品
   * @returns {*}
   */
  newGoodsMsg(data, loading = true) {
    let url = `api/merchant/product`
    return request.post(url, data, loading)
  }
}
