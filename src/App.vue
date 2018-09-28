<template>
  <div id="app">
    <router-view class="root-view" :class="tabStyle" @$hideTab="hideTab" @$showTab="showTab"></router-view>
    <tab class="footer-tab" :class="tabStyle"></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    components: {
      Tab
    },
    data() {
      return {
        isTabHide: false
      }
    },
    mounted() {
    },
    methods: {
      hideTab() {
        this.isTabHide = true
      },
      showTab() {
        this.isTabHide = false
      }
    },
    computed: {
      tabStyle() {
        return this.isTabHide ? 'tab-hide' : ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"

  #app
    height: 100vh
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    background: $color-background
    .root-view
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: $tab-height
      transform: translate3d(0, 0, 0)
      transition: all 0.3s
      &.tab-hide
        bottom: 0
    .footer-tab
      height: $tab-height
      position: fixed
      bottom: 0
      left: 0
      right: 0
      transform: translate3d(0, 0, 0)
      transition: all 0.3s
      &.tab-hide
        height: 0
</style>
