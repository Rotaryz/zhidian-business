import * as TYPES from './mutation-types'

export const test = function({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

export const saveEmployee = ({commit, state}, employee) => {
  commit(TYPES.SAVE_EMPLOYEE, employee)
}
export const updateContentText = ({commit, state}, obj) => {
  commit(TYPES.UPDATE_CONTENT_TEXT, obj)
}

export const getPrizeList = ({commit, state}, obj) => {
  commit(TYPES.GET_PRIZE_LIST, obj)
}

export const choosePrize = ({commit, state}, obj) => {
  commit(TYPES.CHOOSE_PRIZE, obj)
}
