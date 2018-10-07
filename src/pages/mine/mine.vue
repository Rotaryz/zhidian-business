<template>
  <div class="mine">
    <div class="bg"></div>
    <section class="header">
      <div class="logo"></div>
      <div class="title">国颐堂(白云店)</div>
      <div class="qr-code"></div>
      <div class="right-arrow"></div>
    </section>
    <ul class="option-wrapper">
      <li class="option-item border-bottom-1px" v-for="(item,index) in optionsArr" :key="index" @click="navTo(item)">
        <div class="logo" :class="item.logo"></div>
        <div class="title">{{item.title}}</div>
        <div class="right-arrow"></div>
      </li>
    </ul>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  const optionsArr = [
    {
      logo: 'shop',
      title: '门店信息',
      path: ''
    },
    {
      logo: 'staff',
      title: '店员管理',
      path: '/employee-manage'
    },
    {
      logo: 'exit',
      title: '退出登录',
      path: ''
    }
  ]
  export default {
    data() {
      return {
        optionsArr
      }
    },
    created() {
      console.log(window.location.replace)
    },
    methods: {
      refresh() {
        // todo
        console.log(2123)
      },
      test() {
        this.$storage.clear()
        this.$login.show()
      },
      navTo(item) {
        if (item.logo === 'exit') {
          this.$storage.clear()
          this.$login.show()
          return
        }
        this.$router.push(this.$route.path + item.path)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .mine
    fill-box()
    bottom: $tab-height
    padding: 0 15px
    .bg
      position: absolute
      left: 0
      top: 0
      right: 0
      height: 26.66vw
      icon-image(bg-my)
    .header
      margin-top: 8vw
      height: 24vw
      border-1px($color-E6E6E6)
      background: #fff
      layout(row)
      align-items: center
      .logo
        width: 17vw
        height: @width
        background: #ccc
        margin-left: 12.9px
      .title
        flex: 1
        padding: 0 6px
        font-family: PingFangSC-Regular
        font-size: 18px
        color: #363547
        letter-spacing: 0.8px
        text-align :justify
        word-break :break-all
      .qr-code
        width: 20px
        height: 20px
        icon-image(icon-shopcode)
      .right-arrow
        width: 7px
        height: 12px
        icon-image(icon-press_right)
        margin: 0 15px 0 12px
    .option-wrapper
      border-1px($color-E6E6E6)
      background: #fff
      padding-left :15px
      margin-top :11px
      .option-item
        height :55px
        layout(row)
        align-items :center
        &:last-child:after
          display :none
        .logo
          width :20px
          height :20px
          &.shop
            icon-image(icon-info)
          &.staff
            icon-image(icon-clerk)
          &.exit
            icon-image(icon-sp_signout)
        .title
          flex: 1
          padding :0 8px
          font-family: PingFangSC-Regular
          font-size: 16px
          color: #363547
        .right-arrow
          width: 7px
          height: 12px
          icon-image(icon-press_right)
          margin: 0 15px 0 12px
</style>
