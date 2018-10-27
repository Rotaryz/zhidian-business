import * as TYPES from './mutation-types'

export const test = function ({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

export const saveEmployee = ({commit, state}, employee) => {
  commit(TYPES.SAVE_EMPLOYEE, employee)
}
export const updateContentText = ({commit, state}, obj) => {
  commit(TYPES.UPDATE_CONTENT_TEXT, obj)
}
// 初始化奖品库存列表
export const initPrizeStorage = ({commit, state}, obj) => {
  commit(TYPES.INIT_PRIZE_STORAGE, obj)
}
// 初始化可添加的奖品库存列表
export const initPrizeArray = ({commit, state}, obj) => {
  commit(TYPES.INIT_PRIZE_ARRAY, obj)
}
// 更新奖品库存
export const updatePrizeStorage = ({commit, state}, obj) => {
  commit(TYPES.UPDATE_PRIZE_STORAGE, obj)
}
// 更新奖品库存
export const deletePrizeStorage = ({commit, state}, obj) => {
  commit(TYPES.DELETE_PRIZE_STORAGE, obj)
}
// 更新奖品库存
export const clearPrizePage = ({commit, state}) => {
  commit(TYPES.CLEAR_PRIZE_PAGE)
}
