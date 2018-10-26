<template>
  <div class="new-box">
    <div class="margin-box-10px"></div>
    <div class="main-box border-bottom-1px">
      <div class="list-item border-bottom-1px">
        <div class="item-left">手机号码</div>
        <input type="number" v-if="!disabledCover" placeholder="请输入员工的手机号" oninput="if(value.length > 11)value = value.slice(0, 11)" class="item-right" v-model="staffInfo.mobile">
        <input type="number" v-else :placeholder="staffInfo.mobile" readonly class="item-right">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">店员名称</div>
        <input type="text" placeholder="请填写员工的姓名" class="item-right" v-model="staffInfo.name" maxlength="30">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">职位/职称</div>
        <input type="text" placeholder="请输入" class="item-right" v-model="staffInfo.position" maxlength="30">
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-btn" @click="saveBtn">保存</div>
    </div>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Employee } from 'api'
  import { checkIsPhoneNumber } from 'common/js/utils'

  export default {
    name: 'new-employee',
    data() {
      return {
        staffInfo: {
          name: '',
          mobile: '',
          position: ''
        },
        disabledCover: false,
        id: ''
      }
    },
    created() {
      if (this.$storage.get('employee')) {
        let employee = this.$storage.get('employee')
        this.disabledCover = true
        this.id = employee.id
        this.staffInfo = {
          name: employee.name,
          mobile: employee.mobile,
          position: employee.position
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$storage.remove('employee')
      next(true)
    },
    methods: {
      _createEmployee() {
        if (this.disabledCover) {
          Employee.editEmployee(this.staffInfo, this.id)
            .then(res => {
              if (this.$ERR_OK !== res.error) {
                this.$loading.hide()
                this.$toast.show(res.message)
                return
              }
              this.$toast.show('修改成功')
              this.$emit('refresh')
              this.$router.go(-1)
            })
        } else {
          Employee.createNewEmployee(this.staffInfo)
            .then(res => {
              if (this.$ERR_OK !== res.error) {
                this.$loading.hide()
                this.$toast.show(res.message)
                return
              }
              this.$toast.show('创建成功')
              this.$emit('refresh')
              this.$router.go(-1)
            })
        }
      },
      _fileChange(e) {
        let arr = Array.from(e.target.files)
        this.$refs.cropper.show(arr[0])
      },
      saveBtn() {
        this._checkForm()
      },
      _checkForm() {
        let arr = [
          {value: this.mobileReg, txt: '请输入店员正确的手机号码'},
          {value: this.nameReg, txt: '请输入店员的名称'},
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
      }
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
        color: #2e0034
        font-family: $font-family-regular
        min-width: 21.33333vw
        &:before
          content: '*'
          color: $color-EF705D
          font-size: 14px
          margin-right: 2px
          position: absolute
          left: -7px
          top: 26px
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
