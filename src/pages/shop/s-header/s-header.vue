<template>
  <ul class="s-header">
    <li class="item-wrapper" v-for="(item, index) in dataArray" :key="index" @click="navHandle(item)">
      <div class="logo" :class="item.icon"></div>
      <div class="txt">{{item.title}}</div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import {Exchange} from 'api'

  const dataArray = [
    {
      icon: 'key',
      title: '输码核销',
      path: '/exchange-code'
    },
    {
      icon: 'scanner',
      title: '扫码核销',
      path: ''
    },
    {
      icon: 'record',
      title: '核销记录',
      path: '/exchange-record'
    }
  ]
  export default {
    name: 's-header',
    data() {
      return {
        dataArray
      }
    },
    methods: {
      navHandle(item) {
        if (item.icon === 'scanner') {
          this._getScanner()
          return
        }
        this.$router.push(this.$route.path + item.path)
      },
      _getScanner(callback) {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            let obj = JSON.parse(result)
            Exchange.verification(obj).then((res) => {
              alert(JSON.stringify(res))
              this.$loading.hide()
              alert(res.error)
              if (res.error === this.$ERR_OK) {
                this.$toast.show('核销成功')
              } else {
                this.$toast.show(res.message)
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

  .s-header
    height: 121px
    background-color: $color-363537
    layout(row, block, nowrap)
    .item-wrapper
      flex: 1
      height: 100%
      layout()
      justify-content: center
      align-items: center
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #FFFFFF
      z-index: 22
      .logo
        width: 32px
        height: 32px
        margin-bottom: 15px
        &.key
          icon-image(icon-inputcode)
        &.scanner
          icon-image(icon-scancode)
        &.record
          icon-image(icon-record)

</style>
