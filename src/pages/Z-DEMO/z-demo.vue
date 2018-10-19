<template>
    <div class="demo">
      <button @click="test">toAASDA</button>
      <h1 @click="test2">showloading</h1>
      <h1 @click="test3">hideloading</h1>
      <hr>
      <h1 @click="choose">选择图片</h1>
      <cropper ref="cropper" @confirm="cropperConfirm"></cropper>
      <img v-if="testSrc" style="width: 100%" :src="testSrc" alt="">
    </div>
</template>

<script>
  import Cropper from 'components/cropper/cropper'

  export default {
    components: {
      Cropper
    },
    data() {
      return {
        testSrc: ''
      }
    },
    created() {
      console.log(this.$handle)
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
      },
      choose() {
        this.$handle.fileController(this.$cosFileType.IMAGE_TYPE).then(res => {
          this.$refs.cropper.show(res[0])
        })
      },
      cropperConfirm(e) {
        this.testSrc = e.src
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .demo
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 999
    background fuchsia
</style>
