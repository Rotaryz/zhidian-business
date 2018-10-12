import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.SAVE_EMPLOYEE](state, employee) {
    state.employee = employee
  },
  [TYPES.UPDATE_CONTENT_TEXT](state, obj) {
    state.contentText = obj
  }
}

export default mutations
