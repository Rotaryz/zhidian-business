<template>
  <div class="shop" >
    <div @click="test">shop</div>
    <hr>
    <h1 @click="test2">222</h1>
    <h1 @click="test3">2224444</h1>
    <hr>
    <h1 @click="$hideTab">hide</h1>
    <h1 @click="$showTab">show</h1>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      console.log(this.$loading)
    },
    methods: {
      refresh() {
        // todo
        console.log(2123)
      },
      test() {
        this.$router.push(this.$route.path + '/login')
      },
      test2() {
        console.log(2123121111)
        this.$toast.show('123')
      },
      test3() {
        console.log(555)
        this.$loading.show()
        setTimeout(() => {
          this.$loading.hide()
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop
    background greenyellow
    z-index: 10
</style>
