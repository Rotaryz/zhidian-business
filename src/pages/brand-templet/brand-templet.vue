<template>
  <div class="brand-templet">
    <div class="templet-list">
      <div class="left">
        <p class="title">国颐堂品牌-总店模板</p>
        <p class="time">2018-12-12</p>
      </div>
      <div class="right">一键导入</div>
    </div>
    <div class="null">
      <p class="txt">你还没有保存模板信息</p>
      <div class="btn" @click="showConfirm">一键生成模板</div>
    </div>
    <confirm ref="confirm" @confirm="exitApp"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Confirm from 'components/confirm-msg/confirm-msg'
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      showConfirm() {
        this.$refs.confirm.show({msg: '确定一键导入？'})
      }
    },
    components: {
    },
    computed: {
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .brand-templet
    fill-box()
    z-index: 20
    background: $color-F6F6F6
    .templet-list
      margin: 15px 15px
      background: $color-white
      border-radius: 4px
      height: 80px
      box-sizing: border-box
      padding: 18px 15px
      display: flex
      align-items: center
      justify-content: space-between
      .title
        font-size: $font-size-16
        color: #4A4657
      .time
        color: #9B9B9B
        font-size: 14px
        margin-top: 13px
      .right
        width: 72px
        height: 28px
        font-size: $font-size-14
        line-height: 28px
        text-align: center
        color: $color-D32F2F
        border-1px($color-D32F2F, 30px)
        border-radius: 30px
    .null
      margin-top: 40px
      font-size: $font-size-16
      color: #4A4657
      text-align: center
      .btn
        width: 110px
        height: 28px
        font-size: $font-size-14
        line-height: 28px
        text-align: center
        color: $color-D32F2F
        border-1px($color-D32F2F, 30px)
        border-radius: 30px
        margin: 18px auto
</style>
