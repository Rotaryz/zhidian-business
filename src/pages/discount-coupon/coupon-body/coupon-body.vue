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
          <coupon-item :itemInfo="item" :status="status"></coupon-item>
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
  import CouponItem from '../coupon-item/coupon-item'
  import * as API from 'api'

  const COMPONENT_NAME = 'COUPON_BODY'

  export default {
    name: COMPONENT_NAME,
    components: {
      Scroll,
      CouponItem
    },
    props: {
      status: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: [],
        page: 1,
        limit: 10,
        nothing: false,
        noMore: false
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
    created() {
      this._getList()
    },
    methods: {
      _refresh() {
        this.page = 1
        this.noMore = false
        this._getList(false)
      },
      _getList(loading, toast) {
        if (this.noMore) return
        let data = {
          page: this.page,
          limit: this.limit,
          status: this.status
        }
        API.Coupon.getList(data, loading, toast).then((res) => {
          if (res.meta.current_page === 1) {
            this.dataArray = res.data
            this.nothing = !res.meta.total
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          this.noMore = res.meta.current_page === res.meta.last_page
        })
      },
      onPullingUp() {
        // 更新数据
        this._getList(false)
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
      padding: 0 12px 20px
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
