<template>
  <div class="panel" :style="styles">
    <div class="title-wrapper">
      <h4 class="title">{{title}}</h4>
      <p class="sub-head">{{subHead}}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      subHead: {
        type: String,
        default: ''
      },
      styles: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .panel
    padding 0 15px
    background: $color-white
    .title-wrapper
      layout(row, block, nowrap)
      align-items: flex-end
      .title
        padding-top: 17px
        font-family: PingFangSC-Medium
        font-size: 18px
        color: #000000
      .sub-head
        padding-left :5px
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #9B9B9B;
</style>
