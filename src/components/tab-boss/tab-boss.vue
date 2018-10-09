<template>
  <div class="tab border-bottom-1px" v-if="showTab">
    <router-link tag="div" class="tab-item" v-for="(item,index) in tabList" :to="item.path" :key="index">
      <div class="item-container">
        <section class="line-wrapper">
          <div class="line"></div>
        </section>
        <p class="icon-text">{{item.text}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'TAB_BOSS'
  const TABS = [
    {text: '总览', path: '/radar/overview', id: 1},
    {text: '排行榜', path: '/radar/ranking', id: 2},
    {text: 'AI分析', path: '/radar/ai-analyse', id: 3}
  ]
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tabList: TABS,
        showTab: true
      }
    }
    // watch: {
    //   '$route'(to) {
    //     let path = to.path
    //     if (path === '/radar/overview' || path === '/radar/ranking' || path === '/radar/ai-analyse') {
    //       this.showTab = true
    //     } else {
    //       this.showTab = false
    //     }
    //   }
    // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .tab
    position: fixed
    top: 0
    width: 100vw
    height: $tab-boss-height
    background: $color-363547
    display: flex
    .tab-item
      position: relative
      flex: 1
      overflow: hidden
      height: 100%
      .item-container
        position: relative
        overflow: hidden
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        font-size: 0
        .icon
          position: relative
          width: 20px
          height: 20px
          margin-bottom: 3px
        .icon-text
          position: relative
          font-family: $font-family-regular
          font-size: 16px
          color: #fff
        .line-wrapper
          position: absolute
          left: 0
          right: 0
          bottom: 0
          top: 0
          display: flex
          justify-content: center
          align-items: center
          opacity :0
          transition: all .6s
          .line
            width: 85px
            height: 32px
            background-color: $color-EF705D
            border-radius: 100px
      &.router-link-active
        .line-wrapper
          opacity :1
</style>
