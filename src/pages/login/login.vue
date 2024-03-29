<template>
  <transition>
    <div class="login">
      <div class="logo"></div>
      <section class="warn" v-if="phoneNumber.length >= 11 && codeStyle">
        <div class="icon-warn"></div>
        <div>手机号码格式错误</div>
      </section>
      <div class="content">
        <section class="input-wrapper mobile border-bottom-1px">
          <div class="left">
            <input class="input" ref="phone" type="number" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber">
          </div>
          <div class="del" v-if="phoneNumber.length > 0" @click="delHandle"></div>
        </section>
        <section class="input-wrapper mobile border-bottom-1px">
          <div class="left">
            <input class="input" type="number" placeholder="请输入验证码" maxlength="11" v-model="authCode">
          </div>
          <div class="get-code" :class="codeStyle? 'coding' : ''" v-if="allowGetCode" @click="getCode">获取验证码</div>
          <div class="get-code coding" v-else>重新发送{{codeSeconds}}s</div>
        </section>
        <section class="btn" :class="btnStyle || codeStyle?'unable':''" @click="submit">
          <div class="txt">登录</div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { checkIsPhoneNumber } from 'common/js/utils'
  import { Jwt } from 'api'
  import storage from 'storage-controller'

  export default {
    name: 'LOGIN',
    data() {
      return {
        phoneNumber: '',
        authCode: '',
        allowGetCode: true,
        codeSeconds: 59,
        timer: null,
        showQrCode: false,
        codeStyle: true,
        btnStyle: true,
        isShow: false
      }
    },
    created() {
      this.$loading.hide()
      this._hide()
    },
    methods: {
      _hide() {
        let token = storage.get('token')
        if (token) {
          this.$router.replace('/')
        }
      },
      delHandle() {
        this.phoneNumber = ''
        this.$refs.phone.focus()
      },
      submit() {
        if (!this._check()) return
        let data = {
          code: this.authCode,
          mobile: this.phoneNumber
        }
        Jwt.getToken(data).then(res => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$toast.show(res.message)
            return
          }
          const token = res.data.access_token
          const merchantInfo = res.data.employee_info
          this.$storage.set('token', token)
          this.$storage.set('info', merchantInfo)
          this.$router.replace('/')
        }).catch(e => {
          console.error(e)
        })
      },
      getCode() {
        if (!checkIsPhoneNumber(this.phoneNumber)) {
          this.$toast.show('请输入正确的手机号码')
          return
        }
        if (!this.allowGetCode) return
        this.allowGetCode = false
        this.timer = setInterval(() => {
          --this.codeSeconds
        }, 1000)
        Jwt.getSms({mobile: this.phoneNumber}).then(res => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$toast.show(res.message)
          }
          this.$toast.show('验证码已发送，请注意查收')
        })
      },
      _check() {
        if (!checkIsPhoneNumber(this.phoneNumber)) {
          this.$toast.show('请输入正确的手机号码')
          return false
        }
        if (!this.authCode) {
          this.$toast.show('请输入验证码')
          return false
        }
        return true
      }
    },
    watch: {
      'codeSeconds'(curVal) {
        if (curVal <= 0) {
          this.timer && clearInterval(this.timer)
          this.allowGetCode = true
          this.codeSeconds = 59
        }
      },
      phoneNumber(curVal) {
        if (checkIsPhoneNumber(curVal)) {
          this.codeStyle = false
        } else {
          this.codeStyle = true
        }
      },
      authCode(curVal) {
        if (curVal) {
          this.btnStyle = false
        } else {
          this.btnStyle = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .login
    fill-box(fixed)
    z-index: 300
    background: #fff
    layout(column,block,nowrap)
    align-items: center
    .logo
      margin: 9.6vw 0 10.2vw
      width: 12.8vw
      height: @width
      icon-image(icon-login_logo)
    .warn
      row-center()
      top: 27.28vw
      layout(row)
      align-items: center
      justify-content: center
      font-family: $font-family-light
      font-size: 12px
      color: $color-D32F2F
      letter-spacing: 0.08px
      .icon-warn
        margin-right: 5px
        height: 12px
        width: @height
        icon-image(icon-login_prompt)
    .content
      font-family: PingFangSC-Regular
      padding: 0 27.5px
      box-sizing: border-box
      width: 100%
      .input-wrapper
        height: 64.5px
        display: flex
        flex-direction: row
        flex-wrap: nowrap
        align-items: center
        padding: 0 1px
        .left
          layout(row, block, nowrap)
          align-items: center
          flex: 1
          overflow: hidden
        .del
          width: 17px
          height: 17px
          icon-image(icon-del34)
          extend-click()
        .get-code
          height: 30px
          padding: 0 9.5px 0 10px
          background: #FFFFFF
          border-1px($color-D32F2F, 100px)
          font-size: 14px
          color: $color-D32F2F
          text-align: center
          line-height: @height
          &.coding
            color: #ccc
            border-1px(#ccc, 100px)
      .btn
        margin-top: 50px
        height: 45px
        background: $color-27273E
        border-radius: 4px
        layout(row, block, nowrap)
        align-items: center
        justify-content: center
        &.unable
          opacity: 0.5
        .txt
          font-size: 16px
          color: #FFFFFF
          letter-spacing: 1px

  .input
    height: 40px
    flex: 1
    overflow: hidden
    font-size: 16px
    outline: none
    margin-right: 10px
    font-family: PingFangSC-Regular
    color: $color-27273E
    letter-spacing: 1px
    &::-webkit-input-placeholder
      color: $color-C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &:-moz-placeholder
      color: $color-C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &::-moz-placeholder
      color: $color-C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &:-ms-input-placeholder
      color: $color-C8C8C8
      font-size: 16px
      letter-spacing: 1px

</style>
