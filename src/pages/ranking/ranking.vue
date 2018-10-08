<template>
  <div class="ranking">
    ranking
    <router-view-common></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .ranking
    position: fixed
    top: $tab-boss-height
    bottom: $tab-height
    left: 0
    right: 0
    background-color: hotpink
</style>
