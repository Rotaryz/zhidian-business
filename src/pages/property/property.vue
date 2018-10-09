<template>
  <div class="property">
    <section class="header-tab border-bottom-1px">
      <div class="tab-box">
        <div class="tab-item" :class="tabIdx == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
          {{item.txt}}
        </div>
      </div>
      <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </section>
    <section class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*50 + '%,0)'">
        <article class="container-item income">
          <section class="top">
            <div class="title" @click="showMsg">可提现(元)</div>
            <div class="money">{{remaining}}</div>
            <router-link tag="div" class="btn" :to="$route.path + '/deposit'">提现</router-link>
            <div class="explain">每天可提现一次，每笔限额1万元</div>
          </section>
          <div class="margin-box-10px"></div>
          <router-link tag="div" class="bottom border-bottom-1px" :to="$route.path + '/deposit-records'">
            <div class="name">提现记录</div>
            <div class="arrow-right"></div>
          </router-link>
        </article>
        <article class="container-item staff-income">
          <scroll
            bcColor="#fff"
            v-if="dataArray.length"
            ref="scroll"
            :data="dataArray"
            :pullUpLoad="pullUpLoadObj"
            @pullingUp="onPullingUp"
          >
            <ul class="staff-list-wrapper border-bottom-1px">
              <li class="staff-item-wrapper border-bottom-1px" v-for="(item, index) in dataArray" :key="index">
                <section class="left">
                  <div class="avatar" v-if="item.image_url" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="avatar" v-else></div>
                  <article class="info-wrapper">
                    <div class="name">{{item.name}}</div>
                    <div class="position">{{item.role}}</div>
                  </article>
                </section>
                <section class="middle">
                  <div class="title">获得佣金</div>
                  <div class="money">{{item.commission}}</div>
                </section>
                <section class="right">发放</section>
              </li>
            </ul>
          </scroll>
          <div class="nothing-box" v-if="isEmpty">
            <img src="./pic-empty_order@2x.png" class="nothing-img">
            <div class="nothing-txt">暂无数据</div>
          </div>
        </article>
      </div>
      <confirm-msg ref="confirm" :isShowCancel="false"></confirm-msg>
      <router-view-common @refresh="refresh"></router-view-common>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { Property } from 'api'

  const TABS = [
    {txt: '店铺收入', id: 0},
    {txt: '店员佣金', id: 1}
  ]
  const LIMIT = 10
  export default {
    components: {
      Scroll,
      ConfirmMsg
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
      refresh() {
        this.page = 1
        this._getInfo()
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
      changeTab(idx) {
        this.tabIdx = idx * 1
      },
      showMsg() {
        let msg = '当顾客使用优惠券\n' +
          '或优惠券过期，相关订单资金\n' +
          '即转入可提现账户。'
        this.$refs.confirm.show({msg})
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
      },
      onPullingUp() {
        // 更新数据
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this._getStaffsIncome({page: ++this.page})
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

  .property
    fill-box()
    z-index: 50
    background: $color-F6F6F6
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
        color: $color-363537
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
        background: $color-EF705D
        border-radius: 3px

    .container
      width: 100vw
      height: 100vh
      overflow hidden
      .big-container
        width: 200vw
        height: 100vh
        display: flex
        transition: all 0.3s
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
              color: #363547
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
              background: #363547
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
            color: #363547
            letter-spacing: 0.34px
            .arrow-right
              width: 7px
              height: 12px
              icon-image(icon-press_right)
        .staff-income
          .staff-list-wrapper
            padding-left: 15px
            .staff-item-wrapper
              layout(row, block, nowrap)
              height: 74.5px
              align-items: center
              &:last-child:after
                display: none
              .left
                flex: 1
                overflow: hidden
                layout(row, inline, nowrap)
                .avatar
                  opacity: 0.8;
                  border-radius: 50%
                  width: 40px
                  height: @width
                  background: #ccc
                  margin-right: 10px
                .info-wrapper
                  flex: 1
                  overflow: hidden
                  .name
                    font-size: 14px;
                    color: #363547;
                    letter-spacing: 0.6px;
                    margin-bottom: 6px
                    no-wrap()
                  .position
                    font-size: 12px;
                    color: #EF705D;
                    padding: 3px 0
                    width: 34px
                    border: 1px solid #EF705D;
                    text-align: center
                    border-radius: 4px;
              .middle
                flex: 1
                overflow: hidden
                padding-right: 10px
                layout()
                justify-content: center
                .title
                  font-size: 14px;
                  color: #363547;
                  letter-spacing: 0.6px;
                  margin-bottom: 9px
                .money
                  font-size: 16px;
                  color: #363547;
                  letter-spacing: 0;
                  no-wrap()
              .right
                width: 60px
                height: 30px
                text-align: center
                line-height: @height
                font-size: 14px;
                color: #FFFFFF;
                background: #EF705D;
                border-radius: 4px;
                margin-right: 15px
</style>
