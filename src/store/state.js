import { getPlatform } from 'common/js/utils'

const platform = getPlatform()
const state = {
  argument: {},
  platform, // 平台信息
  employee: {},
  contentText: {txt: '', index: 0},
  // 奖品库存列表
  prizeStorage: [],
  // 奖品列表
  prizeArray: [],
  refreshShopPage: false
}

export default state
