<template>
  <transition name="fade">
    <div class="coupon-rule" v-show="show">
      <div class="detail-content">
        <div class="content-top">
          <div class="title"><span class="txt">优惠券规则</span><span class="line"></span><span class="line line-bot"></span></div>
          <div class="scroll-container">
            <scroll :bcColor="'#ffffff'" ref="scroll">
              <div class="group-container"  v-if="true">
                <div class="text-item">
                  <p class="item-title">1.满减券</p>
                  <p class="item-txt">用户订单的金额满足优惠券设定的金额可使用，立即对订单满减优惠</p>
                </div>
                <div class="text-item">
                  <p class="item-title">2.折扣券</p>
                  <p class="item-txt">用户订单的金额满足优惠券设定的金额可使用，立即对订单打折优惠</p>
                </div>
                <div class="text-item">
                  <p class="item-title">3.优惠券的使用范围</p>
                  <p class="item-txt">全场通用券（所有商品/服务可用）、限定商品/服务（指定的商品/服务/可用）</p>
                </div>
                <div class="text-item">
                  <p class="item-title">4.固定时间</p>
                  <p class="item-txt">例如：10月1日 00:00 ~ 10月7日 23:59的券，无论何时发放或领取，用户领取的券的有效时间即为固定</p>
                </div>
              </div>
              <div class="box"></div>
            </scroll>
          </div>
        </div>
        <div class="hide-rule" @click.stop="hideRule"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  const COMPONENT_NAME = 'COUPON_RULE'

  export default {
    name: COMPONENT_NAME,
    components: {
      Scroll
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      showRule() {
        setTimeout(() => {
          this.$refs.scroll && this.$refs.scroll.refresh()
        }, 50)
        this.show = true
      },
      hideRule() {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .coupon-rule
    width: 100vw
    height: 100vh
    background: rgba(54,53,71,0.80)
    fill-box()
    z-index: 80
    .detail-content
      position: absolute
      width: 300px
      height: 310px
      background: $color-white
      border: 1px solid rgba(32,32,46,0.10)
      border-radius: 2px
      all-center()
      .content-top
        padding: 0 25px
        .title
          text-align: center
          font-family: $font-family-regular
          color: $color-27273E
          font-size: $font-size-16
          letter-spacing: 0.6px
          margin: 18px auto
          position: relative
          .txt
            width: 95px
            background: $color-white
            position: relative
            display: block
            margin: 0 auto
            z-index: 1
          .line
            width: 120px
            height: 1px
            background: #D4D2D9
            all-center()
            margin-top: -2px
          .line-bot
            width: 114px
            margin-top: 3px
        .scroll-container
          width: 100%
          height: 256px
          position: relative
  .text-item
    margin: 20px 0
    font-size: 14px
    .item-title
      font-family: $font-family-medium
      color: $color-27273E
    .item-txt
      color: $color-696771
      margin-top: 10px
      line-height: 21px
  .box
    height: 10px
  .hide-rule
    width: 28px
    height: 28px
    bg-image(icon-close_pop)
    background-size: 100% 100%
    row-center()
    bottom: -60px
</style>
