<template>
  <div class="login" @click.stop="test">
    login
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      console.log(this.$currentRouter)
    },
    methods: {
      refresh() {
        // todo
        console.log(21)
      },
      test() {
        // console.log(this.$route.path + '/demo')
        this.$router.push(this.$route.path + '/demo')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .login
    fill-box()
    min-height :100vh
    font-family: $font-family-regular
    background: #fff
    z-index: 20
</style>
