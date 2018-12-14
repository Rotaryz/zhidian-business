<template>
  <div class="s-data">
    <ul class="content">
      <li class="item-wrapper" v-for="(item, index) in dataArray" :key="index">
        <p class="title">{{item.title}}</p>
        <p class="number">{{item.number}}</p>
        <p class="analyse">
          <span>较昨日</span>
          <span v-if="item.type === 'up'" class="color green">{{item.num}}</span>
          <span v-else class="color red">{{item.num}}</span>
          <span v-if="item.type === 'up'" class="icon up"></span>
          <span v-else class="icon down"></span>
        </p>
        <div class="line border-right-1px"></div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  const dataArray = [
    {
      number: '200',
      title: '营业额',
      num: '200',
      type: 'up'
    },
    {
      number: '200',
      title: '订单',
      num: '200',
      type: 'up'
    },
    {
      number: '200',
      title: '客户',
      num: '200',
      type: 'down'
    }
  ]
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        dataArray
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .s-data
    margin: 0 12px
    margin-top: -50px
    border-1px($color-E6E6E6, 4px)
    height: 100px
    font-family: $font-family-regular
    background-color: #fff
    border-radius: 4px
    overflow: hidden
    layout(column, block, nowrap)
    .content
      width: 100%
      height: 100%
      padding: 15px 20px
      display: flex
      box-sizing: border-box
      padding-right: 0
      padding-left: 0
    .item-wrapper
      width: 33.333%
      position: relative
      padding-left: 20px
      box-sizing: border-box
      .title
        font-size: 13px
        line-height: 1.4
        color: $color-27273E
      .number
        font-family: $font-family-bold
        font-size: $font-size-20
        color: $color-27273E
        line-height: 1.5
      .analyse
        font-size: 11px
        color: $color-9B9B9B
        line-height: 22px
        display: flex
        align-items: center
        .color
          font-family: $font-family-medium
          color: #1AC521
          margin-left: 4px
        .red
          color: #ED2B2B
        .icon
          icon-image(icon-up)
          width: 10px
          height: 9px
          margin-left: 2px
        .down
          icon-image(icon-down)
      .line
        height: 20px
        right: 0
        col-center()
        border-right-1px(#E6E6E6)
    .analyse.line:last-child:after
      border: 0

</style>
