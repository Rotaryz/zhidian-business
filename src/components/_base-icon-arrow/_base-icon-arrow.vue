<template>
  <div class="base-icon-arrow"></div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_ICON_ARROW'

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

  .base-icon-arrow
    width :7px
    height :12px
    icon-image(icon-pressed)
    extend-click()
</style>
