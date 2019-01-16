<template>
  <div class="deposit">
      <div class="margin-box-10px"></div>
      <section class="card-wrapper" @click="navToBankCard">
        <div class="title" v-if="!bankInfo.bank">添加银行卡</div>
        <div class="title active" v-else>{{bankInfo.bank}}({{bankInfo.withdrawal_card.substring(bankInfo.withdrawal_card.length-4)}})</div>
        <div class="right">
          <div class="name">{{bankInfo.name}}</div>
          <div class="right-arrow"></div>
        </div>
      </section>
      <div class="margin-box-10px"></div>
      <section class="money-wrapper">
        <div class="title">提现金额</div>
        <div class="input-wrapper border-bottom-1px">
          <div class="unit">¥</div>
          <input type="number" class="input-content" v-model="getMoney">
        </div>
        <div class="explain">可提现金额 ¥{{bankInfo.remaining}}</div>
      </section>
      <div class="declare">微信按提现金额{{bankInfo.rate}}收取手续费，最低{{bankInfo.minimum_withdrawal}}元。</div>
      <div class="btn" :class="getMoneyReg?'active':''" @click="_checkForm">提现</div>
      <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Property } from 'api'

  export default {
    name: 'deposit',
    data() {
      return {
        bankInfo: {
          bank: '',
          name: '',
          withdrawal_card: '',
          remaining: '0.00',
          rate: '0.7%',
          minimum_withdrawal: 50
        },
        getMoney: ''
      }
    },
    created() {
      this._getWithdrawalInfo()
    },
    methods: {
      refresh() {
        this._getWithdrawalInfo()
      },
      navToBankCard() {
        let bankInfo = this.bankInfo
        this.$router.push(this.$route.path + `/add-bank-card?name=${bankInfo.name}&withdrawal_card=${bankInfo.withdrawal_card}&bank=${bankInfo.bank}`)
      },
      _getWithdrawalInfo() {
        Property.getWithdrawalInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.bankInfo = res.data
        })
      },
      _getMoney() {
        Property.getMoney({money: this.getMoney}).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$loading.hide()
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('提现成功')
          this.$emit('refresh')
          this.$router.back()
        })
      },
      _checkForm() {
        let arr = [
          {value: this.bankReg, txt: '请选择银行卡'},
          {value: this.getMoneyReg, txt: '请输入正确的提现金额'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._getMoney()
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
      bankReg() {
        return this.bankInfo.bank
      },
      getMoneyReg() {
        return (typeof +this.getMoney === 'number') && +this.getMoney > 0 && +this.getMoney <= this.bankInfo.remaining
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .right-arrow
    width: 7px
    height: 12px
    icon-image(icon-press_right)

  .deposit
    fill-box()
    z-index: 40
    background: $color-F6F6F6
    .card-wrapper
      height: 55px
      layout(row)
      justify-content: space-between
      align-items: center
      padding: 0 15px
      background: #fff
      .title
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 0.6px;
        &.active
          color: #27273E;
      .right
        layout(row, block, nowrap)
        align-items: center
        .name
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #27273E;
          letter-spacing: 0.6px;
          margin-right: 5px
    .money-wrapper
      padding-left: 15px
      background: #fff
      .title
        font-size: 14px;
        color: #27273E;
        letter-spacing: 0.6px;
        padding: 18px 0 8px
      .input-wrapper
        layout(row, block, nowrap)
        align-items: center
        height: 62px
        .unit
          font-family: PingFangSC-Medium;
          font-size: 40px;
          color: #27273E;
          letter-spacing: 1.54px;
          line-height: 1
        .input-content
          flex: 1
          overflow: hidden
          padding: 0 15px 0 3px
          height: 40px
          font-family: DINAlternate-Bold;
          font-size: 40px;
          color: #27273E;
          letter-spacing: 1.54px;
      .explain
        font-size: 14px;
        color: #706B82;
        letter-spacing: 0.6px;
        padding: 17px 0
    .declare
      padding: 15px 15px 20px
      font-size: 12px;
      color: #9B9B9B;
      letter-spacing: 0.6px;
    .btn
      margin: 0 15px
      height: 45px
      background: #27273E;
      border-radius: 4px;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.56px;
      text-align: center
      line-height: @height
      opacity: 0.5
      &.active
        opacity: 1

</style>
