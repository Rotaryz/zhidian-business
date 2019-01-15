<template>
  <div class="coupon-item disable-all" :class="COUPON.backgroundStyle" @click="navHandle">
    <div class="wrapper">
      <article class="left">
        <section class="money">
          <div v-if="COUPON.isMoney" class="unit adapt-m" :class="COUPON.fontStyle">¥</div>
          <div class="discounts" :class="COUPON.fontStyle">20</div>
          <div v-if="!COUPON.isMoney" class="extends adapt-m" :class="COUPON.fontStyle">折</div>
        </section>
        <section class="explain" :class="COUPON.fontStyle">{{itemInfo.condition_str}}</section>
      </article>
      <article class="right">
        <ul class="right-wrapper">
          <li class="title" :class="COUPON.fontStyle">{{itemInfo.coupon_name}}</li>
          <li class="bottom-wrapper">
            <p class="explain" :class="COUPON.fontStyle">{{itemInfo.range_type_str}}</p>
            <p class="date" :class="COUPON.fontStyle">{{itemInfo.start_at}}-{{itemInfo.end_at}}</p>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'COUPON_ITEM'
  const COUPON_MAIN_COLOR = {
    '0': {
      backgroundStyle: 'running',
      fontStyle: ''
    },
    '1': {
      backgroundStyle: 'running',
      fontStyle: ''
    },
    '2': {
      backgroundStyle: 'disable',
      fontStyle: 'disable-all'
    }
  }
  const COUPON_TYPE = {
    '3': {
      isMoney: true
    },
    '4': {
      isMoney: false
    }
  }
  export default {
    name: COMPONENT_NAME,
    props: {
      itemInfo: {
        type: Object,
        default: () => {}
      },
      status: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        nowTime: Date.now()
      }
    },
    computed: {
      COUPON() {
        let mainColor = COUPON_MAIN_COLOR['' + this.status]
        let type = COUPON_TYPE['' + this.itemInfo.coupon_type]
        return {
          backgroundStyle: mainColor.backgroundStyle,
          fontStyle: mainColor.fontStyle,
          isMoney: type.isMoney
        }
      }
    },
    methods: {
      navHandle() {
        if (Date.now() - this.nowTime < 150) {
          return
        }
        this.nowTime = Date.now()
        if ('' + this.status === 2) return
        let url = `${this.$route.path}/discount-coupon-editor?couponId=${this.itemInfo.id}`
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-coupon-main=#D32F2F
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .adapt-m
    position relative
    bottom :0.26666666666666666vw

  .disable-all
    color: #cccccc !important

  .coupon-item
    width: 100%
    height :0
    padding-top :28.49002849002849%
    position :relative
    &.running
      icon-image(pic-coupon_jxz)
    &.disable
      icon-image(pic-coupon_ysx)
    .wrapper
      fill-box(absolute)
      display :flex
      .left
        flex:1
        overflow :hidden
        layout(column)
        align-items :center
        justify-content :center
        .money
          layout(row,block,nowrap)
          align-items :flex-end
          color: $color-coupon-main
          max-width :80%
          .unit
            font-family: $font-family-medium
            font-size: 4vw
            line-height: 3.4666666666666663vw
            margin-right :0.5333333333333333vw
          .discounts
            font-family: $font-family-bold
            font-size: 6.666666666666667vw
            line-height: 5.333333333333334vw
          .extends
            margin-left :0.5333333333333333vw
            font-family: $font-family-regular
            font-size: 3.4666666666666663vw
            line-height: 3.4666666666666663vw
        .explain
          margin-top :2.2666666666666666vw
          opacity: 0.8
          font-family: $font-family-regular
          font-size: 3.2vw
          color: #706B82
          line-height: 3.2vw
      .right
        flex: 2.53
        overflow :hidden
        font-family: $font-family-regular
        .right-wrapper
          padding :4.8vw 3.8666666666666667vw
          height :100%
          box-sizing :border-box
          layout(column)
          justify-content :space-between
          .title
            font-size: 4.266666666666667vw
            color: #4A4657
            letter-spacing: 0.21333333333333335vw
            line-height: 1.2
            no-wrap()
            width  100%
          .bottom-wrapper
            .explain
              font-size: 3.2vw
              color: #706B82
              line-height: 3.8666666666666667vw
            .date
              margin-top :1.866666666666667vw
              font-size: 3.2vw
              color: #706B82
              line-height: @font-size
</style>
