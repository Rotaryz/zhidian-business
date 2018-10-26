<template>
  <transition name="fade">
    <div class="detail-rule" v-show="show">
      <div class="detail-content">
        <div class="content-top">
          <div class="title"><span class="txt">服务详情</span><span class="line"></span><span class="line line-bot"></span></div>
          <div class="scroll-container">
            <scroll :bcColor="'#ffffff'" ref="scroll">
              <div class="group-container"  v-if="ruleId == 3">
                <div class="text-item">
                  <p class="item-title">1.什么是砍价抢购？</p>
                  <p class="item-txt">疯狂砍价是由商家发起的一种营销类活动，商家可添加商品，设置能砍到的底价和砍到底价所需次数。用户若想以底价购买该商品，可邀请好友一起砍价，每次砍价金额随机。</p>
                </div>
                <div class="text-item">
                  <p class="item-title">2.砍掉后的价格是否对所有用户有效？</p>
                  <p class="item-txt">是的。所有用户可对同一个商品进行砍价，并享有砍掉后的商品价格，如商品A现价100元，当某用户砍掉2元后，所有人看到的现价更新为98元，并可在98元的基础上再进行砍价，直到砍到底价为止。</p>
                </div>
                <div class="text-item">
                  <p class="item-title">3.未砍到底价时，用户能否购买？</p>
                  <p class="item-txt">能购买，如商品A现价100元，底价10元，当被砍到80元时，若某用户认为已达自己的可接受价位，即可下单购买（为突出商品稀有性，建议商家添加的数量在1-3个）。</p>
                </div>
                <div class="text-item">
                  <p class="item-title">4.用户一次能购买几件商品？</p>
                  <p class="item-txt">同一个用户一次下单只能购买一件商品。</p>
                </div>
                <div class="text-item">
                  <p class="item-title">5.砍价商品设置错了怎么办？</p>
                  <p class="item-txt">商家可在砍价列表页删除该商品，删除后所有用户不能对该商品进行砍价，已下单但未支付的用户不能再进行支付，已支付的用户不受影响。</p>
                </div>
              </div>
              <div class="group-container"  v-if="ruleId == 1">
                <div class="text-item">
                  <p class="item-title">1.什么是火爆拼团？</p>
                  <p class="item-txt">由商家发起的一种促销活动，商家可添加商品，设置成团价格、成团人数和成团有效期等信息。消费者可发起拼团活动或参与他人发起的拼团活动，若在有效期内若拼团成功，则可以成团价（较优惠的价格）购买商品或服务。目的是以部分优惠吸引多人购买，增加销售额。</p>
                </div>
                <div class="text-item">
                  <p class="item-title">2.用户在多长时间内可成团？</p>
                  <p class="item-txt">系统统一设定为24小时。即用户开团成功后，需在24小时内邀请好友参团，当达到成团人数后可认定为拼团成功；反之拼团失败，用户所支付款项原路退回。</p>
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
  import {ease} from 'common/js/ease'

  export default {
    name: 'activity-rule',
    data() {
      return {
        show: false,
        ruleId: 0,
        scrollToEasing: 'bounce'
      }
    },
    methods: {
      showRule(ruleId) {
        this.$refs.scroll.scrollTo(0, 0, 0, ease[this.scrollToEasing])
        this.ruleId = ruleId
        this.show = true
      },
      hideRule() {
        this.show = false
      }
    },
    watch: {
      ruleId() {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .detail-rule
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
          color: $color-363537
          font-size: $font-size-16
          letter-spacing: 0.6px
          margin: 18px auto
          position: relative
          .txt
            width: 82px
            background: $color-white
            position: relative
            display: block
            margin: 0 auto
            z-index: 1
          .line
            width: 110px
            height: 1px
            background: #D4D2D9
            all-center()
            margin-top: -2px
          .line-bot
            width: 104px
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
      color: $color-363547
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
