<template>
  <div id="app">
    <router-view class="root-view" :class="[tabStyle,isTabPage?'tab-page': '']" @$hideTab="hideTab" @$showTab="showTab"></router-view>
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
        isTabHide: false,
        isTabPage: false
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
    },
    watch: {
      '$route'(to, from) {
        this.isTabPage = /(^\/radar$)|(^\/shop$)|(^\/mine$)/.test(to.path)
        console.log(this.isTabPage)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"

  #app
    background: $color-background
    height: 100vh
    .root-view
      fill-box(fixed)
      &.tab-page
        padding-bottom :$tab-height
    .footer-tab
      z-index: 11
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
