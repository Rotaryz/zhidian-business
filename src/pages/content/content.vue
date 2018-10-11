<template>
  <div class="content">
    <div class="scroll-wrapper">
      <scroll bcColor="#f6f6f6">
        <div>
          <article class="header-video">
            <label class="video-mask">
              <div class="icon-btn add" v-if="!info.video_url"/>
              <div class="add-txt" v-if="!info.video_url">上传视频</div>
              <div class="icon-btn play" v-else/>
              <input type="file" style="display: none" @change="_fileChange($event, 'header-video')"
                     accept="video/*">
            </label>
          </article>
          <article class="header-title">
            <input class="input-container" type="text" maxlength="20" placeholder="点击设置主标题" v-model="info.title">
            <div class="input-number">{{info.title.length}}/20</div>
          </article>
          <ul class="detail-wrapper">
            <li></li>
          </ul>
        </div>
      </scroll>
    </div>
    <footer class="btn-wrapper border-top-1px">
      <div class="btn">发布</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        info: {
          title: '',
          video_url: ''
        }
      }
    },
    methods: {
      _fileChange(e, flag) {
        let arr = Array.from(e.target.files)
        if (flag === 'header-video') {
          this.$loading.show('视频上传中...')
          this.$vod.uploadFiles(arr[0]).then(res => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.info.video_url = res.data.url
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $btn-height = 70px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  input
    height: 24px
    line-height: @height
    &::-webkit-input-placeholder
      font-family: PingFangSC-Medium;
      color: $color-CCCCCC
    &::-ms-input-placeholder
      font-family: PingFangSC-Medium;
      color: $color-CCCCCC
    &::-moz-placeholder
      font-family: PingFangSC-Medium;
      color: $color-CCCCCC

  .content
    fill-box()
    z-index: 50
    background: $color-F6F6F6
    .btn-wrapper
      position: fixed
      height: $btn-height
      left: 0
      right: 0
      bottom: 0
      background: #fff
      padding: 0 15px
      text-align: center
      line-height: $btn-height
      .btn
        display: inline-block
        background: #363547;
        border-radius: 4px;
        width: 100%
        height: 45px
        line-height: @height
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.8px;
        text-align: center;
    .scroll-wrapper
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: $btn-height
      .header-video
        height: 56.26vw
        background: #363547;
        position: relative
        .video-mask
          display :block
          fill-box(absolute)
          background: transparent
          z-index: 1
          layout()
          justify-content: center
          align-items: center
          .icon-btn
            width: 13.33vw
            height: @width
            border-radius: 50%
            &.play
              icon-image(icon-video2)
            &.add
              icon-image(icon-video1)
          .add-txt
            margin-top: 2.13vw
            font-size: 3.73vw
            color: #FFFFFF
            letter-spacing: 0.6px
      .header-title
        height: 45px
        layout(row, block, nowrap)
        align-items: center
        background: #fff
        padding: 0 15px
        .input-number
          font-size: 12px;
          color: #CCCCCC;
        .input-container
          flex: 1
          padding-right: 10px
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #363547;
</style>
