<template>
  <div class="exchange-record">
    <section class="header">
      <div class="left">
        <div class="name">券名</div>
        <div class="id">券ID</div>
        <div class="user-id">用户ID</div>
      </div>
      <div class="right">核销时间</div>
    </section>
    <div class="scroll-container">
      <scroll
        v-if="dataArray.length"
        bcColor="#f6f6f6"
        ref="scroll"
        :data="dataArray"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="onPullingUp"
      >
        <ul class="content">
          <li class="item" v-for="(item,index) in dataArray" :key="index">
            <figure class="left">
              <div class="name">{{item.title}}</div>
              <div class="id">{{item.customer_promotion_id}}</div>
              <div class="user-id">{{item.customer_id}}</div>
            </figure>
            <div class="right">
              <div class="time">{{item.created_at.split(' ')[0]}}</div>
              <div class="now">{{item.created_at.split(' ')[1]}}</div>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="nothing-box" v-if="isEmpty">
        <img src="./pic-empty_order@2x.png" class="nothing-img">
        <div class="nothing-txt">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Exchange } from '../../api'

  // const dataArray = [
  //   {
  //     name: '养发护发优,养发护发优养发护发优养发护发优,养发护发优养发护发优养发护发优养发护发优养发护发优养发护发优',
  //     id: 128392,
  //     userId: 3272378,
  //     time: '2017-01-01',
  //     now: '13:08'
  //   },
  //   {
  //     name: '养发护发优…',
  //     id: 128392,
  //     userId: 3272378,
  //     time: '2017-01-01',
  //     now: '13:08'
  //   },
  //   {
  //     name: '养发护发优…',
  //     id: 1,
  //     userId: 1,
  //     time: '2017-01-01',
  //     now: '13:08'
  //   }
  // ]
  export default {
    name: 'ExchangeRecord',
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
      this._getLog()
    },
    methods: {
      _getLog() {
        Exchange.getVerificationLog().then(res => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
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
        this._getList({page: ++this.page})
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
  $time-width = 80px
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

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

  .exchange-record
    fill-box()
    z-index: 50
    background: #fff
    .header
      height: 50px
      padding: 0 15px
      layout(row, block, nowrap)
      background: #F6F6F6
      align-items: center
      flex: 1
      .left
        flex: 1
        layout(row, block, nowrap)
        .name
          width: 28.26vw
          no-wrap()
        .id
          flex: 1
        .user-id
          flex: 1
      .right
        width: $time-width
    .scroll-container
      position: absolute
      top: 50px
      bottom: 0
      left: 0
      right: 0
      .content
        .item
          padding: 0 15px
          height: 50px
          layout(row, block, nowrap)
          background: #fff
          align-items: center
          justify-content: space-between
          font-family: PingFangSC-Regular
          font-size: 14px
          color: #363547
          &:nth-child(2n)
            background: #F6F6F6
          .left
            flex: 1
            layout(row, block, nowrap)
            .name
              width: 28.26vw
              no-wrap()
            .id
              flex: 1
            .user-id
              flex: 1
          .right
            width: $time-width
            layout()
            align-items: flex-end
            .time
              font-size: 14px
              margin: 13px 0 3px
            .now
              font-size: 12px
</style>
