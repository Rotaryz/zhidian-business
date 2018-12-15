<template>
  <div class="add-bank-card">
    <div class="margin-box-10px"></div>
    <ul class="wrapper border-bottom-1px">
      <li class="item-wrapper border-bottom-1px">
        <div class="left">持卡人</div>
        <input class="middle" type="text" maxlength="20" placeholder="持卡人姓名" v-model="openBankInfo.name"/>
      </li>
      <li class="item-wrapper border-bottom-1px">
        <div class="left">银行卡号</div>
        <input class="middle" type="text" maxlength="23" placeholder="请输入银行卡号" @input="getCode" v-model="cardNum"/>
      </li>
      <li class="item-wrapper" @click="showPicker">
        <div class="left">开户行</div>
        <div class="middle place" v-if="!openBankInfo.bank">请选择开户行</div>
        <div class="middle" v-else>{{openBankInfo.bank}}</div>
        <div class="right-arrow"></div>
      </li>
    </ul>
    <div class="btn" :class="allowBtn?'active':''" @click="_checkForm">确定</div>
    <awesome-picker
      ref="picker"
      :data="bankList"
      @confirm="pickerConfirm">
    </awesome-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Property } from 'api'

  export default {
    data() {
      return {
        openBankInfo: {
          bank: '',
          withdrawal_card: '',
          name: ''
        },
        bankList: [],
        cardNum: ''
      }
    },
    created() {
      Object.assign(this.openBankInfo, this.$route.query)
      if (this.$route.query && this.$route.query.withdrawal_card) {
        this.cardNum = this.$route.query.withdrawal_card.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      }
      this._getBankCardList()
    },
    methods: {
      getCode(e) {
        this.cardNum = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      },
      showPicker() {
        this.$refs.picker.show()
      },
      pickerConfirm(e) {
        this.openBankInfo.bank = e[0].value
      },
      _updateBankCard() {
        this.openBankInfo.withdrawal_card = this.cardNum.replace(/\s/g, '')
        Property.updateBankCard(this.openBankInfo).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$loading.hide()
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('绑定成功')
          this.$emit('refresh')
          this.$router.back()
        })
      },
      _getBankCardList() {
        Property.getBankCardList().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.bankList = [res.data]
        })
      },
      _checkForm() {
        let arr = [
          {value: this.nameReg, txt: '持卡人不能为空'},
          {value: this.cardNumReg, txt: '请输入正确银行卡号'},
          {value: this.bankReg, txt: '开户行不能为空'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._updateBankCard()
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
      cardNumReg() {
        return this.cardNum.length === 23
      },
      bankReg() {
        return this.openBankInfo.bank
      },
      nameReg() {
        return this.openBankInfo.name
      },
      allowBtn() {
        return this.cardNumReg && this.bankReg && this.nameReg
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  input
    height: 40px
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .right-arrow
    width: 7px
    height: 12px
    icon-image(icon-press_right)

  .add-bank-card
    fill-box()
    z-index: 60
    background: $color-F6F6F6
    .wrapper
      padding-left: 15px
      background: #fff
      .item-wrapper
        layout(row, block, nowrap)
        height: 55px
        align-items: center
        padding-right: 15px
        .left
          width: 80px
          font-size: 14px;
          color: #9B9B9B;
        .middle
          flex: 1
          overflow: hidden
          height: 40px
          font-size: 14px;
          color: $color-27273E
          letter-spacing: 0;
          padding-right: 10px
          line-height: @height
          &.place
            color: $color-CCCCCC

    .btn
      margin: 20px 15px
      opacity: 0.5;
      background: #27273E;
      border-radius: 4px;
      height: 45px
      line-height: @height
      text-align: center
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.56px;
      &.active
        opacity: 1
</style>
