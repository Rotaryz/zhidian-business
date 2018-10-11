<template>
  <div class="invitation">
    <article class="top">
      <div class="title">欢迎加入国颐堂养发馆</div>
      <div class="qr-code">
        <img class="qr-img" v-if="qrCode" :src="qrCode" alt="">
      </div>
      <div class="explain">请长按二维码保存或者发送给店员</div>
    </article>
    <!--<ul class="btn-group">-->
    <!--<li class="btn-item" @click="saveImage">-->
    <!--<div class="icon save"></div>-->
    <!--<div class="txt">保存</div>-->
    <!--</li>-->
    <!--<li class="btn-item" @click="copyUrl">-->
    <!--<div class="icon copy"></div>-->
    <!--<div class="txt">复制链接</div>-->
    <!--</li>-->
    <!--</ul>-->
    <div class="btn-item">
      <div class="txt" v-clipboard:copy="linkUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import { Mine } from 'api'
  // import wx from 'weixin-js-sdk'
  import VueClipboard from 'vue-clipboard2'

  Vue.use(VueClipboard)

  export default {
    data() {
      return {
        qrCode: '',
        linkUrl: ''
      }
    },
    created() {
      this._getInviteQrcode()
    },
    methods: {
      _getInviteQrcode() {
        Mine.getInviteQrcode().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.qrCode = res.data.qrcode
          this.linkUrl = res.data.link_url
        })
      },
      saveImage() {
        this.DoSaveAsIMG()
      },
      jssdk() {
        // let url = location.href
        // Mine.jssdkConfig({weixin: 'ai_radar', url, current_type: 'weishang'}).then((res) => {
        //   if (res.error === this.$ERR_OK) {
        //     res = res.data
        //     wx.config({
        //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //       appId: res.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
        //       timestamp: res.timestamp, // 必填，生成签名的时间戳
        //       nonceStr: res.noncestr, // 必填，生成签名的随机串
        //       signature: res.signature, // 必填，签名，见附录1
        //       jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //     })
        //   }
        // })
      },
      DoSaveAsIMG() {
        // wx.ready(function () {
        //   wx.updateAppMessageShareData({
        //     title: '', // 分享标题
        //     desc: '', // 分享描述
        //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: '' // 分享图标
        //   }, function(res) {
        //     this.$toast.show('分享成功')
        //   })
        // })
      },
      onCopy(e) {
        console.log(e)
        let msg = `${e.text}\n已经复制至剪切板`
        this.$toast.show(msg)
      },
      onError(e) {
        console.error(e)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .invitation
    fill-box()
    z-index: 71
    background: #fff
    padding: 30px 35px 0
    .top
      background: $color-363537
      border-radius: 4px
      padding-bottom: 20px
      .title
        font-family: PingFangSC-Medium
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 0.6px
        text-align: center
        padding-top: 15vw
      .qr-code
        width: 60vw
        height: @width
        background: #FFFFFF;
        border: 1px solid rgba(130, 138, 162, 0.20)
        border-radius: 6px
        margin: 7vw auto 12px
        overflow: hidden
        .qr-img
          width: 100%
          height: 100%
      .explain
        font-size: 14px
        color: #f1f1f1
        text-align: center
        padding-top: 10px
        padding-bottom: 10vw

    .btn-group
      margin-top: 40px
      layout(row)
      justify-content: space-around
      .btn-item
        text-align: center
        .icon
          display: inline-block
          width: 30px
          height: @width
          margin-bottom: 8.35px
          &.save
            icon-image(icon-savepic)
          &.copy
            icon-image(pic-link)
        .txt
          font-size: 14px
          color: #706B82
          text-align: center
  .btn-item
    width: 160px
    height: 32px
    line-height: 32px
    font-size: $font-size-14
    border-radius: 20px
    color: $color-EF705D
    text-align: center
    margin: 0 auto
    margin-top: 30px
    border: 1px solid $color-EF705D
  #copyTxt, #copyIos
    position: fixed
    left: -200px
    bottom: -200px
</style>
