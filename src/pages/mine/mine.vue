<template>
  <div class="mine">
    mine
    <div @click="test">退出登录</div>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      refresh() {
        // todo
        console.log(2123)
      },
      test() {
        this.$storage.clear()
        this.$router.replace('/shop')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .mine
    fill-box()
    bottom :$tab-height
</style>
