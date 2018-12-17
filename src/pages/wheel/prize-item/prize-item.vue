<template>
  <ul class="prize-item" @click="navTo(item)">
    <li class="item-wrapper top border-bottom-1px">
      <div v-if="item.image_url" class="img" :style="{backgroundImage: 'url(' + item.image_url + ')'}"></div>
      <div v-else class="img"></div>
      <div class="content">
        <div class="title">
          <div class="left">{{item.title}}</div>
          <div class="right" @click.stop="delHandle"></div>
        </div>
        <div class="stock">库存{{item.stock}}</div>
        <div v-if="+item.status === 1" class="valid">有效期:{{item.end_at}}</div>
        <div v-else class="valid">已过期</div>
      </div>
    </li>
    <li class="item-wrapper">
      <div class="left store">{{name}}</div>
      <section class="counter" @click.stop>
        <div class="btn declare" :class="{'grey':item.status === 0}" @click="subHandle"></div>
        <div class="input-wrapper">
          <input class="input-style" :class="inputReg?'error':''" type="number" v-model="item.prize_stock" @input="inputHandle" @focus="focusHandle" @blur="blurHandle">
        </div>
        <div class="btn add" :class="{'grey':item.status === 0}" @click="addHandle"></div>
      </section>
      <div class="shade" v-if="item.status === 0" @click.stop></div>
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
    color: #27273E;
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC
    &.error
      color: red !important

  .prize-item
    border-1px($color-E6E6E6, 4px)
    box-shadow: 0 6px 18px 0 rgba(54, 53, 71, 0.10)
    padding: 3px 10px 0
    .item-wrapper
      layout(row, block, nowrap)
      align-items: center
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #27273E
      position: relative
      padding: 10px 0
      &.top
        padding-bottom: 12px
        border-bottom-1px($color-row-line)
      .img
        width: 57px
        height: @width
        background-image: url("./img.jpg")
        background-size: cover
        background-position: center
        border-radius: 2px
        overflow: hidden
        margin-right: 8px
      .content
        flex: 1
        overflow: hidden
      .stock,.valid
        font-size: 13px
        color: $color-9B9B9B
        font-family: $font-family-regular
        line-height: 1.4
      .title
        display: flex
        align-items: center
        justify-content: space-between
        margin-bottom: 2px
        .left
          padding: 0
          line-height: 1.4
          font-family: $font-family-medium
          font-size: 14px
          color: $color-27273E
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          flex: 1
        .right
          margin-right: 5px
          margin-left: 8vw
          width: 20px
          height: @width
          icon-image(icon-delpic)
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
          &.grey.declare
            icon-image(icon-reduce_bkd)
          &.grey.add
            icon-image(icon-plus_bkd)
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
