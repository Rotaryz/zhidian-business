<template>
  <div class="mine">
    <div class="bg"></div>
    <section class="header" @click="navTo({path: '/shop-qr-code'})">
      <div class="logo" v-if="shopInfo.logo" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
      <div class="logo" v-else></div>
      <div class="title">{{shopInfo.name || '店铺名称'}}</div>
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
    <modal ref="confirm" @confirm="exitApp"></modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from 'components/confirm-msg/confirm-msg'
  import { Mine } from 'api'

  const optionsArr = [
    {
      logo: 'shop',
      title: '门店信息',
      path: '/shop-info'
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
    name: 'MINE',
    components: {
      Modal
    },
    data() {
      return {
        optionsArr,
        shopInfo: {}
      }
    },
    created() {
      this._getShopInfo()
    },
    methods: {
      refresh() {
        this._getShopInfo()
      },
      _getShopInfo() {
        Mine.getShopInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          res.data.video = res.data.video ? res.data.video : {}
          res.data.logo = res.data.logo ? res.data.logo : {}
          this.shopInfo = res.data
        })
      },
      navTo(item) {
        if (item.logo === 'exit') {
          this.$refs.confirm.show({msg: '确定要退出吗？'})
          return
        }
        this.$router.push(this.$route.path + item.path)
      },
      exitApp() {
        this.$storage.clear()
        this.$login.show()
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
        text-align: justify
        word-break: break-all
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
      padding-left: 15px
      margin-top: 11px
      .option-item
        height: 55px
        layout(row)
        align-items: center
        &:last-child:after
          display: none
        .logo
          width: 20px
          height: 20px
          &.shop
            icon-image(icon-info)
          &.staff
            icon-image(icon-clerk)
          &.exit
            icon-image(icon-sp_signout)
        .title
          flex: 1
          padding: 0 8px
          font-family: PingFangSC-Regular
          font-size: 16px
          color: #363547
        .right-arrow
          width: 7px
          height: 12px
          icon-image(icon-press_right)
          margin: 0 15px 0 12px
</style>
