<template>
  <div class="discount-coupon">
    <section class="header-tab border-bottom-1px">
      <ul class="tab-box">
        <template v-for="(item, index) in tabList">
          <li :key="index" class="tab-item" :class="{active : tabIndex === index}" @click="changeTab(index, item)">{{item.txt}}</li>
        </template>
      </ul>
      <div class="underline-box" :style="'transform: translate(' + tabIndex*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </section>
    <section class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIndex*(100 / tabLength) + '%,0)'">
        <template v-for="(item, index) in tabList">
          <nav :key="index">
           <c-body ref="cBody" :status="item.status"></c-body>
          </nav>
        </template>
      </div>
    </section>
    <c-btn></c-btn>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import CBtn from './coupon-btn/coupon-btn'
  import CBody from './coupon-body/coupon-body'

  const PAGE_NAME = 'DISCOUNT_COUPON'
  const TABS = [
    {txt: '进行中', status: 1},
    {txt: '未开始', status: 0},
    {txt: '已失效', status: 2}
  ]

  export default {
    name: PAGE_NAME,
    components: {
      CBtn,
      CBody
    },
    data() {
      return {
        tabList: TABS,
        tabIndex: 0,
        tabLength: TABS.length
      }
    },
    methods: {
      // 返回刷新页面数据
      refresh() {
        let arr = this.$refs.cBody || []
        arr.forEach((item) => {
          item && item._refresh()
        })
        this.tabIndex = 0
      },
      changeTab(idx) {
        this.tabIndex = idx
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-number=3
  $tab-header-height=45px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .discount-coupon
    fill-box(fixed)
    z-index:20
    background: $color-F6F6F6

  .container
    width: 100vw
    height: 100vh
    overflow: hidden
    .big-container
      width: ($tab-number * 100)vw
      height: 100vh
      layout(row,block,nowrap)
      transition: all 0.3s

  .header-tab
    position: fixed
    width: 100vw
    height: $tab-header-height
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
      width: (100/$tab-number)%
      display: flex
      justify-content: center
      transform: translate(0, 0)
      transition: all 0.3s
      .underline
        width: 30px
        height: 3px
        background: $color-D32F2F
        border-radius: 3px
</style>
