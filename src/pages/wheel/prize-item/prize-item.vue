<template>
  <ul class="prize-item" @click="navTo(item)">
    <li class="item-wrapper top">
      <div class="left">{{name}}</div>
      <div class="middle">{{item.title}}</div>
      <div class="right" @click.stop="delHandle"></div>
    </li>
    <li class="item-wrapper">
      <div class="left store">可用库存{{item.stock}}</div>
      <section class="counter" @click.stop>
        <div class="btn declare" :class="{'grey':item.time_status === 1}" @click="subHandle"></div>
        <div class="input-wrapper">
          <input class="input-style" :class="inputReg?'error':''" type="number" v-model="item.prize_stock" @input="inputHandle" @focus="focusHandle" @blur="blurHandle">
        </div>
        <div class="btn add" :class="{'grey':item.time_status === 1}" @click="addHandle"></div>
      </section>
      <div class="shade" v-if="item.time_status === 1" @click.stop></div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'

  const NameArr = ['谢谢惠顾', '奖品一', '奖品二', '奖品三', '奖品四', '奖品五']
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currentStock: 0
      }
    },
    computed: {
      ...mapGetters(['prizeList']),
      name() {
        return NameArr[this.item.place]
      },
      inputReg() {
        let flag = this.item.stock < 0 || this.item.prize_stock < 0
        return flag
      }
    },
    methods: {
      ...mapActions(['updatePrizeStorage']),
      subHandle() {
        this.item.prize_stock--
        this.currentStock = this.item.prize_stock
        if (this.item.prize_stock < 0) {
          this.item.prize_stock++
          this.currentStock = this.item.prize_stock
          return
        }
        this.updatePrizeStorage({prize_id: this.item.prize_id, number: -1})
        this.$emit('updatePrizeStock')
      },
      addHandle() {
        this.item.prize_stock++
        this.currentStock = this.item.prize_stock
        if (this.item.stock <= 0) {
          this.item.prize_stock--
          this.currentStock = this.item.prize_stock
          return
        }
        this.updatePrizeStorage({prize_id: this.item.prize_id, number: 1})
        this.$emit('updatePrizeStock')
      },
      blurHandle() {
        let stock = +this.item.prize_stock
        this.item.prize_stock = stock || 0
      },
      focusHandle() {
        this.currentStock = this.item.prize_stock
      },
      inputHandle(e) {
        let value = +e.target.value
        let number = value ? value - this.currentStock : -this.currentStock
        this.currentStock = value || 0
        this.updatePrizeStorage({prize_id: this.item.prize_id, number})
        this.$emit('updatePrizeStock')
      },
      delHandle() {
        this.$emit('delHandle', this.item)
      },
      navTo(item) {
        this.$emit('navTo', item.place)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  input
    height: 24px
    width: 100%
    text-align: center
    line-height: 1
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #363547;
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC
    &.error
      color: red !important

  .prize-item
    background: #FFFFFF;
    border-1px($color-E6E6E6, 4px)
    box-shadow: 0 6px 18px 0 rgba(54, 53, 71, 0.10)
    padding: 18px 0 15px 15px
    .item-wrapper
      layout(row, block, nowrap)
      align-items: center
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #363547
      position: relative
      &.top
        padding-bottom: 22px
      .left
        padding: 0
        .store
          font-family: PingFangSC-Regular
          font-size: 14px
          color: #363547
      .middle
        flex: 1
        overflow: hidden
        padding: 0 46px 0 16px
        no-wrap()
      .right
        margin-right: 14px
        width: 20px
        height: @width
        icon-image(icon-delfw)
      .counter
        flex: 1
        overflow: hidden
        layout(row, block, nowrap)
        justify-content: flex-end
        .btn
          font-family: PingFangSC-Medium;
          font-size: 14px;
          width: 25px
          height: @width
          border-radius: 2px
          text-align: center
          line-height: @width
          &.declare
            icon-image(icon-reduce_prize)
          &.add
            icon-image(icon-plus_prize)
            margin-right: 15px
        .input-wrapper
          height: 25px
          width 60px
          margin: 0 5px
          layout()
          justify-content: center
          align-items: center
          border: 1px solid #F0EFF5
          border-radius : 2px
      .shade
        width: 55%
        height: 100%
        position: absolute
        right: 0
        bottom: 0
</style>
