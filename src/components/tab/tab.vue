<template>
  <div class="tab border-top-1px">
    <router-link tag="div" v-for="(item, index) in tabList" :key="index" :to="item.path" class="tab-item">
      <div class="item-container">
        <div class="icon" :class="item.iconClass"></div>
        <p class="icon-text">{{item.text}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'Tab'
  const TABS = [
    {text: '店铺', path: '/shop', id: 1, iconClass: 'icon-shop'},
    {text: 'BOSS雷达', path: '/radar', id: 2, iconClass: 'icon-radar'},
    {text: '我的', path: '/mine', id: 3, iconClass: 'icon-mine'}
  ]
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tabList: TABS,
        tabClass: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .tab
    position: fixed
    bottom: 0
    width: 100vw
    height: $tab-height
    background: #fff
    display: flex
    .tab-item
      flex: 1
      overflow: hidden
      height: $tab-height
      .item-container
        overflow: hidden
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        font-size: 0
        .icon
          display: block
          width: 27px
          height: 27px
          margin-bottom: 3px
          background-size: 27px 27px
          &.icon-radar
            bg-image('./icon-radar')
          &.icon-shop
            bg-image('./icon-shop')
          &.icon-mine
            bg-image('./icon-my')
        .icon-text
          font-family: $font-family-light
          font-size: 10px
          color: #C8C8C8
      &.router-link-active .item-container
        .icon-radar
          bg-image('./icon-radar_press')
        .icon-shop
          bg-image('./icon-shop_press')
        .icon-mine
          bg-image('./icon-my_press')
        .icon-text
          color: #27273E
</style>
