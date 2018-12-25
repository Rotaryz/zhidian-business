<template>
  <div class="s-header">
    <router-link tag="div" class="msg" to="/shop/account-detail">
      <div class="logo" v-if="shopInfo && shopInfo.logo && shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
      <div class="logo" v-else></div>
      <!--<img class="logo" src="./icon-shop_drz@2x.png" v-else/>-->
      <div class="msg-box">
        <div class="title">{{shopInfo && shopInfo.name || '店铺名称'}}</div>
        <div class="use-time">
          <router-link tag="div" @click.stop to="/shop/shop-qr-code">
            <span class="code"><i class="icon"></i>我的小店</span>
          </router-link>
          <span class="big-box" @click.stop="showExpire" v-if="userInfo && userInfo.merchant && userInfo.merchant.expired">
            <span class="red-box">续费</span>
          </span>
        </div>
      </div>
      <div class="right-arrow"></div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 's-header',
    props: {
      shopInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      showExpire() {
        this.$emit('showExpire')
      }
    },
    computed: {
      userInfo() {
        return this.$storage.get('info')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .s-header
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
        icon-image(icon-shop_drz)
        background-color: #fff
        background-size: 72%
        background-repeat: no-repeat
        background-position: center
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
          .code
            width: 96px
            height: 20px
            line-height: 20px
            font-size: $font-size-14
            color: rgba(255,255,255,0.7)
            display: flex
            align-items: center
            justify-content: center
            border-radius: 20px
            border-1px(#979797, 20px)
            .icon
              icon-image(code)
              width: 12px
              height: 12px
              margin-right: 5px
          .big-box
            padding: 5px
            .red-box
              width: 36px
              height: 18px
              line-height: 18px
              text-align: center
              border-1px($color-white)
              font-size: $font-size-12
              font-family: $font-family-medium
              color: $color-white
              display: block
      .right-arrow
        width: 7px
        height: 12px
        icon-image(icon-press_right)

</style>
