<template>
  <div class="new-box">
    <div class="margin-box-10px"></div>
    <div class="main-box border-bottom-1px" >
      <!--<div class="list-item border-bottom-1px avatar" v-if="false">-->
        <!--<div class="item-left">上传头像</div>-->
        <!--<label class="item-right avatar">-->
          <!--<div class="item-img" :style="{backgroundImage: 'url(' + staffInfo.imageData.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>-->
          <!--<input type="file" style="display: none" @change="_fileChange" accept="image/*">-->
        <!--</label>-->
      <!--</div>-->
      <div class="list-item border-bottom-1px">
        <div class="item-left">店员名称</div>
        <input type="text" placeholder="请输入员工的名称" class="item-right" v-model="staffInfo.name" maxlength="30">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">手机号码</div>
        <input type="number" placeholder="请输入员工的手机号" class="item-right" v-model="staffInfo.mobile">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">公司职位</div>
        <input type="text" placeholder="请输入员工职位" class="item-right" v-model="staffInfo.position" maxlength="30">
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-btn" @click="saveBtn">保存</div>
    </div>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
    <cropper ref="cropper" @confirm="cropperConfirm" :aspect="1"></cropper>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cropper from 'components/cropper/cropper'
  import { Upload, Employee } from 'api'
  import { checkIsPhoneNumber } from 'common/js/utils'

  export default {
    name: 'new-employee',
    data() {
      return {
        staffInfo: {
          name: '',
          mobile: '',
          position: '',
          imageData: {}
        },
        disabledCover: false
      }
    },
    created() {
    },
    methods: {
      _createEmployee() {
        Employee.createNewEmployee(this.staffInfo).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$loading.hide()
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('创建成功')
          this.$emit('refresh')
          this.$router.go(-1)
        })
      },
      _fileChange(e) {
        let arr = Array.from(e.target.files)
        this.$refs.cropper.show(arr[0])
      },
      saveBtn() {
        this._checkForm()
      },
      cropperConfirm(e) {
        this.$loading.show()
        // let blob = this.$handle.getBlobBydataURI(e)
        // let file = this.$handle.createFormData(blob)
        Upload.upLoadImage(e.formData).then(res => {
          if (res.error !== this.$ERR_OK) {
            return this.$toast.show(res.message)
          }
          let obj = {
            image_id: res.data.id,
            url: res.data.url,
            id: res.data.id
          }
          this.staffInfo.imageData = obj
          this.$loading.hide()
          this.$refs.cropper.cancel()
        })
      },
      _checkForm() {
        let arr = [
          // {value: this.avatarReg, txt: '请添加店员的照片'},
          {value: this.nameReg, txt: '请输入店员的名称'},
          {value: this.mobileReg, txt: '请输入店员正确的手机号码'},
          {value: this.positionReg, txt: '请输入店员的职位'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._createEmployee()
        }
      },
      _testPropety(arr) {
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      }
    },
    computed: {
      nameReg() {
        return this.staffInfo.name
      },
      mobileReg() {
        return checkIsPhoneNumber(this.staffInfo.mobile)
      },
      positionReg() {
        return this.staffInfo.position
      },
      avatarReg() {
        return this.staffInfo.imageData.url
      }
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
    height: 100vh
    background: $color-F6F6F6

  .main-box
    padding-left: 15px
    background: $color-white
    .list-item
      height: 60px
      display: flex
      align-items: center
      position: relative
      &.avatar
        height: 75px
      .item-left
        font-size: $font-size-14
        color: $color-9B9B9B
        font-family: $font-family-regular
        min-width: 21.33333vw
      .item-img
        width: 50px
        height: @width
        background: #ccc
        border-radius: 50%
      .item-right
        font-size: $font-size-14
        color: $color-363547
        font-family: $font-family-regular
        flex: 1
        overflow: hidden
        width: 100%
        height: 24px
        line-height: 24px
        outline: none
        padding: 0
        margin: 0
        padding-right: 15px
        &.avatar
          layout(row)
          align-items: center
          justify-content: flex-end
          height: 100%
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
