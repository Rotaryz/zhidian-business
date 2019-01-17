import APP_CONFIG from 'utils/_app-config'
export const _CONFIG = {
  me: {
    buttonHeight: {
      boss: 64,
      staff: 0
    }
  },
  platform: {
    buttonHeight: {
      boss: 64,
      staff: 64
    }
  }
}
export const PAGE_CONFIG = _CONFIG[APP_CONFIG.appKey]
