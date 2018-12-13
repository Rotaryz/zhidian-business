<template>
  <div class="property">
    <section class="top-msg">
      <p class="txt">店铺总资产</p>
      <p class="money">{{remaining}}</p>
    </section>
    <section class="option">
      <div class="box">
        <div class="content">
          <div class="money left">
            <p class="txt">待结算金额</p>
            <p class="number">6000</p>
            <span class="line border-right-1px"></span>
          </div>
          <div class="money right" @click="toDeposit">
            <p class="txt">可提现金额<span class="icon"></span></p>
            <p class="number">900</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <article class="container-item income">
        <router-link tag="div" class="bottom border-bottom-1px" :to="$route.path + '/deposit-records'">
          <div class="name">提现记录</div>
          <div class="arrow-right"></div>
        </router-link>
      </article>
      <router-view-common @refresh="refresh"></router-view-common>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Property } from 'api'
  import { mapActions } from 'vuex'

  const TABS = [
    {txt: '店铺收入', id: 0},
    {txt: '店员佣金', id: 1}
  ]
  const LIMIT = 10
  export default {
    components: {
    },
    data() {
      return {
        tabList: TABS,
        tabIdx: 0,
        remaining: '0.00',
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
      this._getBaseInfo()
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
          this._getShopIncome({}, false),
          this._getStaffsIncome({page: 1}, false)
        ]).then(() => {
          this.$loading.hide()
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
        })
      },
      _getStaffsIncome(data = {page: 1}, loading) {
        if (!this.hasMore) return
        Property.getStaffsIncome({...data, limit: LIMIT}, loading).then(res => {
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
      }
    },
    watch: {
    },
    computed: {
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
        padding: 0 12px
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
          position: relative
        .icon
          width: 7px
          height: 12px
          right: -14px
          icon-image(icon-press_right)
          col-center()
        .number
          margin-top: 8px
        .line
          height: 33px
          col-center()
          right: 0
          border-right-1px(#CCC)
    .tab-box
      width: 100%
      height: 45px
      display: flex
      background: #fff
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

    .container
      width: 100vw
      height: 100vh
      overflow hidden
      .container-item
        width: 100vw
        height: 100vh
      .income
        .top
          layout()
          background: #fff
          align-items: center
          .title
            font-size: 14px
            color: #27273E
            margin: 56.5px 0 15px
            position: relative
            &:after
              content: ''
              width: 16px
              height: 16px
              icon-image(icon-finance_help)
              position: absolute
              right: -21px
              top: -8px
          .money
            font-family: DINAlternate-Bold
            font-size: 40px
            color: #FF4E00
            padding-bottom: 45px
          .btn
            width: 230px
            height: 40px
            text-align: center
            line-height: @height
            background: #27273E
            border-radius: 4px
            font-size: 14px
            color: #FFFFFF
            letter-spacing: 0.56px
          .explain
            font-size: 12px
            color: #9B9B9B
            padding: 9px 0 34px
        .bottom
          layout(row)
          background: #fff
          height: 55px
          padding: 0 15px
          align-items: center
          justify-content: space-between
          font-size: 16px
          color: #27273E
          letter-spacing: 0.34px
          .arrow-right
            width: 7px
            height: 12px
            icon-image(icon-press_right)
</style>
