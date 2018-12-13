<template>
  <div class="shop">
    <scroll>
      <router-link tag="div" class="header" to="">
        <div class="logo" v-if="shopInfo.logo && shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
        <img class="logo" src="./pic-default_people@2x.png" v-else/>
        <div class="msg-box">
          <div class="title">{{shopInfo.name || '店铺名称'}}</div>
          <div class="use-time">
            <span class="time">使用期限:{{userInfo.merchant.expire_time | formatTime}}</span>
            <span class="big-box" @click.stop="showExpire" v-if="userInfo.merchant && userInfo.merchant.expired">
            <span class="red-box">续费</span>
          </span>
          </div>
        </div>
        <div class="right-arrow"></div>
      </router-link>
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
    height: 24vw
    border-1px($color-E6E6E6)
    background: #fff
    layout(row)
    align-items: center
    .logo
      width: 17vw
      height: @width
      margin-left: 12.9px
    .msg-box
      flex: 1
      padding: 0 6px
      .title
        font-family: PingFangSC-Regular
        font-size: $font-size-16
        color: #363547
        letter-spacing: 0.8px
        text-align: justify
        word-break: break-all
        margin-bottom: 10px
      .use-time
        display: flex
        align-items: center
        .time
          font-size: $font-size-14
          color: $color-9B9B9B
          font-family: $font-family-regular
        .big-box
          padding: 5px
        .red-box
          width: 36px
          height: 18px
          line-height: 18px
          text-align: center
          border-1px($color-EF705D)
          font-size: $font-size-12
          font-family: $font-family-medium
          color: $color-EF705D
          display: block
    .right-arrow
      width: 7px
      height: 12px
      icon-image(icon-press_right)
      margin: 0 15px 0 12px
</style>
