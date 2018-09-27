<template>
  <div class="shop" @click="test">
    <div>shop</div>
    <transition :name="transitionType">
      <router-view @refresh="refresh"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
    },
    methods: {
      refresh() {
        // todo
        console.log(2123)
      },
      test() {
        this.$router.push(this.$route.path + '/login')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: $tab-height
    font-family: $font-family-regular
    background: #fff
    z-index: 10
</style>
