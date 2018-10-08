<template>
    <div class="overview">
      overview
      <router-link to="/radar/overview/demo">demo</router-link>
      <router-view-common></router-view-common>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: ''
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .overview
    position: fixed
    top: $tab-boss-height
    bottom: $tab-height
    left: 0
    right: 0
    background-color: greenyellow
</style>
