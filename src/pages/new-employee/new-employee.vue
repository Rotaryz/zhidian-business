<template>
  <div class="new-box">
    <div class="main-box border-bottom-1px">
      <div class="list-item border-bottom-1px">
        <div class="item-left">手机号码</div>
        <input type="number" v-if="!disabledCover" placeholder="请输入员工的手机号" oninput="if(value.length > 11)value = value.slice(0, 11)" class="item-right" v-model="staffInfo.mobile">
        <div class="phone-right" v-else>
          <span class="phone-num">{{staffInfo.mobile}}</span>
          <div class="unbind" @click="unBindPhone" v-if="+staffInfo.roleId !== 1">解绑</div>
        </div>
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">姓名</div>
        <input type="text" placeholder="请填写员工的姓名" class="item-right" v-model="staffInfo.name" maxlength="30">
      </div>
      <div class="list-item border-bottom-1px">
        <div class="item-left">职称</div>
        <input type="text" placeholder="请输入" class="item-right" v-model="staffInfo.position" maxlength="30">
      </div>
      <div class="list-item between">
        <div class="item-title">店铺</div>
        <switch-box @switchChange="switchChange" :values="staffInfo.shop_switch * 1"></switch-box>
      </div>
    </div>
    <div class="submit-box">
      <div class="footer-btn btn-item" @click="saveBtn">保存</div>
      <div class="del-btn btn-item" :class="staffInfo.deleted || staffInfo.isBind || +staffInfo.roleId === 1? 'disabled' : ''" @click="delEmployee">删除</div>
    </div>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
    <modal ref="modal" @confirm="modalConfirm"></modal>
    <phone-verify ref="phoneVerify" @relieve="relieve"></phone-verify>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Employee } from 'api'
  import { checkIsPhoneNumber } from 'common/js/utils'
  import SwitchBox from 'components/switch-box/switch-box'
  import {ERR_OK} from '../../common/js/config'
  import Modal from 'components/confirm-msg/confirm-msg'
  import PhoneVerify from 'components/phone-verify/phone-verify'

  export default {
    name: 'new-employee',
    data() {
      return {
        staffInfo: {
          name: '',
          mobile: '',
          position: '',
          shop_switch: 1,
          roleId: 1,
          isBind: 0,
          openId: ''
        },
        disabledCover: false,
        id: '',
        employeeId: ''
      }
    },
    created() {
      let id = this.$route.query.id
      if (id) {
        this.id = id
        this._getDetail(id)
      }
    },
    methods: {
      unBindPhone() {
        this.$refs.phoneVerify.show()
      },
      modalConfirm() {
        Employee.delEmployee(this.employeeId)
          .then((res) => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.$toast.show('删除成功')
            this.$emit('refresh')
            setTimeout(() => {
              this.$router.back()
            }, 1000)
          })
      },
      _getDetail(id) {
        Employee.getShopDel(id).then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            let employee = res.data.employee
            this.staffInfo = {
              name: employee.name,
              mobile: employee.mobile,
              position: employee.position,
              shop_switch: res.data.switch,
              roleId: employee.role_id,
              isBind: employee.is_bind,
              openId: employee.openid,
              deleted: employee.deleted
            }
            this.employeeId = employee.id
            if (employee.deleted || !employee.is_bind) {
              this.staffInfo.mobile = employee.deleted ? '' : employee.mobile
              this.disabledCover = false
            } else {
              this.disabledCover = true
            }
          }
        })
      },
      delEmployee() {
        if (this.staffInfo.isBind || +this.staffInfo.roleId === 1 || this.staffInfo.deleted) { // 是店长，已绑定，不能删除
          return
        }
        this.$refs.modal.show({msg: `是否删除${this.staffInfo.name}店员`})
      },
      _createEmployee() {
        if (this.id) {
          if (this.staffInfo.deleted) { // 解除绑定后再绑定店铺
            Employee.bindShop(this.id, this.staffInfo)
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
          } else { // 正常编辑
            Employee.editEmployee(this.staffInfo, this.employeeId)
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
          }
        } else { // 新建员工
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
      },
      switchChange(e) {
        this.staffInfo.shop_switch = e ? 1 : 0
      },
      relieve(mobile, code) {
        let data = {
          mobile,
          code
        }
        Employee.setRelieve(this.employeeId, data).then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this._getDetail(this.id)
            this.$toast.show('解绑成功')
            this.$emit('refresh')
          } else {
            this.$toast.show(res.message)
          }
        })
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
    },
    components: {
      SwitchBox,
      Modal,
      PhoneVerify
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
      &.between
        justify-content: space-between
        padding-right: 15px
      .item-title
        font-size: $font-size-14
        color: #2e0034
        font-family: $font-family-regular
        min-width: 21.33333vw
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
      .phone-right
        flex: 1
        display: flex
        justify-content: space-between
        align-items: center
        padding-right: 15px
        .phone-num
          color: $color-CCCCCC
        .unbind
          width: 56px
          height: 26px
          line-height: 26px
          text-align: center
          box-sizing: border-box
          border-1px($color-363537, 4px)
          font-size: $font-size-14
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

  .submit-box
    width: 100vw
    height: 64px
    z-index: 60
    box-sizing: border-box
    padding: 0 15px
    margin-top: 40px
    .btn-item
      width: 100%
      height: 44px
      border-radius: 2px
      line-height: 44px
      text-align: center
      font-family: $font-family-regular
      font-size: $font-size-16
      letter-spacing: 0.8px
      box-sizing: border-box
    .footer-btn
      background: $color-363537
      color: $color-white
    .del-btn
      margin-top: 20px
      background: $color-white
      border: 1px solid $color-363537
      color: $color-363537
      &.disabled
        border: 1px solid #9a9aa3
        color: #9a9aa3

  .employee-title
    height: 45px
    line-height: 45px
    padding-left: 15px
    font-family: $font-family-regular
    color: $color-363547
    font-size: $font-size-16
</style>
