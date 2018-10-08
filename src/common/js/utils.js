import CITY_JSON from 'common/js/city'

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

function doCity(city) {
  let arr = []
  for (let [, value] of Object.entries(city)) {
    let obj1 = {}
    obj1.value = value.name
    obj1.children = []
    const two = value.child
    for (let [, val] of Object.entries(two)) {
      let obj2 = {}
      obj2.value = val.name
      obj2.children = []
      const three = val.child
      for (let [, cc] of Object.entries(three)) {
        obj2.children.push({value: cc})
      }
      obj1.children.push({value: obj2.value, children: obj2.children})
    }
    arr.push(obj1)
  }
  return arr
}

export const cityData = doCity(CITY_JSON)
