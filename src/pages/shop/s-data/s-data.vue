<template>
  <div class="s-data">
    <ul class="content">
      <li class="item-wrapper" v-for="(item, index) in info" :key="index">
        <p class="title">{{item.name}}</p>
        <p class="number">{{values[item.number]}}</p>
        <p class="analyse">
          <span>较昨日</span>
          <span v-if="values[item.type] === 'up'" class="color green">{{values[item.num]}}</span>
          <span v-else-if="values[item.type] === 'down'" class="color red">{{values[item.num]}}</span>

          <span v-if="values[item.type] === 'up'" class="icon up"></span>
          <span v-else-if="values[item.type] === 'down'" class="icon down"></span>
          <span v-else class="icon constant"></span>
        </p>
        <div class="line border-right-1px"></div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      info: {
        type: Array,
        default: () => {
          return [
            {
              name: '营业额',
              number: 'today_turnover',
              num: 'difference_turnover',
              type: 'compare_turnover'
            }, {
              name: '订单',
              number: 'today_order_count',
              num: 'difference_order_count',
              type: 'compare_order_count'
            }, {
              name: '客户',
              number: 'today_customer_count',
              num: 'difference_customer_count',
              type: 'yesterday_customer_count'
            }
          ]
        }
      },
      values: {
        type: Object,
        default: () => {
          return {
            today_turnover: 0,
            difference_turnover: 0,
            compare_turnover: '',
            today_order_count: 0,
            difference_order_count: 0,
            compare_order_count: '',
            today_customer_count: 0,
            difference_customer_count: 0,
            yesterday_customer_count: ''
          }
        }
      }
    },
    data() {
      return {
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
        line-hegiht: 1.3
        .color
          font-family: $font-family-medium
          color: #1AC521
          margin-left: 4px
        .red
          color: #ED2B2B
        .icon
          width: 10px
          height: 10px
          margin-left: 2px
        .up
          icon-image(icon-up)
        .down
          icon-image(icon-down)
        .constant
          icon-image(icon-ping)
      .line
        height: 20px
        right: 0
        col-center()
        border-right-1px(#E6E6E6)
    .analyse.line:last-child:after
      border: 0

</style>
