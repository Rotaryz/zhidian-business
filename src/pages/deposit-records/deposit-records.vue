<template>
  <div class="deposit-records">
    <scroll
      bcColor="#fff"
      v-if="dataArray.length"
      ref="scroll"
      :data="dataArray"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <ul class="recode-wrapper border-top-1px">
        <li class="item-wrapper border-bottom-1px" v-for="(item, index) in dataArray" :key="index">
          <div class="item-container">
            <div class="left">{{item.title}}</div>
            <div class="right">{{item.total}}</div>
          </div>
          <div class="item-container">
            <div class="left small">{{item.created_at}}</div>
            <div class="right small">{{item.status_str}}</div>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="nothing-box" v-if="isEmpty">
      <img src="./pic-empty_order@2x.png" class="nothing-img">
      <div class="nothing-txt">暂无数据</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Property } from 'api'

  const LIMIT = 10
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        hasMore: true,
        isEmpty: false
      }
    },
    created() {
      this._getWithdrawalLog()
    },
    methods: {
      _getWithdrawalLog(data, loading) {
        if (!this.hasMore) return
        Property.getWithdrawalLog({...data, limit: LIMIT}, loading).then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          if (!res.meta || res.meta.current_page === 1) {
            this.dataArray = res.data
            this.isEmpty = !this.dataArray.length
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          if (res.meta) {
            this.hasMore = res.meta.current_page !== res.meta.last_page
            this.pullUpLoad = !this.hasMore
          } else {
            this.pullUpLoad = false
          }
        })
      },
      onPullingUp() {
        // 更新数据
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this._getWithdrawalLog({page: ++this.page})
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return // 防止下拉报错
          this.rebuildScroll()
        },
        deep: true
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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

  .deposit-records
    fill-box()
    z-index: 40
    background: #fff
    .recode-wrapper
      padding-left: 15px
      .item-wrapper
        height: 70px
        layout(column, block, nowrap)
        justify-content: center
        align-items: center
        .item-container
          layout(row, block, nowrap)
          justify-content: space-between
          align-items: center
          width: 100%
          &:first-child
            margin-bottom: 10px
          .left
            font-size: 16px;
            color: #27273E;
            letter-spacing: 0.34px;
            &.small
              font-size: 12px;
              color: #9B9B9B;
          .right
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #181700;
            letter-spacing: 0.3px;
            margin-right :15px
            &.small
              font-size: 12px;
              color: #9B9B9B;
</style>
