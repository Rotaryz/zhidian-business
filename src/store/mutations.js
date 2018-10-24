import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE] (state, argument) {
    state.argument = argument
  },
  [TYPES.SAVE_EMPLOYEE] (state, employee) {
    state.employee = employee
  },
  [TYPES.UPDATE_CONTENT_TEXT] (state, obj) {
    state.contentText = obj
  },
  [TYPES.GET_PRIZE_LIST] (state, obj) {
    let prizeList = obj.map(item => {
      return {
        checkArr: new Array(5).fill(false),
        serverImg: item.image_url,
        title: item.title,
        store: item.stock,
        id: item.id,
        prizeId: item.prize_id,
        type: item.type
      }
    })
    let prizePool = []
    state.prizeCollection = {prizeList, prizePool}
  },
  [TYPES.CHOOSE_PRIZE] (state, obj) {
    state.prizeList.map(item => {
      item.isCheck = false
      if (item.id === obj.id) {
        item.isCheck = true
      }
      return item
    })
  }
}

export default mutations
