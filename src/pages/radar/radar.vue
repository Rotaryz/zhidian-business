<template>
  <div class="radar">
    <scroll>
      <div @click="test">shop</div>
      <hr>
      <h1 @click="test2">222</h1>
      <h1 @click="test3">2224444</h1>
      <hr>
      <h1 @click="$hideTab">hide</h1>
      <h1 @click="$showTab">show</h1>
      <hr>
      <img v-if="pic" style="width:100%" :src="pic" alt="">
      <h1 @click="testcos">cos</h1>
      <div style="height: 600px;background-color: #f00"></div>
    </scroll>
    <cropper ref="mycropper" @confirm="cropperConfirm"></cropper>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Cropper from 'components/cropper/cropper'

  export default {
    components: {
      Scroll,
      Cropper
    },
    data() {
      return {
        pic: ''
      }
    },
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
        console.log(2123121111)
        this.$toast.show('123')
      },
      test3() {
        console.log(555)
        this.$loading.show()
        setTimeout(() => {
          this.$loading.hide()
        }, 2000)
      },
      testcos() {
        this.$handle.fileController(this.$cosFileType.IMAGE_TYPE).then(res => {
          this.$hideTab()
          const bb = new Blob([new Uint8Array([1, 2, 2, 3])])
          console.log(res[0].type)
          console.log(bb.type)
          this.$refs.mycropper.show(res[0])
        })
      },
      cropperConfirm(src) {
        this.pic = src
        console.log(typeof src)
        this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [src])
        this.$refs.mycropper.cancel()
        this.$showTab()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .radar
    fill-box(absolute)
    background greenyellow
    z-index: 10
</style>
