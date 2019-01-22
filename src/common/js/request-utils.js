import storage from 'storage-controller'
import _this from '@/main'
import request from './request'

// 错误码检查
export function handleErrorType(code) {
  switch (code) {
    case 404: {
      _toErrorPage(`404`)
      break
    }
    case 10000: {
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

// 通用的api请求方式
export function defaultProcess(...args) {
  const [method, url, data, loading = true, toast = true] = args
  let fn = args[args.length - 1]
  return new Promise((resolve, reject) => {
    request[method](url, data, loading).then(res => {
      if (loading) {
        _this.$loading.hide()
      }
      if (_this.$ERR_OK !== res.error) {
        toast && _this.$toast.show(res.message)
        return reject
      }
      if (typeof fn === 'function') {
        res = fn(res)
      }
      resolve(res)
    }).catch(reject)
  })
}
