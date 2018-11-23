<template>
  <div class="mine">
    <div class="bg"></div>
    <router-link tag="div" class="header" to="/shop-qr-code">
      <div class="logo" v-if="shopInfo.logo && shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
      <img class="logo" src="./pic-default_people@2x.png" v-else/>
      <div class="msg-box">
        <div class="title">{{shopInfo.name || '店铺名称'}}</div>
        <div class="use-time">
          <span class="time">使用期限:{{userInfo.merchant.expire_time | formatTime}}</span>
          <span class="big-box" @click.stop="showExpire" v-if="userInfo.merchant && userInfo.merchant.expired">
            <span class="red-box">续费</span>
          </span>
        </div>
      </div>
      <div class="qr-code"></div>
      <div class="right-arrow"></div>
    </router-link>
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
  import {formatDateTime} from 'common/js/utils'

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
      showExpire() {
        this.$emit('showExpire')
      },
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
        this.$router.replace('/login')
      }
    },
    computed: {
      userInfo() {
        return this.$storage.get('info')
      }
    },
    filters: {
      formatTime(val) {
        if (!val) return ''
        return formatDateTime(val * 1000, '-')
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
        margin-left: 12.9px
      .msg-box
        flex: 1
        padding: 0 6px
        .title
          font-family: PingFangSC-Regular
          font-size: $font-size-16
          color: #363547
          letter-spacing: 0.8px
          text-align: justify
          word-break: break-all
          margin-bottom: 10px
        .use-time
          display: flex
          align-items: center
          .time
            font-size: $font-size-14
            color: $color-9B9B9B
            font-family: $font-family-regular
          .big-box
            padding: 5px
          .red-box
            width: 36px
            height: 18px
            line-height: 18px
            text-align: center
            border-1px($color-EF705D)
            font-size: $font-size-12
            font-family: $font-family-medium
            color: $color-EF705D
            display: block
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
