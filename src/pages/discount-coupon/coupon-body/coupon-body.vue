<template>
  <div class="coupon-body">
    <scroll ref="scroll"
            bcColor="#f6f6f6"
            :data="dataArray"
            :showNoMore="false"
            :pullUpLoad="pullUpLoadObj"
            @pullingUp="onPullingUp"
    >
      <div class="list-container">
        <div class="list-item" v-for="(item, index) in dataArray" :key="index">
          <div style="height: 50px;">{{index}}</div>
          <!--<goods-item :tabIdx="tabIdx"-->
                      <!--:item="item"-->
                      <!--:showEdit="item.showEdit"-->
                      <!--@showEdit="showEditor"-->
                      <!--@itemEditor="itemEditor"-->
                      <!--@itemDown="itemDown"-->
                      <!--@itemDelete="itemDelete">-->
          <!--</goods-item>-->
        </div>
        <section class="nothing-box" v-if="nothing">
          <img class="nothing-img" src="./pic-empty_order@2x.png" alt="">
          <div class="nothing-txt">暂无数据</div>
        </section>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  const COMPONENT_NAME = 'COUPON_BODY'

  export default {
    name: COMPONENT_NAME,
    components: {
      Scroll
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $button-height=64px
  $tab-header-height=45px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .coupon-body
    float:left
    width: 100vw
    height: 100vh
    box-sizing: border-box
    padding: $tab-header-height 0 $button-height
    background: $color-F6F6F6
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
</style>
