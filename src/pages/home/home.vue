<template>
  <div class="home">
    <button @click="test">toAASDA</button>
    <h1 @click="test2">showloading</h1>
    <h1 @click="test3">hideloading</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      test() {
        this.$showToast('asjdadskad')
      },
      test2() {
        this.$showLoading()
        setTimeout(() => {
          this.test3()
        }, 1000)
      },
      test3() {
        this.$hideLoading()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

