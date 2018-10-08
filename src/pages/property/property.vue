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
            <div class="title">可提现(元)</div>
            <div class="money">6500.00</div>
            <div class="btn">提现</div>
            <div class="explain">每天可提现一次，每笔限额1万元</div>
          </section>
          <div class="margin-box-10px"></div>
          <router-link tag="div" class="bottom border-bottom-1px" to="">
            <div class="name">提现记录</div>
            <div class="arrow-right"></div>
          </router-link>
        </article>
        <article class="container-item staff-income">
          <scroll bcColor="#fff">
            <ul class="staff-list-wrapper border-bottom-1px">
              <li class="staff-item-wrapper border-bottom-1px">
                <section class="left">
                  <div class="avatar"></div>
                  <article class="info-wrapper">
                    <div class="name">谭敏仪</div>
                    <div class="position">店长</div>
                  </article>
                </section>
                <section class="middle">
                  <div class="title">获得佣金</div>
                  <div class="money">230.00</div>
                </section>
                <section class="right">发放</section>
              </li>
              <li class="staff-item-wrapper border-bottom-1px">
                <section class="left">
                  <div class="avatar"></div>
                  <article class="info-wrapper">
                    <div class="name">谭敏仪</div>
                    <div class="position">店长</div>
                  </article>
                </section>
                <section class="middle">
                  <div class="title">获得佣金</div>
                  <div class="money">230.00</div>
                </section>
                <section class="right">发放</section>
              </li>
            </ul>
          </scroll>
        </article>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  const TABS = [
    {txt: '店铺收入', id: 0},
    {txt: '店员佣金', id: 1}
  ]
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        tabList: TABS,
        tabIdx: 0,
        list0: [],
        pullUpLoad0: true,
        pullUpLoadThreshold0: 0,
        showNoMore0: false,
        page0: 1,
        nothing0: false,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    methods: {
      changeTab(idx) {
        this.tabIdx = idx * 1
      }
    },
    computed: {
      pullDownRefreshObj0: function () {
        return this.pullDownRefresh0 ? {
          threshold: parseInt(this.pullDownRefreshThreshold0),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          if (!this.pullDownRefresh) return
          this.rebuildScroll()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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
                display :none
              .left
                flex: 1
                overflow :hidden
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
                  overflow :hidden
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
                    width :34px
                    border: 1px solid #EF705D;
                    text-align :center
                    border-radius: 4px;
              .middle
                flex: 1
                overflow :hidden
                padding-right :10px
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
