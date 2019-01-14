import {defaultProcess} from 'common/js/request-utils'

export default {
  // 成员(员工)列表
  create(data, loading, toast, fn) {
    data = _formatCreateData(data)
    console.log(data)
    const url = `/api/merchant/coupon`
    return defaultProcess('post', url, data, loading, toast, fn)
  }
}

function _formatCreateData(data) {
  return {
    coupon_name: data.name,
    coupon_type: data.useType,
    denomination: data.discounts,
    stock: data.stock,
    condition: data.moneyLimit,
    take_limit: data.stockLimit,
    range_type: data.useRange,
    range_value: data.selectItem.id || '',
    start_at: data.startDate,
    end_at: data.endDate
  }
}
