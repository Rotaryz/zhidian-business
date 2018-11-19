import storage from 'storage-controller'
import _this from '@/main'

// 错误码检查
export function handleErrorType(code) {
  switch (code) {
    case 404: {
      _toErrorPage(`404`)
      break
    }
    case 10000: {
      alert('error 10000')
      _handleLoseEfficacy()
      break
    }
    default:
      break
  }
}

function _toErrorPage(useType) {
  // const path = `/page-error` // todo
  // _this.$router.replace({path, query: {useType}})
}

function _handleLoseEfficacy() {
  const currentRoute = _this.$route.path
  if (currentRoute !== '/') {
    storage.set('beforeLoginRoute', currentRoute)
  }
  storage.remove('token')
  _this.$router.replace('/login')
  // _this.$login.show()
}

export function showLoading(loading) {
  if (loading) {
    _this.$loading.show()
  }
}
