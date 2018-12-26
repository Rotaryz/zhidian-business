<template>
  <div class="exchange-record">
    <div class="header-tab border-bottom-1px">
      <div class="tab-box">
        <div class="tab-item" :class="tabIdx == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
          {{item.txt}}
        </div>
      </div>
      <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </div>
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

  const LIMIT = 10
  const TABS = [
    {txt: '服务', id: 0, type: 3},
    {txt: '商品', id: 1, type: 1}
  ]
  export default {
    name: 'ExchangeRecord',
    components: {
      Scroll
    },
    data() {
      return {
        tabList: TABS,
        tabIdx: 0,
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        hasMore: true,
        isEmpty: false,
        type: 3
      }
    },
    created() {
      this._getLog()
    },
    methods: {
      changeTab(idx) {
        this.tabIdx = idx * 1
        this.type = this.tabList[idx].type
        this._initAll()
        this._getLog()
      },
      _initAll() {
        this.page = 1
        this.hasMore = true
        this.isEmpty = false
        this.dataArray = []
        this.pullUpLoad = true
      },
      _getLog(data = {page: 1}) {
        if (!this.hasMore) return
        Exchange.getVerificationLog({...data, limit: LIMIT, type: this.type}).then(res => {
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
        this._getLog({page: ++this.page})
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
    z-index: 40
    background: #fff
    .header-tab
      position: fixed
      width: 100vw
      height: 45px
      top: 0
      left: 0
      z-index: 60
      background: $color-white
      .tab-box
        width: 100%
        height: 45px
        display: flex
        .tab-item
          flex: 1
          height: 45px
          line-height: 44px
          text-align: center
          font-size: $font-size-16
          color: $color-27273E
          font-family: $font-family-regular
          letter-spacing: 0.8px
        .tab-item.active
          font-family: $font-family-medium
      .underline-box
        height: 3px
        position: absolute
        bottom: 0
        width: 50%
        display: flex
        justify-content: center
        transform: translate(0, 0)
        transition: all 0.3s
        .underline
          width: 30px
          height: 3px
          background: $color-D32F2F
          border-radius: 3px

    .header
      margin-top: 45px
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
      top: 95px
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
          color: #27273E
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
