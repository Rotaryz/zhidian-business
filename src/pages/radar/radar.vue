<template>
  <div class="radar">
    radar
    <router-view-common @refresh="refresh"></router-view-common>
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

  .radar
    font-family: $font-family-regular
</style>
