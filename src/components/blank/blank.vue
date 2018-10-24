<template>
  <div class="blank">
    <img src="./pic-empty_order@2x.png" class="nothing-img">
    <div class="nothing-txt">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .blank
    display: flex
    flex-direction: column
    align-items: center
    font-size: 0
    .nothing-img
      width: 100px
      height: 80px
      margin-bottom: 5px
    .nothing-txt
      font-size: $font-size-12
      color: $color-CCCCCC
      font-family: $font-family-regular
</style>
