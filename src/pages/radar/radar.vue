<template>
  <div class="radar">
    <tab-boss></tab-boss>
    <router-view @refresh="refresh"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import TabBoss from 'components/tab-boss/tab-boss'
  export default {
    components: {
      TabBoss
    },
    data() {
      return {}
    },
    methods: {
      refresh() {
        // todo
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .radar
    fill-box()
    bottom :$tab-height
    background:$color-F6F6F6
</style>
