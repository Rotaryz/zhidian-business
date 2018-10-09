<template>
  <div class="exchange-code">
    <section class="code-area">
      <ul class="code-container">
        <li class="code-item" v-for="(item,index) in '1234567890'" :key="index">{{inputCode[index]}}</li>
      </ul>
    </section>
    <section class="input-area">
      <ul class="input-container">
        <li class="input-item" :class="[inputCode.length >=10 ? 'active' : '',inputCode.length > 0 ? 'del':'']" v-for="(item,index) in dataArray" :key="index" @click="inputHandle(item)">{{item.txt}}</li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Exchange } from 'api'

  const dataArray = [
    {
      icon: '',
      txt: 1
    },
    {
      icon: '',
      txt: 2
    },
    {
      icon: '',
      txt: 3
    },
    {
      icon: '',
      txt: 4
    },
    {
      icon: '',
      txt: 5
    },
    {
      icon: '',
      txt: 6
    },
    {
      icon: '',
      txt: 7
    },
    {
      icon: '',
      txt: 8
    },
    {
      icon: '',
      txt: 9
    },
    {
      icon: '',
      txt: 0
    },
    {
      icon: 'yz',
      txt: '验证'
    },
    {
      icon: 'x',
      txt: ''
    }
  ]
  export default {
    data() {
      return {
        dataArray,
        inputCode: []
      }
    },
    methods: {
      _verification() {
        let code = this.inputCode.join('')
        let id = this.$storage.get('info').store_id
        Exchange.verification({code, store_id: id}).then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('核销成功')
          this.inputCode = []
        })
      },
      inputHandle(item) {
        this._vibrateHandle()
        if (!item.icon && this.inputCode.length < 10) {
          this.inputCode.push(item.txt)
        }
        if (item.icon === 'x' && this.inputCode.length > 0) {
          this.inputCode.pop()
        }
        if (item.icon === 'yz' && this.inputCode.length >= 10) {
          this._verification()
        }
      },
      _vibrateHandle() {
        navigator.vibrate && navigator.vibrate(1000)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .exchange-code
    fill-box()
    z-index: 50
    background: $color-F6F6F6
    .code-area
      height: 32.27vw
      background: $color-363537
      padding: 0 12px
      layout(column, block, nowrap)
      justify-content: center
      align-items: center
      &:after
        content: '请输入10位优惠券验证码'
        font-family: PingFangSC-Light
        font-size: 3.2vw
        color: $color-9B9B9B
        margin-top: 2.93vw
      .code-container
        layout(row, block, nowrap)
        justify-content: space-between
        align-items: center
        width: 100%
        .code-item
          background: #fff
          width: 8.13vw
          height: 13.33vw
          border-radius: 2px
          font-family: PingFangSC-Medium
          font-size: 7.46vw
          color: #363547
          line-height: @height
          text-align: center
    .input-area
      padding-top: 3.5px
      .input-container
        padding: 0 13.46vw
        layout(row)
        justify-content: space-between
        .input-item
          margin-top: 30px
          height: 17.06vw
          width: @height
          border-radius: 50%
          background: #ECECEC
          font-family: PingFangSC-Medium
          font-size: 7.46vw
          color: #363547
          text-align: center
          line-height: @height
          z-index: 22
          &:nth-child(2), &:nth-child(5), &:nth-child(8), &:nth-child(11)
            margin-left: 10vw
            margin-right: 10vw
          &:nth-child(11)
            font-size: 4.8vw
            color: #9B9B9B
          &:nth-child(11).active
            background: #EF705D
            color: #FFFFFF
          &:last-child
            opacity: 0
            width: 12.8vw
            height: @width
            icon-image(icon-shop_delete2)
            background-color: transparent
            position :relative
            left: -4vw
            top: 1vw
          &:last-child.del
            opacity: 1

</style>
