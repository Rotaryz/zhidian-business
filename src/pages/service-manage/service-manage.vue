<template>
  <div class="service-manage">
    <div class="header-tab">
      <div class="tab-box">
        <div class="tab-item" v-for="(item, index) in tabList" :key="index">{{item.txt}}(10)</div>
      </div>
      <div class="underline-box">
        <div class="underline"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const TABS = [
    {txt: '待上线', id: 1},
    {txt: '出售中', id: 2},
    {txt: '已下架', id: 3}
  ]
  export default {
    name: 'PageError',
    data() {
      return {
        tabList: TABS
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .service-manage
    fill-box()
    z-index: 50
    background: $color-F6F6F6


</style>
