import request from 'common/js/request'

export default {
  /**
   * 获取模板列表
   */
  getTemplateList(loading = true) {
    let url = '/api/merchant/brand-template'
    return request.get(url, {}, loading)
  },
  /**
   * 导入模板
   */
  leadingIn(templateId, loading = false) {
    let url = `/api/merchant/brand-template/${templateId}`
    return request.put(url, {}, loading)
  },
  /**
   * 一键生成/更新模板
   */
  makeTemplate(data, loading = false) {
    let url = '/api/merchant/brand-template'
    return request.post(url, data, loading)
  }
}
