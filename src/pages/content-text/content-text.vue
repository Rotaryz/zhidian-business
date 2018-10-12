<template>
  <div class="content-text">
    <textarea class="data-area" style="resize:none" @touchmove.stop @keyup.enter="saveBtn" :autofocus="true" v-model="note" :maxlength="maxLength" placeholder="请输入"></textarea>
    <div class="text-number">{{note.length}}/{{maxLength}}</div>
    <footer class="btn-wrapper border-top-1px">
      <div class="btn" :class="saveBtnStyle" @click.enter="saveBtn">确定</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        note: '',
        maxLength: 1000
      }
    },
    created() {
      this._getParams()
    },
    methods: {
      ...mapActions([
        'updateContentText'
      ]),
      _getParams() {
        this.note = this.contentText.txt
      },
      _checkForm() {
        let arr = [
          {value: this.noteReg, txt: '请输入内容'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          let contentText = this.contentText
          let txt = this.note
          let index = contentText.index
          let actionType = contentText.actionType
          this.updateContentText({txt, index, actionType})
          this.$emit('refresh')
          this.$router.back()
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
      saveBtn() {
        this._checkForm()
      }
    },
    computed: {
      ...mapGetters([
        'contentText'
      ]),
      noteReg() {
        return this.note
      },
      saveBtnStyle() {
        let btnClass = ''
        if (this.noteReg) {
          btnClass = 'active'
        }
        return btnClass
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $btn-height = 70px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .content-text
    fill-box()
    z-index: 70
    background: $color-F6F6F6
    .btn-wrapper
      position: fixed
      height: $btn-height
      left: 0
      right: 0
      bottom: 0
      background: #fff
      padding: 0 15px
      text-align: center
      line-height: $btn-height
      .btn
        display: inline-block
        background: #363547;
        border-radius: 4px;
        width: 100%
        height: 45px
        line-height: @height
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.8px;
        text-align: center;
        opacity: 0.5
        &.active
          opacity: 1
    .data-area
      min-height: 250px
      box-sizing: border-box
      width: 100%
      border-color: rgba(0, 0, 0, 0)
      font-size: 16px
      color: $color-20202E
      font-family: $font-family-regular
      outline: none
      padding: 15px !important
      word-break: break-all
      text-align: justify
    .data-area::-webkit-input-placeholder
      color: $color-9B9B9B
    .data-area::-ms-input-placeholder
      color: $color-9B9B9B
    .data-area::-moz-placeholder
      color: $color-9B9B9B
    .text-number
      margin-top: 10px
      text-indent: 15px
      font-family: $font-family-regular
      color: $color-CCCCCC
      font-size: $font-size-12
</style>
