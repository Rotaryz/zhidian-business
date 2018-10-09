<template>
  <div class="shop-qr-code">
    <section class="bg">
      <div class="wrapper">
        <section class="content">
          <div class="avatar"></div>
          <div class="title">国颐堂(白云店)</div>
          <div class="qr-code"></div>
          <div class="explain">
            <div class="e-c">长按识别二维码进店逛逛</div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .shop-qr-code
    fill-box()
    z-index: 50
    background: $color-363537
    .bg
      margin: 60px 35px
      background: #DAD7E4
      border-radius: 4px
      padding :16px 13px
      .wrapper
        background: #FFFFFF
        box-shadow: 0 4px 14px 0 rgba(54, 53, 71, 0.30)
        border-radius: 4px
        padding: 13.5px 11.3px 23.6px
        .content
          border: 1px solid rgba(112, 107, 130, 0.2)
          position: relative
          .avatar
            border-radius: 2px
            width: 50px
            height: @width
            background :rgba(164, 155, 200, 0.20)
            margin 31.5px auto 20px
          .title
            font-family: PingFangSC-Medium
            font-size: 20px
            color: #706B82
            letter-spacing: 1px
            text-align: center
            line-height: 1.2
          .qr-code
            width: 130px
            height: @width
            background: #FFFFFF
            border: 13px solid rgba(164, 155, 200, 0.20)
            border-radius: 50%
            margin : 80px auto 40px
          .explain
            position: absolute
            bottom: -6px
            left: 0
            right: 0
            .e-c
              width: 150px
              margin: 0 auto
              background: #fff
              text-align: center
              opacity: 0.8
              font-family: PingFangSC-Regular
              font-size: 12px
              color: #706B82
              letter-spacing: 0
</style>
