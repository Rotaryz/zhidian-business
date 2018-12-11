<template>
  <div class="shop">
    <scroll>
      <s-header></s-header>
      <s-data :info="ShopDashboard"></s-data>
      <s-router></s-router>
    </scroll>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import SHeader from './s-header/s-header'
  import SData from './s-data/s-data'
  import SRouter from './s-router/s-router'
  import wx from 'weixin-js-sdk'
  import { Global, Mine } from 'api'

  export default {
    components: {
      Scroll,
      SHeader,
      SData,
      SRouter
    },
    created() {
      this._getWxSdk()
      this._getShopDashboard()
      this._getStoreInfo()
    },
    data() {
      return {
        isTabHide: false,
        ShopDashboard: {}
      }
    },
    methods: {
      refresh() {
        this._getShopDashboard()
      },
      _getStoreInfo() {
        Mine.getUserInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            return
          }
          let info = res.data
          if (info.merchant && info.merchant.expired && !this.$storage.get('hasShowExpire')) {
            this.$emit('showExpire')
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
      },
      _getShopDashboard() {
        Global.getShopDashboard().then((res) => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$toast.show(res.message)
            return
          }
          this.ShopDashboard = res.data || {}
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop
    fill-box()
    bottom: $tab-height
</style>
