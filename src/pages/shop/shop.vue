<template>
  <div class="shop" >
    <div @click="test">shop</div>
    <hr>
    <h1 @click="$hideTab">222</h1>
    <h1 @click="$showTab">2224444</h1>
    <hr>
    <h1 @click="$showToast('123asdjhasdshdjahsdkjahskdahdajdhadkjsahdajsdhakjdhasda')">toast</h1>
    <router-view-common @refresh="refresh"></router-view-common>
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
      },
      test2() {
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
