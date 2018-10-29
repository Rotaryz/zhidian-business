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
  },
  // 初始化奖品池共有库存
  [TYPES.INIT_PRIZE_STORAGE](state, obj) {
    let {prizeList, prizePool} = obj
    let arr = []
    prizePool.forEach(item => {
      let number = 0
      prizeList.forEach((curVal) => {
        if (curVal.prize_id === item.prize_id) {
          number += curVal.prize_stock
        }
      })
      arr.push({
        prize_id: item.prize_id,
        totalStock: item.stock + number,
        stock: item.stock
      })
    })
    state.prizeStorage = arr
  },
  // 初始化奖品列表
  [TYPES.INIT_PRIZE_ARRAY](state, obj) {
    state.prizeArray = obj
  },
  // 更新奖品池
  [TYPES.UPDATE_PRIZE_STORAGE](state, obj) {
    let node
    let index
    state.prizeStorage.forEach((item, idx) => {
      if (item.prize_id === obj.prize_id) {
        item.stock -= +obj.number
        index = idx
        node = {...item}
      }
    })
    state.prizeStorage.splice(index, 1, node)
  },
  // 删除奖品库存
  [TYPES.DELETE_PRIZE_STORAGE](state, obj) {
    let node
    let index
    state.prizeStorage.forEach((item, idx) => {
      if (item.prize_id === obj.prize_id) {
        item.stock += +obj.prize_stock
        index = idx
        node = {...item}
      }
    })
    state.prizeStorage.splice(index, 1, node)
  },
  // 删除奖品库存
  [TYPES.CLEAR_PRIZE_PAGE](state) {
    state.prizeStorage = []
    state.prizeArray = []
  }
}

export default mutations
