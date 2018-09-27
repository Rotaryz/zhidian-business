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
      <service-item :tabIdx="tabIdx"></service-item>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ServiceItem from 'components/service-item/service-item'
  const TABS = [
    {txt: '待上线', id: 1},
    {txt: '出售中', id: 2},
    {txt: '已下架', id: 3}
  ]
  export default {
    data() {
      return {
        tabList: TABS,
        tabIdx: 1
      }
    },
    created() {
    },
    methods: {
      changeTab(idx, item) {
        this.tabIdx = idx * 1
      }
    },
    components: {
      ServiceItem
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
      width: 100%
      height: 100vh
      box-sizing: border-box
      padding: 45px 15px 64px
</style>
