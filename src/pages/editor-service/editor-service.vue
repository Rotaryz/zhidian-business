<template>
  <transition :name="transitionType">
    <div class="login" @click.stop="test">
      login
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .login
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    font-family: $font-family-regular
    background: #fff
    z-index: 20
</style>
