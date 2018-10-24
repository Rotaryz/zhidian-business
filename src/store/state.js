import { getPlatform } from 'common/js/utils'

const platform = getPlatform()
const state = {
  argument: {},
  platform, // 平台信息
  employee: {},
  contentText: {txt: '', index: 0},
  prizePool: [], // 奖品池列表（大转盘已经选的奖品）
  prizeList: [] // 奖品列表
}

export default state
