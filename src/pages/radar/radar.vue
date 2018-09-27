<template>
  <transition :name="transitionType">
    <div class="radar">radar</div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .radar
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: $tab-height
    font-family: $font-family-regular
    background: #fff
</style>
