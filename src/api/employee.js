import request from 'common/js/request'

export default {
  // 成员(员工)列表
  getEmployeeList(data, loading) {
    const url = `/api/merchant/employees`
    return request.get(url, data, loading)
  },
  // 创建新店员
  createNewEmployee(data, loading) {
    const url = `/api/merchant/employees`
    return request.post(url, data, loading)
  },
  // 编辑店员
  editEmployee(data, id, loading) {
    const url = `api/merchant/employees/${id}`
    return request.put(url, data, loading)
  },
  // 删除店员
  delEmployee(id, loading) {
    const url = `api/merchant/employees/${id}`
    return request.delete(url, {}, loading)
  },
  // 删除店员
  getEmployeeMsg(id, loading) {
    const url = `api/merchant/employees/${id}`
    return request.get(url, {}, loading)
  },
  // 店铺列表
  getShopList(data, loading) {
    const url = `api/merchant/shops`
    return request.get(url, data, loading)
  },
  // 解除绑定
  setRelieve(id, data, loading) {
    const url = `api/merchant/employees/${id}/release`
    return request.post(url, data, loading)
  },
  // 店铺详情
  getShopDel(id, loading) {
    const url = `api/merchant/shops/${id}`
    return request.get(url, {}, loading)
  },
  // 店铺详情
  bindShop(shopId, data, loading) {
    const url = `api/merchant/shops/${shopId}/bind`
    return request.post(url, data, loading)
  }
}
