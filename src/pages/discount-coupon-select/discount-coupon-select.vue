<template>
  <div class="discount-coupon-select">
    <div class="scroll-wrapper">
      <scroll ref="scroll"
              bcColor="#f6f6f6"
              :data="dataArray"
              :showNoMore="false"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <div class="list-container">
          <div class="list-item" v-for="(item, index) in dataArray" :key="index">
            <!--<div style="height: 50px;border: 1px solid red">{{index}}</div>-->
            <!--<goods-item :tabIdx="tabIdx"-->
            <!--:item="item"-->
            <!--:showEdit="item.showEdit"-->
            <!--@showEdit="showEditor"-->
            <!--@itemEditor="itemEditor"-->
            <!--@itemDown="itemDown"-->
            <!--@itemDelete="itemDelete">-->
            <!--</goods-item>-->
            <select-item></select-item>
          </div>
          <div style="height: 50px"></div>
          <section class="nothing-box" v-if="nothing">
            <img class="nothing-img" src="./pic-empty_order@2x.png" alt="">
            <div class="nothing-txt">暂无数据</div>
          </section>
        </div>
      </scroll>
    </div>
    <section class="coupon-btn">
      <div class="footer-btn" @click="submitHandle">确定</div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import SelectItem from './select-item/select-item'

  const PAGE_NAME = 'DISCOUNT_COUPON_SELECT'

  export default {
    name: PAGE_NAME,
    components: {
      Scroll,
      SelectItem
    },
    data() {
      return {
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: new Array(20).fill(1),
        page: 1,
        limit: 10,
        nothing: false
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    methods: {
      onPullingUp() {
        // 更新数据
        // if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        // this._getWithdrawalLog({page: ++this.page})
        console.log(123)
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      submitHandle() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $btn-height=64px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .discount-coupon-select
    fill-box(fixed)
    background: $color-F6F6F6
    z-index :100

  .scroll-wrapper
    position :fixed
    top:0
    left :0
    right :0
    bottom: $btn-height
    .list-container
      padding: 0 15px
      .list-item
        padding-top: 10px
      .nothing-box
        display: flex
        flex-direction: column
        align-items: center
        font-size: 0
        padding-top: 100px
        .nothing-img
          width: 100px
          height: 80px
          margin-bottom: 5px
        .nothing-txt
          font-size: $font-size-12
          color: $color-CCCCCC
          font-family: $font-family-regular
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
