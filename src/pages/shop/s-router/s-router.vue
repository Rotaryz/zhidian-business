<template>
  <div class="s-router">
    <div class="manage">
      <h3 class="title">店铺管理</h3>
      <ul class="s-ul border-bottom-1px border-right-1px">
        <li class="item-wrapper"  v-if="!(type === 0 && item.path === '/brand-template')"  v-for="(item, index) in manageArray" :key="index" @click="navHandle(item)">
          <div class="logo">
            <div class="icon" :class="item.icon"></div>
          </div>
          <div class="txt">{{item.title}}</div>
        </li>
      </ul>
    </div>
    <div class="activity">
      <h3 class="title">营销活动</h3>
      <ul class="s-ul border-bottom-1px border-right-1px">
        <li class="item-wrapper" v-for="(item, index) in activityArray" :key="index" @click="navHandle(item)">
          <div class="logo">
            <div class="icon" :class="item.icon"></div>
          </div>
          <div class="txt">{{item.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import {Exchange} from 'api'

  const manageArray = [
    {
      icon: 'one',
      title: '扫码核销',
      path: ''
    },
    {
      icon: 'two',
      title: '输码核销',
      path: '/exchange-code'
    },
    {
      icon: 'three',
      title: '订单',
      path: '/order-manage'
    },
    {
      icon: 'four',
      title: '资产',
      path: '/property'
    },
    {
      icon: 'five',
      title: '服务',
      path: '/service-manage'
    },
    {
      icon: 'six',
      title: '商品',
      path: '/goods-manage'
    },
    {
      icon: 'seven',
      title: '门店信息',
      path: '/shop-info'
    },
    {
      icon: 'eight',
      title: '品牌故事',
      path: '/content'
    },
    {
      icon: 'nine',
      title: '品牌模板',
      path: '/brand-template'
    }
  ]

  const activityArray = [
    {
      icon: 'ac-one',
      title: '活动',
      path: '/activity-manage'
    },
    {
      icon: 'ac-two',
      title: '大转盘',
      path: '/wheel'
    },
    {
      icon: 'ac-three',
      title: '奖品券',
      path: '/exchange-manage'
    },
    {
      icon: 'ac-four',
      title: '优惠券',
      path: '/discount-coupon'
    }
  ]
  export default {
    props: {
      type: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        manageArray,
        activityArray,
        noClick: false
      }
    },
    methods: {
      navHandle(item) {
        // 防止重复触发
        if (this.noClick) return
        this.noClick = true
        setTimeout(() => {
          this.noClick = false
        }, 300)
        if (item.icon === 'one') {
          this._getScanner()
          return
        }
        this.$router.push('/shop' + item.path)
      },
      _getScanner(callback) {
        let that = this
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            let obj = JSON.parse(result)
            Exchange.verification(obj).then((res) => {
              that.$loading.hide()
              if (res.error === that.$ERR_OK) {
                that.$toast.show('核销成功')
              } else {
                that.$toast.show(res.message)
              }
            })
            callback && callback()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .s-router
    .manage,.activity
      margin: 10px 12px 0
      border-radius: 4px
      background: $color-white
      border-1px(#E6E6E6, 4PX)
      .title
        font-size: 16px
        padding: 15px 0 0 12px
        font-family: $font-family-medium
        color: $color-27273E
        margin-bottom: 20px
      .s-ul
        position: relative
        background-color: #fff
        box-sizing: border-box
        width: 100%
        border-radius: 4px
        overflow: hidden
        .item-wrapper
          position: relative
          width: 33.333%
          layout()
          justify-content: center
          align-items: center
          float: left
          font-size: 13px
          color: $color-27273E
          line-height: 14px
          margin-bottom: 25px
          z-index: 22
          .logo
            width: 43px
            height: @width
            margin-bottom: 9px
            border-radius: 50%
            background: #F5F5F9
            display: flex
            justify-content: center
            align-items: center
            .icon
              width: 30px
              height: @width
              &.one
                icon-image(icon-scancode)
              &.two
                icon-image(icon-inputcode)
              &.three
                icon-image(icon-order)
              &.four
                icon-image(icon-asset)
              &.five
                icon-image(icon-service)
              &.six
                icon-image(icon-goods)
              &.seven
                icon-image(icon-info)
              &.eight
                icon-image(icon-content)
              &.nine
                icon-image(icon-template)
              &.ac-one
                icon-image(icon-activity)
              &.ac-two
                icon-image(icon-turntable)
              &.ac-three
                icon-image(icon-grade)
              &.ac-four
                icon-image(icon-coupon)

</style>
