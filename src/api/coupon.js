import {defaultProcess} from 'common/js/request-utils'

export default {
  create(data, loading, toast, fn = '_formatCreateData') {
    const url = `/api/merchant/coupon`
    FN_ARR[fn] && (data = FN_ARR[fn](data))
    return defaultProcess('post', url, data, loading, toast)
  },
  getList(data, loading, toast, fn = '_resolveListData') {
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
  _resolveDetailData,
  _resolveListData
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

// 解析详情
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

// 解析列表
function _resolveListData(res) {
  let data = res.data.map((item) => {
    return {
      id: item.id,
      coupon_name: item.coupon_name,
      coupon_type: item.coupon_type,
      coupon_type_str: item.coupon_type_str,
      denomination: item.denomination,
      use_type: item.use_type,
      use_type_str: item.use_type_str,
      condition: item.condition,
      condition_str: item.condition_str,
      start_at: item.start_at.replace(/-/g, '.'),
      end_at: item.end_at.replace(/-/g, '.'),
      range_type: item.range_type,
      range_type_str: item.range_type_str
    }
  })
  res.data = data
  return res
}
