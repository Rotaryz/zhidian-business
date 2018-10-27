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
    const {prizeList, prizePool} = obj
    let arr = []
    let itemStocksObj = {}
    let idx = 0
    while (prizeList.length > 0) {
      let flag = prizeList[idx].prize_id === prizeList[prizeList.length - 1].prize_id
      if (flag && idx !== prizeList.length - 1) {
        let key = prizeList[idx].prize_id
        let value = prizeList[idx].prize_stock + prizeList[prizeList.length - 1].prize_stock
        if (itemStocksObj[key]) {
          itemStocksObj[key] += value
        } else {
          itemStocksObj[key] = value
        }
        prizeList[idx] && prizeList.splice(idx, 1)
        prizeList[prizeList.length - 1] && prizeList.splice(prizeList.length - 1, 1)
        idx = 0
      } else if (idx === prizeList.length - 1) {
        let key = prizeList[idx].prize_id
        let value = prizeList[idx].prize_stock
        if (itemStocksObj[key]) {
          itemStocksObj[key] += value
        } else {
          itemStocksObj[key] = value
        }
        prizeList.pop()
      } else {
        idx++
      }
    }
    prizePool.forEach(item => {
      let number = itemStocksObj[item.prize_id] || 0
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
