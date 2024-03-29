import CITY_JSON from 'common/js/city'
import axios from 'axios'

const REGPHONE = /^(13[0-9]|14[579]|15[0-3,5-9]|16[0-9]|17[0135678]|18[0-9]|19[0-9])\d{8}$/
// 正整数正则
export const RATE = /^[0-9]\d*$/
// 金额二位数正则
export const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$|^(0|0.0|0.00)$/

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

export function radarTimeFormat(time) {
  let resTime = new Date(time * 1000)
  let nowDate = resTime.toLocaleDateString()
  let nowTime = formatTime(resTime)
  let todayTime = new Date()
  let todayDate = formatDateTime(todayTime)
  let yesToday = todayTime.setDate(todayTime.getDate() - 1)
  let yesTodayDateTime = new Date(yesToday)
  let yesTodayDate = formatDateTime(yesTodayDateTime)
  nowDate = nowDate.replace(todayDate, '')
  nowDate = nowDate.replace(yesTodayDate, '昨天').trim()
  nowTime = nowTime.replace(todayDate, '')
  nowTime = nowTime.replace(yesTodayDate, '昨天').trim()
  return {
    date: nowDate,
    time: nowTime
  }
}

export function formatDateTime(time, flag = '/') {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].join(flag)
}

export function formatTime(time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()

  const t1 = [year, month, day].join('/')
  const t2 = [hour, minute].map(formatNumber).join(':')
  return `${t1} ${t2}`
}

export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const cityData = doCity(CITY_JSON)

export function getLocation(address) {
  const KEY = '206ec5511b39a51e02627ffbd8dfc16c'
  return new Promise((resolve, reject) => {
    axios.get(`https://restapi.amap.com/v3/geocode/geo?address=${address}&key=${KEY}`)
      .then(resolve)
      .catch(reject)
  })
}

export function getAddress(location) {
  const KEY = '206ec5511b39a51e02627ffbd8dfc16c'
  return new Promise((resolve, reject) => {
    axios.get(`https://restapi.amap.com/v3/geocode/regeo?location=${location}&key=${KEY}`)
      .then(resolve)
      .catch(reject)
  })
}
