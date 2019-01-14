export const PAGE_CONFIG = {
  '1': {
    buttonGroupHeight: 64,
    hasDisableButton: false
  },
  '2': {
    buttonGroupHeight: 120,
    hasDisableButton: true
  }
}
export const PAGE_TYPE = {
  'NEW': '1',
  'EDITOR': '2'
}

// 选择器的映射关系
const USE_TYPE_OBJ = [
  {title: '满减券', key: '3'},
  {title: '折扣券', key: '4'}
]
const STOCK_LIMIT_OBJ = [
  {title: '1张', key: '1'},
  {title: '2张', key: '2'},
  {title: '3张', key: '3'},
  {title: '5张', key: '5'},
  {title: '10张', key: '10'},
  {title: '不限制', key: '0'}
]
const USE_RANGE_OBJ = [
  {title: '全部商品', key: '0'},
  {title: '指定商品/服务', key: '1'}
]
export const PICKER_RELATION_OBJ = {
  USE_TYPE_ARR: {
    arr: USE_TYPE_OBJ,
    key: 'useType'
  },
  STOCK_LIMIT_ARR: {
    arr: STOCK_LIMIT_OBJ,
    key: 'stockLimit'
  },
  USE_RANGE_ARR: {
    arr: USE_RANGE_OBJ,
    key: 'useRange'
  }
}
export const SHEET_LIST = USE_TYPE_OBJ
export const USE_TYPE_ARR = [
  _formatArr(USE_TYPE_OBJ)
]
export const STOCK_LIMIT_ARR = [
  _formatArr(STOCK_LIMIT_OBJ)
]
export const USE_RANGE_ARR = [
  _formatArr(USE_RANGE_OBJ)
]
export const PICKER_DATA_OBJ = {
  USE_TYPE_ARR,
  STOCK_LIMIT_ARR,
  USE_RANGE_ARR
}

// 处理日期
export function formatPickerDate(arr) {
  let dateArr = []
  arr.forEach((item) => {
    let val = item.value.match(/\d+/g)
    dateArr.push(val[0])
  })
  return dateArr.join('-')
}

function _formatArr(arr) {
  return arr.map((item) => item.title)
}
