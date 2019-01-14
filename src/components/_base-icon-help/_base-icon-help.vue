<template>
  <div class="base-icon-help"></div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_ICON_HELP'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-icon-help
    width: 17px
    height :@width
    icon-image(icon-rule)
    extend-click()
</style>
