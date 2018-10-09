<template>
  <div class="invitation">
    <article class="top">
      <div class="title">欢迎加入国颐堂养发馆</div>
      <div class="qr-code">
        <img class="qr-img" src="./qr-code.svg" alt="">
      </div>
      <div class="explain">微信扫一扫，或长按识别二维码</div>
    </article>
    <ul class="btn-group">
      <li class="btn-item">
        <div class="icon save"></div>
        <div class="txt">保存</div>
      </li>
      <li class="btn-item">
        <div class="icon copy"></div>
        <div class="txt">复制链接</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .invitation
    fill-box()
    z-index: 71
    background: #fff
    padding: 30px 35px 0
    .top
      background: $color-363537
      border-radius: 4px
      .title
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.6px;
        text-align: center;
        padding-top: 65.5px
      .qr-code
        width: 60vw
        height: @width
        background: #FFFFFF;
        border: 1px solid rgba(130, 138, 162, 0.20);
        border-radius: 6px;
        margin: 50px auto 12px
        .qr-img
          width: 100%
          height: 100%
      .explain
        font-size: 12px;
        color: #9B9B9B;
        text-align: center;
        padding-bottom: 69.5px

    .btn-group
      margin-top :40px
      layout(row)
      justify-content: space-around
      .btn-item
        text-align: center
        .icon
          display: inline-block
          width: 30px
          height: @width
          margin-bottom: 8.35px
          &.save
            icon-image(icon-savepic)
          &.copy
            icon-image(pic-link)
        .txt
          font-size: 14px;
          color: #706B82;
          text-align: center;
</style>
