<template>
  <transition name="fade">
    <article class="confirm-msg" v-if="isShow">
      <div class="mask" @click.stop></div>
      <section class="content" @click.stop>
        <div class="pic-expire"></div>
        <div class="expire-txt1">店铺已过期</div>
        <div class="expire-txt2">如需续费请联系我们</div>
      </section>
      <div class="close-btn" @click="close"></div>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        phoneNum: '',
        isShow: false
      }
    },
    methods: {
      cancel() {
        this.isShow = false
        this.$emit('cancel')
      },
      confirm() {
        this.isShow = false
        this.$emit('confirm')
      },
      close() {
        this.isShow = false
        this.$emit('close')
      },
      show() {
        this.isShow = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .confirm-msg
    fill-box()
    z-index: 100
    layout()
    align-items: center
    .mask
      fill-box()
      background: rgba(54, 53, 71, 0.8)
    .content
      position: relative
      margin-top: 25vw
      width: 300px
      height: 330px
      box-sizing: border-box
      background: $color-white
      border: 1px solid rgba(32, 32, 46, 0.10)
      border-radius: 2px
      layout()
      align-items: center
      .pic-expire
        width: 160px
        height: 143.5px
        margin-left: 20px
        margin-top: 47px
        icon-image("pic-shopexpire")
      .expire-txt1
        font-size: $font-size-18
        color: $color-27273E
        font-family: $font-family-regular
        padding-top: 32px
        letter-spacing: 1px
      .expire-txt2
        font-size: $font-size-14
        color: $color-9B9B9B
        font-family: $font-family-regular
        padding-top: 20px
    .close-btn
      position: relative
      width: 28px
      height: 28px
      padding: 5px
      margin-top: 25px
      icon-image("icon-close_pop")
      z-index: 101


</style>
