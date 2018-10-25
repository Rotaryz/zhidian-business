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
  }
}
