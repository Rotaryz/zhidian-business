<template>
  <div class="shop">
    <scroll>
      <s-header></s-header>
      <s-data></s-data>
      <s-router></s-router>
    </scroll>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import SHeader from './s-header/s-header'
  import SData from './s-data/s-data'
  import SRouter from './s-router/s-router'
  // import { Jwt } from 'api'

  export default {
    components: {
      Scroll,
      SHeader,
      SData,
      SRouter
    },
    created() {
      // Jwt.getToken()
    },
    data() {
      return {
        isTabHide: false
      }
    },
    methods: {
      refresh() {
        // todo
        console.log(2123)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop
    fill-box()
    bottom: $tab-height
</style>
