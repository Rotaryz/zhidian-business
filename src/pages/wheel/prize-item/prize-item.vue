<template>
  <ul class="prize-item">
    <li class="item-wrapper top">
      <div class="left">{{name}}</div>
      <div class="middle">{{title}}</div>
      <div class="right"></div>
    </li>
    <li class="item-wrapper">
      <div class="left store">可用库存{{allowStore}}</div>
      <section class="counter">
        <div class="btn declare" @click="subHandle">-</div>
        <div class="input-wrapper">
          <input class="input-style" type="number" v-model="useStore">
        </div>
        <div class="btn add" @click="addHandle">+</div>
      </section>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  const NameArr = ['奖品一', '奖品二', '奖品三', '奖品四', '奖品五']
  export default {
    props: {
      idx: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        useStore: 1,
        store: 20,
        title: '国颐堂养发SPA馆洗头护发养…',
        index: this.idx
      }
    },
    computed: {
      name() {
        return NameArr[this.index]
      },
      allowStore() {
        return this.store - this.useStore
      }
    },
    methods: {
      subHandle() {
        this.useStore--
      },
      addHandle() {
        this.useStore++
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

  .prize-item
    background: #FFFFFF;
    border-1px($color-E6E6E6, 4px)
    box-shadow: 0 6px 18px 0 rgba(54, 53, 71, 0.10)
    padding: 18px 0 15px 15px
    .item-wrapper
      layout(row, block, nowrap)
      align-items: center
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #363547;
      &.top
        padding-bottom: 22px
      .left
        padding: 0
        .store
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #363547;
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
            background: #FFFFFF
            border-1px(#F0EFF5, 2px)
            color: #706B82
          &.add
            background: #706B82
            color: #ffffff
            margin-right: 20px
        .input-wrapper
          height: 25px
          width 60px
          margin: 0 5px
          layout()
          justify-content: center
          align-items: center
          border-1px(#F0EFF5, 2px)
</style>
