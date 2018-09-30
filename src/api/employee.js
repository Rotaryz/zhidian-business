import request from 'common/js/request'

export default {
  // 成员(员工)列表
  getEmployeeList(data, loading) {
    const url = `/api/merchant/employees`
    return request.get(url, data, loading)
  },
  // 成员(员工)列表
  postNewEmployee(data, loading) {
    const url = `/api/merchant/employees`
    return request.post(url, data, loading)
  }
}
