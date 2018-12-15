<template>
  <transition name="fade">
    <article class="confirm-msg" v-if="isShow">
      <div class="mask" @click="cancel"></div>
      <section class="content" @click.stop>
        <div class="title">身份验证</div>
        <div class="item border-bottom-1px">
          <div class="item-title">手机号</div>
          <div class="item-right">
            <div class="right-txt">{{phoneNum}}</div>
          </div>
        </div>
        <div class="item border-bottom-1px">
          <div class="item-title">验证码</div>
          <div class="item-right">
            <input type="number" class="input-box" v-model="code">
            <div class="num-btn" :class="codeIng ? 'disabled' : ''" @click="timeRun">{{codeIng ? timeNum + 'S' : '获取验证码'}}</div>
          </div>
        </div>
        <div class="btn" :class="{'disabled' : !code}" @click="submitAny">确认解绑</div>
        <div class="sub-txt">温馨提示：解绑成功后该手机号无法再登陆</div>
      </section>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Jwt} from 'api'
  export default {
    data() {
      return {
        phoneNum: '',
        isShow: false,
        codeIng: false, // 是否正在发送验证码
        timeNum: 59,
        timer: '',
        code: '' // 验证码
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
      show(data) {
        this.phoneNum = this.$storage.get('info').mobile
        if (data) {
          this.msg = data.msg || ''
        }
        this.isShow = true
      },
      timeRun() {
        if (this.codeIng) return
        this.getCode()
        this.codeIng = true
        this.timeNum = 60
        clearInterval(this.timer)
        this.timeNum--
        this.timer = setInterval(() => {
          this.timeNum--
          if (+this.timeNum === 0) {
            clearInterval(this.timer)
            this.codeIng = false
          }
        }, 1000)
      },
      getCode() {
        Jwt.getSms({mobile: this.phoneNum}, false)
      },
      submitAny() {
        if (!this.code) return
        this.isShow = false
        this.$emit('relieve', this.phoneNum, this.code)
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
      margin-top: 152px
      width: 300px
      height: 270px
      padding: 20px
      box-sizing: border-box
      background: $color-white
      border: 1px solid rgba(32, 32, 46, 0.10)
      border-radius: 2px
      layout()
      .title
        font-family: $font-family-medium
        color: $color-27273E
        fontsize: $font-size-16
        letter-spacing: 0.8px
        padding-bottom: 14px
        width: 100%
      .sub-txt
        width: 100%
        padding-top: 8px
        font-family: $font-family-regular
        font-size: $font-size-12
        color: #9c9c9c
        text-align: center
      .item
        height: 48px
        margin-top: 10px
        display: flex
        align-items: center
        .item-title
          width: 75px
        .item-right
          flex: 1
          overflow: hidden
          display: flex
          align-items: center
          .right-txt
            font-family: $font-family-regular
            color: #9c9c9c
            font-size: $font-size-14
          .input-box
            flex: 1
            overflow: hidden
            font-size: $font-size-14
          .num-btn
            margin-left: 5px
            width: 90px
            height: 30px
            text-align: center
            line-height: 30px
            box-sizing: border-box
            font-size: $font-size-14
            font-family: $font-family-regular
            color: $color-D32F2F
            border-1px($color-D32F2F, 30px)
            &.disabled
              border-1px($color-CCCCCC, 30px)
              color: $color-CCCCCC
      .btn
        margin-top: 20px
        width: 260px
        height: 40px
        text-align: center
        line-height: 40px
        font-size: $font-size-14
        color: $color-white
        background: $color-27273E
        border-radius: 4px
        letter-spacing: 0.6px
        &.disabled
          background: rgba(54,53,71,0.5)

</style>
