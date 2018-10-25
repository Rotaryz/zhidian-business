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
    prizeList.forEach(item => {
      let node = prizePool.find(it => it.prize_id === item.prize_id)
      arr.push({
        'prize_id': item.prize_id,
        'totalStock': item.stock + (node && node.prize_stock),
        'stock': item.stock
      })
    })
    state.prizeStorage = arr
  },
  // 初始化奖品列表
  [TYPES.INIT_PRIZE_ARRAY](state, obj) {
    state.prizeArray = obj
  },
  // // 选择奖品
  // [TYPES.CHOOSE_PRIZE](state, obj) {
  //   let arr = []
  //   state.prizeList.forEach(item => {
  //     item.isCheck = false
  //     if (item.prize_id === obj.prize_id) {
  //       item.isCheck = true
  //     }
  //     arr.push(item)
  //   })
  //   state.prizeList = arr
  // },
  // 更新奖品库存
  [TYPES.UPDATE_PRIZE_STOCK](state, obj) {
    let index = state.prizeList.findIndex(item => item.prize_id === obj.item.prize_id)
    obj.item.stock = obj.item.originStock - obj.number
    state.prizeList.splice(index, 1, obj.item)
  },
  // 更新奖品池
  [TYPES.UPDATE_PRIZE_POOL](state, obj) {
    // console.log(obj)
    // const {prizeFlag, saveIndex} = obj
    // // 还原之前选择
    // const oldNode = state.prizeList.find(item => item.index === prizeFlag)
    // const currentNode = state.prizeList[saveIndex]
    // currentNode.prize_stock = 0
    // console.log(saveIndex)
    let item = state.prizeList[obj.saveIndex]
    item.index = obj.prizeFlag
    item.prize_stock = 0
    state.prizeList.splice(obj.saveIndex, 1, item)
  }
}

export default mutations
