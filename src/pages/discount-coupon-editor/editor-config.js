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
export const SHEET_LIST = [
  {title: '满减券', key: '1'},
  {title: '折扣券', key: '2'}
]
export const USE_TYPE_ARR = [
  ['满减券', '折扣券']
]
export const STOCK_LIMIT_ARR = [
  ['1张', '2张', '3张', '5张', '10张', '不限制']
]
export const USE_RANGE_ARR = [
  ['全部商品', '指定商品/服务']
]
export const PICKER_DATA_OBJ = {
  USE_TYPE_ARR,
  STOCK_LIMIT_ARR,
  USE_RANGE_ARR
}

export function formatPickerDate(arr) {
  let date = ''
  arr.forEach((item) => {
    date += item.value
  })
  return date
}
