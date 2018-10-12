import * as TYPES from './mutation-types'

export const test = function({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

export const saveEmployee = ({commit, state}, employee) => {
  commit(TYPES.SAVE_EMPLOYEE, employee)
}
export const updateContentText = ({commit, state}, obj) => {
  commit(TYPES.SAVE_EMPLOYEE, obj)
}
