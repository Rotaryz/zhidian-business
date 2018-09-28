<template>
  <div class="service-manage">
    <div class="header-tab border-bottom-1px">
      <div class="tab-box">
        <div class="tab-item" :class="tabIdx == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
          {{item.txt}}(10)
        </div>
      </div>
      <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </div>
    <div class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*33.333 + '%,0)'">
        <div class="container-item">
          <scroll ref="scroll0"
                  :data="stayList"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj0"
                  @pullingUp="onPullingUp0"
                  :showNoMore="showNoMore0">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in stayList" :key="index">
                <service-item :tabIdx="tabIdx"></service-item>
              </div>
            </div>
          </scroll>
        </div>
        <div class="container-item">
          <scroll ref="scroll1"
                  :data="onlineList"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj1"
                  @pullingUp="onPullingUp1"
                  :showNoMore="showNoMore1">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in onlineList" :key="index">
                <service-item :tabIdx="tabIdx"></service-item>
              </div>
            </div>
          </scroll>
        </div>
        <div class="container-item">
          <scroll ref="scroll2"
                  :data="offlineList"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj2"
                  @pullingUp="onPullingUp2"
                  :showNoMore="showNoMore2">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in offlineList" :key="index">
                <service-item :tabIdx="tabIdx"></service-item>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ServiceItem from 'components/service-item/service-item'
  import Scroll from 'components/scroll/scroll'
  const TABS = [
    {txt: '待上线', id: 1},
    {txt: '出售中', id: 2},
    {txt: '已下架', id: 3}
  ]
  export default {
    data() {
      return {
        tabList: TABS,
        tabIdx: 1,
        stayList: [1, 2, 3, 4, 5, 6, 7, 8],
        onlineList: [1, 2, 3],
        offlineList: [1, 2, 3],
        pullUpLoad0: true,
        pullUpLoadThreshold0: 0,
        showNoMore0: true,
        pullUpLoad1: true,
        pullUpLoadThreshold1: 0,
        showNoMore1: true,
        pullUpLoad2: true,
        pullUpLoadThreshold2: 0,
        showNoMore2: true,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce']
      }
    },
    created() {
    },
    methods: {
      changeTab(idx, item) {
        console.log(999)
        this.tabIdx = idx * 1
      },
      onPullingUp0() {
        console.log(7776767)
      },
      onPullingUp1() {
        console.log(7776767)
      },
      onPullingUp2() {
        console.log(7776767)
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    components: {
      ServiceItem,
      Scroll
    },
    computed: {
      pullUpLoadObj0: function () {
        return this.pullUpLoad0 ? {
          threshold: parseInt(this.pullUpLoadThreshold0),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadObj1: function () {
        return this.pullUpLoad1 ? {
          threshold: parseInt(this.pullUpLoadThreshold1),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadObj2: function () {
        return this.pullUpLoad2 ? {
          threshold: parseInt(this.pullUpLoadThreshold2),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullDownRefreshObj0: function () {
        return this.pullDownRefresh0 ? {
          threshold: parseInt(this.pullDownRefreshThreshold0),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      },
      pullDownRefreshObj1: function () {
        return this.pullDownRefresh1 ? {
          threshold: parseInt(this.pullDownRefreshThreshold1),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      },
      pullDownRefreshObj2: function () {
        return this.pullDownRefresh2 ? {
          threshold: parseInt(this.pullDownRefreshThreshold2),
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
  @import "~common/stylus/mixin"

  .service-manage
    fill-box()
    z-index: 50
    background: $color-F6F6F6
    .header-tab
      position: fixed
      width: 100vw
      height: 45px
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
          color: $color-363537
          font-family: $font-family-regular
          letter-spacing: 0.8px
        .tab-item.active
          font-family: $font-family-medium
      .underline-box
        height: 3px
        position: absolute
        bottom: 0
        width: 33.33%
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
      .big-container
        width: 300vw
        height: 100vh
        display: flex
        transition: all 0.3s
        .container-item
          width: 100vw
          height: 100vh
          box-sizing: border-box
          padding: 45px 0 64px
          .list-container
            padding: 0 15px
            .list-item
              padding-top: 10px
</style>
