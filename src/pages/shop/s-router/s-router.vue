<template>
  <div class="s-router">
    <div class="s-router-container">
      <ul class="s-ul border-bottom-1px border-right-1px">
        <router-link tag="li" class="item-wrapper border-top-1px border-left-1px" v-for="(item, index) in dataArray" :key="index" :to="item.path">
          <div class="logo" :class="item.icon"></div>
          <div class="txt">{{item.title}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const dataArray = [
    {
      icon: 'one-1',
      title: '服务',
      path: ''
    },
    {
      icon: 'one-2',
      title: '内容',
      path: ''
    },
    {
      icon: 'one-3',
      title: '订单',
      path: ''
    },
    {
      icon: 'two-1',
      title: '拼团',
      path: ''
    },
    {
      icon: 'two-2',
      title: '砍价',
      path: ''
    },
    {
      icon: 'two-3',
      title: '优惠券',
      path: ''
    },
    {
      icon: 'three-1',
      title: '',
      path: ''
    },
    {
      icon: 'three-2',
      title: '',
      path: ''
    },
    {
      icon: 'three-3',
      title: '',
      path: ''
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
  .s-router
    height: 0
    padding-top: 100%
    position: relative
    .s-router-container
      fill-box(absolute)
      margin: 5px
      .s-ul
        position: relative
        background-color: #fff
        box-sizing: border-box
        height: 100%
        width: 100%
        border-radius: 4px
        overflow: hidden
        layout(row)
        .item-wrapper
          position: relative
          width: 33.333%
          height: 33.333%
          layout()
          justify-content: center
          align-items: center
          font-size: $font-size-14
          color: $color-696771
          line-height: 14px
          .logo
            width: 8.533vw
            height: 8.533vw
            margin-bottom: 9px
            &.one-1
              icon-image(icon-service)
            &.one-2
              icon-image(icon-content)
            &.one-3
              icon-image(icon-order)
            &.two-1
              icon-image(icon-group)
            &.two-2
              icon-image(icon-kanjia)
            &.two-3
              icon-image(icon-coupon)

</style>
