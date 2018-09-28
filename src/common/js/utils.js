const REGPHONE = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
// 获取设备信息
export function getPlatform() {
  const navigator = window.navigator
  const u = navigator.userAgent
  // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isiOS ? 'ios' : 'android'
}

export function checkIsPhoneNumber(phoneNum) {
  return REGPHONE.test(phoneNum)
}
