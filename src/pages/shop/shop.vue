<template>
  <div class="shop">
    <scroll
      bcColor="#f6f6f6"
      ref="scroll"
      :pullDownRefresh="pullDownRefreshObj"
      @pullingDown="onPullingDown"
    >
      <s-header :shopInfo="shopInfo" @showExpire="showExpire"></s-header>
      <s-data :info="businessData" :values="values"></s-data>
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
  import { Global, Mine } from 'api'

  export default {
    data() {
      return {
        isTabHide: false,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        businessData: [
          {
            name: '营业额',
            number: 'today_turnover',
            num: 'difference_turnover',
            type: 'compare_turnover'
          }, {
            name: '订单',
            number: 'today_order_count',
            num: 'difference_order_count',
            type: 'compare_order_count'
          }, {
            name: '客户',
            number: 'today_customer_count',
            num: 'difference_customer_count',
            type: 'yesterday_customer_count'
          }
        ],
        values: {},
        shopInfo: {}
      }
    },
    created() {
      this._getWxSdk()
      this._getStoreInfo() // 获取商家个人信息
      this._getShopInfo() // 获取店铺信息
      this._getBusinessDetail() // 获取营业信息
    },
    methods: {
      showExpire() {
        this.$emit('showExpire')
      },
      refresh() {
        this._getShopInfo()
        this._getBusinessDetail()
      },
      onPullingDown() {
        this.refresh()
      },
      _getShopInfo() {
        Mine.getShopInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          res.data.logo = res.data.logo ? res.data.logo : {}
          this.shopInfo = res.data
          this.$refs.scroll && this.$refs.scroll.forceUpdate()
        })
      },
      _getBusinessDetail() {
        Mine.getBusinessDetail()
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.values = res.data
          })
      },
      _getStoreInfo() {
        Mine.getUserInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          let info = res.data
          // info.store.is_branch = 1
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
      }
    },
    computed: {
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      }
    },
    watch: {
      pullDownRefreshObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    filters: {
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
  .padding
    height: 20px
</style>
