<template>
  <div class="order-item">
    <div class="top border-bottom-1px">
      <div class="shop-name">店员：{{item.employee_name}}</div>
      <div class="status">{{item.status_str}}</div>
    </div>
    <div class="down">
      <div class="title">{{item.order_type}}：{{item.title}}</div>
      <div class="down-msg">
        <div class="left">
          <div class="down-txt">下单号码：{{item.customer_mobile}}</div>
          <div class="down-txt last">订单编号：{{item.order_sn}}</div>
        </div>
        <div class="right" @click="toDetail(item)">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data() {
      return {
      }
    },
    methods: {
      toDetail(item) {
        this.$emit('toDetail', item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .order-item
    width: 100%
    background: $color-white
    box-sizing: border-box
    padding: 0 15px
    .top
      display: flex
      height: 40px
      align-items: center
      justify-content: space-between
      font-family: $font-family-regular
      font-size: $font-size-14
      .shop-name
        color: $color-363537
      .status
        color: $color-706B82
    .down
      padding: 15px 0
      .title
        font-size: $font-size-14
        margin-bottom: 12px
        word-break: break-all
        display: -webkit-box
        overflow: hidden
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
      .down-msg
        display: flex
        align-items: flex-end
        justify-content: space-between
        .left
          .down-txt
            font-size: $font-size-14
            color: $color-9B9B9B
            &.last
              margin-top: 9px
        .right
          width: 65px
          height: 26px
          box-sizing: border-box
          border-1px($color-EF705D, 2px)
          text-align: center
          line-height: 26px
          font-size: $font-size-12
          color: $color-EF705D

</style>
