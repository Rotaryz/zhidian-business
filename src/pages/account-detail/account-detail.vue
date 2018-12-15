<template>
  <div class="account-detail">
    <div class="list border-bottom-1px">
      <div class="item border-bottom-1px">
        <span class="label">姓名</span>
        <div class="name">{{nickname}}</div>
      </div>
      <div class="item">
        <span class="label">手机号</span>
        <div class="phone">{{mobile}}</div>
      </div>
    </div>
    <div class="btn" @click="logOff">退出登录</div>
    <confirm ref="confirm" @confirm="exitApp"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Confirm from 'components/confirm-msg/confirm-msg'
  import { Mine } from 'api'
  export default {
    data() {
      return {
        nickname: '',
        mobile: ''
      }
    },
    created() {
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        Mine.getUserInfo(false)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.nickname = res.data.nickname
            this.mobile = res.data.mobile
          })
      },
      logOff() {
        this.$refs.confirm.show({msg: '确定要退出吗？'})
      },
      exitApp() {
        this.$storage.remove('token')
        this.$router.replace('/login')
      }
    },
    computed: {
    },
    components: {
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .account-detail
    fill-box()
    z-index: 20
    background: $color-F6F6F6
    .list
      padding-left: 12px
      background: $color-white
      .item
        height: 55px
        display: flex
        align-items: center
        color: $color-27273E
        font-size: 14px
        font-family: $font-family-regular
        .label
          width: 100px
          color: #706B82
        .name
          flex: 1
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
    .btn
      margin: 30px 12px
      height: 44px
      line-height: 44px
      text-align: center
      font-size: $font-size-16
      font-family: $font-family-regular
      color: $color-white
      border-radius: 4px
      background: $color-27273E
</style>
