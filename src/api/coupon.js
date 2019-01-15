import {defaultProcess} from 'common/js/request-utils'

export default {
  // 成员(员工)列表
  create(data, loading, toast, fn = '_formatCreateData') {
    const url = `/api/merchant/coupon`
    FN_ARR[fn] && (data = FN_ARR[fn](data))
    return defaultProcess('post', url, data, loading, toast)
  },
  getList(data, loading, toast, fn) {
    const url = `/api/merchant/coupon`
    return defaultProcess('get', url, data, loading, toast, FN_ARR[fn])
  },
  getDetail(data, loading, toast, fn = '_resolveDetailData') {
    const url = `/api/merchant/coupon/` + data.couponId
    return defaultProcess('get', url, data, loading, toast, FN_ARR[fn])
  },
  update(data, loading, toast, fn = '_formatCreateData') {
    const url = `/api/merchant/coupon/` + data.couponId
    FN_ARR[fn] && (data = FN_ARR[fn](data))
    return defaultProcess('put', url, data, loading, toast)
  },
  close(data, loading, toast, fn = '') {
    const url = `/api/merchant/coupon-close/` + data.couponId
    FN_ARR[fn] && (data = FN_ARR[fn](data))
    data = ''
    return defaultProcess('put', url, data, loading, toast)
  }
}
const FN_ARR = {
  _formatCreateData,
  _resolveDetailData
}
// 组装创建优惠券
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

function _resolveDetailData(res) {
  let resData = res.data
  let goodList = resData.goods_list.map((item) => {
    return {
      title: item.title,
      id: item.id
    }
  }) || []
  let data = {
    name: resData.coupon_name,
    useType: resData.coupon_type,
    discounts: resData.denomination,
    stock: resData.stock,
    minStock: resData.stock,
    moneyLimit: resData.condition,
    stockLimit: resData.take_limit,
    useRange: resData.range_type,
    startDate: resData.start_at,
    endDate: resData.end_at,
    selectItem: goodList[0] || {}
  }
  res.data = data
  return res
}
