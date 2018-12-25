<template>
  <div class="shop-qr-code">
    <!--<scroll ref="scroll" bcColor="#27273E" >-->
      <div class="pad">
        <section class="bg">
          <div class="wrapper">
            <section class="content">
              <div class="logo" v-if="shopInfo.avatar" :style="{backgroundImage: 'url(' + shopInfo.avatar + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
              <img class="logo" src="./pic-default_people@2x.png" v-else />
              <div class="title">{{shopInfo.name || '店铺名称'}}</div>
              <img class="qr-code" :src="shopInfo.image_url" v-if="shopInfo.image_url">
              <img class="qr-code qr-code-width" v-else>
              <div class="explain">
                <div class="e-c">长按识别二维码进店逛逛</div>
              </div>
            </section>
          </div>
        </section>
      </div>
    <!--</scroll>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { Mine, Business } from 'api'
  import Scroll from '../../components/scroll/scroll'

  export default {
    data() {
      return {
        shopInfo: {}
      }
    },
    created() {
      this._getShopInfo()
    },
    methods: {
      _getShopInfo() {
        Mine.getUserInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.shopInfo = {
            avatar: res.data.avatar,
            name: res.data.name || res.data.nickname,
            shop_id: res.data.shop_id,
            image_url: ''
          }
          this._getQrcode()
        })
      },
      _getQrcode() {
        let id = this.shopInfo.shop_id
        Business.Myshop(id).then((res) => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.shopInfo.image_url = res.data.image_url || ''
        })
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop-qr-code
    position: fixed
    left: 0
    top: 0
    width: 100vw
    overflow: hidden
    height :100vh
    z-index: 20
    background: $color-27273E
    .pad
      padding: 15vw 35px
    .bg
      background: #DAD7E4
      border-radius: 4px
      padding :16px 13px
      .wrapper
        background: #FFFFFF
        box-shadow: 0 4px 14px 0 rgba(54, 53, 71, 0.30)
        border-radius: 4px
        padding: 13.5px 11.3px 23.6px
        .content
          border: 1px solid rgba(112, 107, 130, 0.2)
          position: relative
          .logo
            border-radius: 2px
            display: block
            width: 50px
            height: @width
            background :rgba(164, 155, 200, 0.20)
            margin 31.5px auto 20px
          .title
            font-family: PingFangSC-Medium
            font-size: 20px
            color: #706B82
            letter-spacing: 1px
            text-align: center
            line-height: 1.2
          .qr-code
            display: block
            width: 35vw
            height: @width
            padding: 6px
            background: #FFFFFF
            border: 6px solid rgba(164, 155, 200, 0.20)
            border-radius: 50%
            margin : 20vw auto 10vw
          .qr-code-width
            width: 0
            border: 0
          .explain
            position: absolute
            bottom: -6px
            left: 0
            right: 0
            .e-c
              width: 150px
              margin: 0 auto
              background: #fff
              text-align: center
              opacity: 0.8
              font-family: PingFangSC-Regular
              font-size: 12px
              color: #706B82
              letter-spacing: 0
</style>
