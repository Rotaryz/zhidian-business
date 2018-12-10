<template>
  <div class="base-wx-input" @click="clickHandle">
    base-wx-input
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import { Global } from 'api'
  const COMPONENT_NAME = 'BASE_WX_INPUT'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    },
    created() {
      this._getWxSdk()
    },
    methods: {
      async clickHandle() {
        try {
          let data = await this._chooseImage()
          let base64 = await this._getLocalImgData(data[0])
          alert(JSON.stringify(data))
          alert(JSON.stringify(base64))
        } catch (e) {
          alert(JSON.stringify(e) + '%error%')
        }
      },
      _chooseImage() {
        return new Promise((resolve, reject) => {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              resolve(localIds)
            }
          })
        })
      },
      _getLocalImgData(id) {
        return new Promise((resolve, reject) => {
          wx.getLocalImgData({
            localId: id, // 图片的localID
            success: function (res) {
              let localData = res.localData // localData是图片的base64数据，可以用img标签显示
              resolve(localData)
            }
          })
        })
      },
      _getWxSdk() {
        let url = window.location.href
        Global.jssdkConfig({url}).then((res) => {
          if (res.error !== this.$ERR_OK) return
          res = res.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '' + res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: '' + res.timestamp, // 必填，生成签名的时间戳
            nonceStr: '' + res.nonceStr, // 必填，生成签名的随机串
            signature: '' + res.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-wx-input
    width: 50px
    height :50px
    background :rebeccapurple
</style>
