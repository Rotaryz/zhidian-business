import { getPlatform } from 'common/js/utils'

const platform = getPlatform()
const state = {
  argument: {},
  platform, // 平台信息
  employee: {},
  contentText: {txt: '', index: 0}
}

export default state
