<template>
  <div class="home" @touchmove.prevent>
    <router-view class="home-view" @showExpire="showExpire" @refresh="refresh"/>
    <expire-modal ref="expireModal"></expire-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import ExpireModal from 'components/expire-modal/expire-modal'
  import wx from 'weixin-js-sdk'
  import { Global, Mine } from 'api'

  const COMPONENT_NAME = 'home'

  export default {
    name: COMPONENT_NAME,
    components: {
      ExpireModal
    },
    created() {
      this.$storage.set('hasShowExpire', false)
      this._getStoreInfo()
      this._getWxSdk()
    },
    methods: {
      refresh() {
        this._getStoreInfo()
      },
      showExpire() {
        this.$refs.expireModal.show()
      },
      _getStoreInfo() {
        Mine.getUserInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          let info = res.data
          // this.type = res.data.merchant && res.data.merchant.type
          // info.store.is_branch = 1
          if (info.merchant && info.merchant.expired && !this.$storage.get('hasShowExpire')) {
            // this.$emit('showExpire')
            this.showExpire()
            this.$storage.set('hasShowExpire', true)
          }
          this.$storage.set('info', info)
        })
      },
      _getWxSdk() {
        let url = window.location.href
        Global.jssdkConfig({url}).then((res) => {
          if (res.error === this.$ERR_OK) {
            res = res.data
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: '' + res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: '' + res.timestamp, // 必填，生成签名的时间戳
              nonceStr: '' + res.nonceStr, // 必填，生成签名的随机串
              signature: '' + res.signature, // 必填，签名，见附录1
              jsApiList: ['previewImage', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"
  .home
    .home-view
      z-index: 10
</style>
