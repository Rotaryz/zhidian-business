<template>
  <div class="s-data">
    <div class="title">
      <div class="icon"></div>
      <div>BOSS雷达</div>
    </div>
    <ul class="content">
      <li class="item-wrapper" v-for="(item, index) in dataArray" :key="index">
        <div class="number">{{item.number}}</div>
        <div class="title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  const dataArray = [
    {
      number: '800',
      title: '客户总数'
    },
    {
      number: '400',
      title: '订单总数'
    },
    {
      number: '1200',
      title: '成交总数'
    }
  ]
  export default {
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
    margin: 5px
    border-1px($color-E6E6E6, 4px)
    height: 120px
    font-family: $font-family-regular
    background-color: #fff
    border-radius: 4px
    overflow: hidden
    layout(column, block, nowrap)
    .title
      font-size: $font-size-16
      color: $color-363537
      line-height: 14px
      padding: 14px 0 27px
      layout(row)
      align-items: center
      .icon
        width: 5px
        height: 13px
        background: $color-EF705D
        margin-right: 5px
    .content
      flex: 1
      layout(row, block, nowrap)
      .item-wrapper
        flex: 1
        height: 100%
        layout(column, block, nowrap)
        align-items: center
        .number
          font-family: $font-family-bold
          font-size: 26px
          color: $color-FF4E00
          line-height: 18px
          margin-bottom: 10px
        .title
          font-size: $font-size-12
          color: $color-696771
          line-height: 12px
</style>
