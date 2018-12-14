<template>
  <div class="property">
    <scroll
      bcColor="#fff"
      ref="scroll"
      :data="dataArray"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <section class="top-msg">
        <p class="txt">店铺总资产</p>
        <p class="money">{{assets}}</p>
      </section>
      <section class="option">
        <div class="box">
          <div class="content">
            <div class="money left">
              <p class="txt">待结算金额</p>
              <p class="number">{{unsettlement}}</p>
              <span class="line border-right-1px"></span>
            </div>
            <div class="money right" @click="toDeposit">
              <p class="txt">可提现金额<span class="icon"></span></p>
              <p class="number">{{remaining}}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="recode-list">
        <h3 class="title">提现记录</h3>
        <ul class="recode-wrapper">
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
      </section>
      <div class="nothing-box" v-if="isEmpty">
        <img src="./pic-empty_order@2x.png" class="nothing-img">
        <div class="nothing-txt">暂无数据</div>
      </div>
    </scroll>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Property } from 'api'
  import { mapActions } from 'vuex'
  import Scroll from 'components/scroll/scroll'

  const LIMIT = 10
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        remaining: '0.00', // 可提现金额
        unsettlement: '0.00', // 待结算金额
        assets: '0.00', // 总资产
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        hasMore: true,
        isEmpty: false,
        dataArray2: [
          {
            title: 'dfsdf士大夫撒旦',
            total: '10.00',
            created_at: '2018-12-12',
            status_str: '水电费'
          }
        ]
      }
    },
    created() {
      this._getBaseInfo()
      this._getWithdrawalLog()
    },
    methods: {
      ...mapActions(['saveEmployee']),
      refresh() {
        this.page = 1
        this.hasMore = true
        this._getBaseInfo()
      },
      _getBaseInfo() {
        this.$loading.show()
        Promise.all([
          this._getShopIncome({}, false)
        ]).then(() => {
          this.$loading.hide()
        })
      },
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
      toDeposit() {
        this.$router.push(this.$route.path + '/deposit')
      },
      _getShopIncome(data, loading) {
        Property.getShopIncome(data, loading).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.remaining = res.data.remaining
          this.unsettlement = res.data.unsettlement
          this.assets = res.data.assets
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

  .property
    fill-box()
    z-index: 20
    background: $color-F6F6F6
    .top-msg
      height: 200px
      bg-image(bg-money)
      background-size: 100% 100%
      font-size: 13px
      color: $color-white
      font-family: $font-family-regular
      padding: 0 12px
      overflow: hidden
      .txt
        margin-top: 45px
        text-align: center
        position: relative
      .money
        margin-top: 10px
        font-size: 41px
        font-family: $font-family-bold
        color: $color-white
        text-align: center

    .option
      height: 35px
      background: $color-F6F6F6
      position: relative
      .box
        width: 100%
        position: absolute
        bottom: 10px
        padding: 0 15px
        box-sizing: border-box
      .content
        height: 70px
        width: 100%
        border-1px($color-row-line, 4px)
        border-radius: 4px
        background: $color-white
        display: flex
        align-items: center
        .money
          width: 50%
          box-sizing: border-box
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          position: relative
        .txt
          font-size: 13px
          font-family: $font-family-regular
          color: $color-27273E
          position: relative
        .icon
          width: 7px
          height: 12px
          right: -14px
          icon-image(icon-press_right)
          col-center()
        .number
          font-size: $font-size-18
          font-family: $font-family-bold
          color: $color-27273E
          margin-top: 8px
        .line
          height: 33px
          col-center()
          right: 0
          border-right-1px(#CCC)
    .recode-list
      .title
        font-size: $font-size-16
        font-family: $font-family-medium
        color: $color-27273E
        display: flex
        align-items: center
        padding: 15px 0
        &:before
          content: ''
          width: 4px
          height: 14px
          background: $color-D32F2F
          margin: 0 5px
    .recode-wrapper
      padding: 0 15px
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
            font-size: 16px
            color: #27273E
            letter-spacing: 0.34px
            &.small
              font-size: 12px
              color: #9B9B9B
          .right
            font-family: PingFangSC-Semibold
            font-size: 16px
            color: #181700
            letter-spacing: 0.3px
            &.small
              font-size: 12px
              color: #9B9B9B
</style>
