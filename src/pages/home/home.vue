<template>
  <div class="home" @touchmove.prevent>
    <router-view class="home-view"/>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'home'

  export default {
    name: COMPONENT_NAME,
    components: {
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"
  .home
    .home-view
      z-index: 10
</style>
