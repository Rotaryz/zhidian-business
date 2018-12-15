<template>
  <div class="s-header">
    <router-link tag="div" class="msg" to="/shop/account-detail">
      <div class="logo" v-if="shopInfo.logo && shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
      <img class="logo" src="./pic-default_people@2x.png" v-else/>
      <div class="msg-box">
        <div class="title">{{shopInfo.name || '店铺名称'}}</div>
        <div class="use-time">
          <span class="time">使用期限:{{(userInfo.merchant && userInfo.merchant.expire_time) | formatTime}}</span>
          <span class="big-box" @click.stop="showExpire" v-if="userInfo.merchant && userInfo.merchant.expired">
            <span class="red-box">续费</span>
          </span>
        </div>
      </div>
      <div class="right-arrow"></div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDateTime} from 'common/js/utils'
  export default {
    name: 's-header',
    props: {
      shopInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
      }
    },
    methods: {
      showExpire() {
        this.$emit('showExpire')
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
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .s-header
    height: 147px
    bg-image(bg-my)
    background-size: 100% 100%
    position: relative
    padding: 15px
    box-sizing: border-box
    .msg
      layout(row)
      align-items: center
      .logo
        width: 15vw
        height: @width
        margin-right: 12px
        border-radius: 50%
      .msg-box
        flex: 1
        .title
          font-family: $font-family-medium
          font-size: $font-size-16
          color: $color-white
          letter-spacing: 0.8px
          text-align: justify
          word-break: break-all
          margin-bottom: 10px
        .use-time
          display: flex
          align-items: center
          .time
            font-size: $font-size-14
            color: $color-white
            font-family: $font-family-regular
            opacity: 0.7
          .big-box
            padding: 5px
            .red-box
              width: 36px
              height: 18px
              line-height: 18px
              text-align: center
              border-1px($color-white)
              font-size: $font-size-12
              font-family: $font-family-medium
              color: $color-white
              display: block
      .right-arrow
        width: 7px
        height: 12px
        icon-image(icon-press_right)

</style>
