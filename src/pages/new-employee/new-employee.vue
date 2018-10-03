<template>
  <div class="new-box">
    <div class="main-box border-bottom-1px">
      <div class="list-item border-bottom-1px" @click="chooseBanner">
        <div class="item-left">
          <div class="item-img" :style="{backgroundImage: 'url(' + imageData.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
        </div>
        <div class="item-right">上传头像</div>
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">店员名称</div>
        <input type="text" placeholder="请输入" class="item-right">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">手机号码</div>
        <input type="number" placeholder="请输入" class="item-right">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">公司职位</div>
        <input type="text" placeholder="请输入" class="item-right">
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-btn">保存</div>
    </div>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
    <cropper ref="cropper" @confirm="cropperConfirm"></cropper>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cropper from 'components/cropper/cropper'
  import { Upload } from 'api'
  export default {
    name: 'new-employee',
    data() {
      return {
        imageData: {
          name: '',
          mobile: ''
        },
        disabledCover: false
      }
    },
    created() {
    },
    methods: {
      cropperConfirm(e) {
        this.$loading.show()
        let blob = this.$handle.getBlobBydataURI(e)
        let file = this.$handle.createFormData(blob)
        Upload.upLoadImage(file).then(res => {
          if (res.error !== this.$ERR_OK) {
            return this.$toast.show(res.message)
          }
          let obj = {
            image_id: res.data.id,
            url: res.data.url,
            id: res.data.id
          }
          this.imageData = obj
          this.$loading.hide()
          this.$refs.cropper.cancel()
        })
      },
      chooseBanner() {
        console.log(this.$handle)
        this.$handle.fileController(this.$cosFileType.IMAGE_TYPE).then(res => {
          this.$refs.cropper.show(res[0])
        })
      }
    },
    computed: {
    },
    components: {
      Cropper
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .new-box
    fill-box()
    z-index: 71
    bottom: 0
    min-height: 100vh
    background: $color-F6F6F6
    padding-top: 10px
  .main-box
    padding-left: 15px
    background: $color-white
    .list-item
      height: 60px
      layout(row)
      align-items: center
      position: relative
      .item-left
        font-size: $font-size-14
        color: $color-9B9B9B
        font-family: $font-family-regular
        min-width: 21.33333vw
      .item-img
        width: 10.666vw
        height: @width
        background: #ddd
        margin-right: 10px
        border-radius: 50px
        position: relative
      .item-right
        font-size: $font-size-14
        color: $color-363547
        font-family: $font-family-regular
        flex: 1
        width: 100%
        height: 100%
        outline: none
        padding: 0
        margin: 0
        padding-right: 15px
        line-height: 60px
      .item-right::-webkit-input-placeholder
        color: $color-CCCCCC
      .item-right::-ms-input-placeholder
        color: $color-CCCCCC
      .item-right::-moz-placeholder
        color: $color-CCCCCC
  .footer-box
    position: fixed
    width: 100vw
    height: 64px
    z-index: 60
    bottom: 0
    left: 0
    background: $color-white
    box-sizing: border-box
    padding: 10px 15px
    .footer-btn
      width: 100%
      height: 100%
      background: $color-363537
      border-radius: 2px
      line-height: 44px
      text-align: center
      font-family: $font-family-regular
      color: $color-white
      font-size: $font-size-16
      letter-spacing: 0.8px
  .employee-title
    height: 45px
    line-height: 45px
    padding-left: 15px
    font-family: $font-family-regular
    color: $color-363547
    font-size: $font-size-16
</style>
