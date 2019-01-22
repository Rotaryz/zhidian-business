<template>
  <div class="coupon-btn border-top-1px">
    <router-link tag="div" to="/shop/discount-coupon/discount-coupon-editor" class="footer-btn">新建优惠券</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'COUPON_BTN'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $button-height=64px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .coupon-btn
    position: fixed
    width: 100vw
    height: $button-height
    z-index: 60
    bottom: 0
    left: 0
    background: $color-white
    box-sizing: border-box
    padding: 10px 15px
    .footer-btn
      width: 100%
      height: 100%
      background: $color-27273E
      border-radius: 2px
      line-height: 44px
      text-align: center
      font-family: $font-family-regular
      color: $color-white
      font-size: $font-size-16
      letter-spacing: 0.8px
</style>
