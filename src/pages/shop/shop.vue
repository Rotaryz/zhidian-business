<template>
  <div class="shop">
    <scroll bcColor="#f6f6f6">
      <div class="header">
        <router-link tag="div" class="msg" to="/shop/account-detail">
          <div class="logo" v-if="shopInfo.logo && shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
          <img class="logo" src="./pic-default_people@2x.png" v-else/>
          <div class="msg-box">
            <div class="title">{{shopInfo.name || '店铺名称'}}</div>
            <div class="use-time">
              <span class="time">使用期限:{{userInfo.merchant.expire_time | formatTime}}</span>
            </div>
          </div>
        <div class="right-arrow"></div>
        </router-link>
      </div>
      <s-data :info="ShopDashboard"></s-data>
      <!--<s-header></s-header>-->
      <s-router></s-router>
      <div class="padding"></div>
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
  import {formatDateTime} from 'common/js/utils'
  import { Global, Mine } from 'api'

  export default {
    data() {
      return {
        isTabHide: false,
        ShopDashboard: {},
        shopInfo: {}
      }
    },
    created() {
      this._getWxSdk()
      this._getShopDashboard()
      this._getStoreInfo()
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
    },
    computed: {
      userInfo() {
        return this.$storage.get('info')
      }
    },
    filters: {
      formatTime(val) {
        if (!val) return ''
        return formatDateTime(val * 1000, '-')
      }
    },
    components: {
      Scroll,
      SHeader,
      SData,
      SRouter
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop
    fill-box()
  .header
    height: 147px
    bg-image(bg-my)
    background-size: 100% 100%
    position: relative
    padding: 15px
    box-sizing: border-box
    .msg
      layout(row)
      align-items: center
      .logo
        width: 15vw
        height: @width
        margin-right: 12px
        border-radius: 50%
      .msg-box
        flex: 1
        .title
          font-family: $font-family-medium
          font-size: $font-size-16
          color: $color-white
          letter-spacing: 0.8px
          text-align: justify
          word-break: break-all
          margin-bottom: 10px
        .use-time
          display: flex
          align-items: center
          .time
            font-size: $font-size-14
            color: $color-white
            font-family: $font-family-regular
            opacity: 0.7
      .right-arrow
        width: 7px
        height: 12px
        icon-image(icon-press_right)
  .padding
    height: 20px
</style>
