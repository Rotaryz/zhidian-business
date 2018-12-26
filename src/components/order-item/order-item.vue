<template>
  <div class="order-item">
    <div class="top border-bottom-1px">
      <div class="shop-name">订单编号：{{item.order_sn}}</div>
      <div class="status">{{item.status_str}}</div>
    </div>
    <div class="down" @click="toDetail">
      <div class="img" v-if="item.image_url" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
      <div class="img" v-else></div>
      <div class="down-msg">
        <div class="title">{{item.title}}</div>
        <div class="price"><span class="mark">￥</span>{{item.total}}</div>
      </div>
      <div class="right-icon"></div>
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
      toDetail() {
        this.$emit('toDetail', this.item)
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
        color: $color-27273E
      .status
        color: $color-706B82
    .down
      padding: 15px 0
      display: flex
      align-items: center
      justify-content: space-between
      .img
        width: 60px
        height: @width
        border-radius: 2px
        background-color: #f5f5f5
      .down-msg
        display: flex
        flex: 1
        overflow: hidden
        flex-direction: column
        justify-content: space-between
        margin-left: 10px
        height: 55px
        margin-right: 30px
        .title
          $color-4A4657
          font-size: $font-size-14
          font-family: $font-family-regular
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .price
          font-size: $font-size-18
          color: #000
          font-family: $font-family-medium
          .mark
            font-size: $font-size-12
            color: $color-27273E
            font-family: $font-family-medium
      .right-icon
        width: 8px
        height: 14px
        icon-image(icon-pressed)

</style>
