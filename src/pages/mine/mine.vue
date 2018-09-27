<template>
    <div class="mine">
      mine
      <transition :name="transitionType">
        <router-view @refresh="refresh"></router-view>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
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

  .mine
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: $tab-height
    font-family: $font-family-regular
    background: #fff
</style>
