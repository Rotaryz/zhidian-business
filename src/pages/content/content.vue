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
            <li class="item-wrapper" v-if="!info.details.length">
              <div class="add-btn" @click="addHandle"></div>
            </li>
            <li class="item-wrapper" v-else v-for="(item,index) in info.details" :key="index">
              <section class="add-btn" @click="addHandle(item)">
                <transition name="fade">
                  <ul class="add-control-wrapper" v-show="item.isShow">
                    <li class="add-btn text" @click="addText"></li>
                    <li class="add-btn video" @click="addVideo"></li>
                    <li class="add-btn image" @click="addImage"></li>
                  </ul>
                </transition>
              </section>
              <section class="content-wrapper">
                <div class="content-container">
                  <div class="box text" v-if="+item.type === 1">{{item.text}}</div>
                  <div class="box img" v-if="+item.type === 0"></div>
                  <div class="box video" v-if="+item.type === 2"></div>
                </div>
                <div class="btn del" @click="delHandle(item)"></div>
                <div class="btn up" v-if="index !== 0" @click="upHandle(item)"></div>
                <div class="btn down" v-if="index !== info.details.length - 1" @click="downHandle(item)"></div>
              </section>
            </li>
          </ul>
          <div style="height: 20px;"></div>
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

  const test = [
    {
      type: 0,
      text: '',
      image_url: '',
      video_url: '',
      isShow: false
    },
    {
      type: 1,
      text: '安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快',
      image_url: '',
      video_url: '',
      isShow: false
    },
    {
      type: 2,
      text: '',
      image_url: '',
      video_url: '',
      isShow: false
    }
  ]
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        info: {
          title: '',
          video_url: '',
          details: test
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
      },
      addHandle(item) {
        item.isShow = !item.isShow
      },
      delHandle(item) {
        console.log(0)
      },
      upHandle(item) {
        console.log(1)
      },
      downHandle(item) {
        console.log(2)
      },
      addText(item) {
        console.log('text')
      },
      addImage(item) {
        console.log('image')
      },
      addVideo(item) {
        console.log('video')
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
          display: block
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
      .item-wrapper
        padding: 0 15px
        layout()
        align-items: center
        z-index: 2
        .add-btn
          margin: 10px 0 15px
          width: 24px
          height: @width
          icon-image(icon-add_nr)
          position: relative
          .add-control-wrapper
            row-center()
            height: 55.5px
            width: 196px
            icon-image(pic-adddo)
            top: -51px
            layout(row)
            align-items: center
            justify-content: space-around
            box-sizing: border-box
            padding: 0px 15px 5px
            .add-btn
              width: 25px
              height: 19px
              background: #ccc
        .content-wrapper
          min-height: 120px
          width: 100%
          box-sizing: border-box
          padding: 15px 20px
          background: #fff
          border-radius: 4px;
          border-1px($color-E6E6E6, 4px)
          .content-container
            padding: 7px 10px
            min-height: 90px
            box-sizing: border-box
            background-color: $color-E6E6E6
            border-radius: 2px
            position: relative
            .box
              font-size: 14px;
              color: #363547;
              text-align: justify;
              word-break: break-all
              line-height: 1.2
          .btn
            width: 10px
            height: @width
            extend-click()
            position: absolute
            &.del
              top: 6.5px
              left: 6.5px
              icon-image(icon-delete_nr)
            &.up
              top: 6.5px
              right: 6.5px
              icon-image(icon-moveup)
            &.down
              bottom: 6.5px
              right: 6.5px
              icon-image(icon-movedown)

</style>
