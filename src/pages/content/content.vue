<template>
  <div class="content">
    <div class="scroll-wrapper">
      <scroll bcColor="#f6f6f6" ref="scroll" :data="details">
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
          <div style="height: 10px"></div>
          <ul class="detail-wrapper">
            <li class="item-wrapper" @click="closeAllAddBox">
              <section class="add-btn" @click.stop="isShow = !isShow">
                <transition name="fade">
                  <nav class="add-control-wrapper" v-show="isShow">
                    <label class="add-btn text" @click="addText('nothing')">
                    </label>
                    <label class="add-btn video">
                      <input type="file" style="display: none" @change="_fileChange($event, 'video', 'nothing')"
                             accept="video/*">
                    </label>
                    <label class="add-btn image">
                      <input type="file" style="display: none" @change="_fileChange($event, 'image', 'nothing')"
                             accept="image/*">
                    </label>
                  </nav>
                </transition>
              </section>
            </li>
            <li class="item-wrapper" v-if="details.length" v-for="(item,index) in details" :key="index" @click="closeAllAddBox">
              <section class="content-wrapper">
                <div class="content-container" :class="+item.type !== 1 ? 'media':''" @click="+item.type === 1?addText(index, item, 'un-add'):''">
                  <div class="box text" v-if="+item.type === 1">{{item.text}}</div>
                  <div class="box img" v-if="+item.type === 0">
                    <img class="img-style" v-if="item.image_url" :src="item.image_url" alt="">
                    <label class="video-mask">
                      <input type="file" style="display: none" @change="_fileChange($event, 'image', item)"
                             accept="image/*">
                    </label>
                  </div>
                  <div class="box video" v-if="+item.type === 2">
                    <img class="img-style" v-if="item.video_url" :src="item.video_url" alt="">
                    <label class="video-mask">
                      <div class="icon-btn play"/>
                      <input type="file" style="display: none" @change="_fileChange($event, 'video', item)"
                             accept="video/*">
                    </label>
                  </div>
                </div>
                <div class="btn del" @click.stop="delHandle(index)"></div>
                <div class="btn up" v-if="index !== 0" @click.stop="upHandle(index)"></div>
                <div class="btn down" v-if="index !== details.length - 1" @click.stop="downHandle(index)"></div>
              </section>
              <section class="add-btn" @click.stop="addHandle(item)">
                <transition name="fade">
                  <nav class="add-control-wrapper" v-show="item.isShow">
                    <label class="add-btn text" @click="addText(index, {text: ''}, 'add')">
                    </label>
                    <label class="add-btn video">
                      <input type="file" style="display: none" @change="_fileChange($event, 'video', index)"
                             accept="video/*">
                    </label>
                    <label class="add-btn image">
                      <input type="file" style="display: none" @change="_fileChange($event, 'image', index)"
                             accept="image/*">
                    </label>
                  </nav>
                </transition>
              </section>
            </li>
          </ul>
          <div style="height: 20px;"></div>
        </div>
      </scroll>
    </div>
    <footer class="btn-wrapper border-top-1px">
      <div class="btn" :class="saveBtnStyle" @click="saveBtn">发布</div>
    </footer>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Upload } from 'api'
  import { mapActions, mapGetters } from 'vuex'

  const test = [
    {
      id: 1,
      type: 0,
      text: '',
      image_url: 'http://t2.hddhhn.com/uploads/tu/201610/198/51wgjnwngl1.jpg',
      video_url: '',
      isShow: false
    },
    {
      id: 2,
      type: 1,
      text: '安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快安徽省大家卡刷点卡的哈萨克的啊速度加快啥的卡仕达看见啥的卡很大空间啊十大科技哈师大看啥德哈卡记得哈速度快',
      image_url: '',
      video_url: '',
      isShow: false
    },
    {
      id: 3,
      type: 2,
      text: '',
      image_url: '',
      video_url: 'http://t2.hddhhn.com/uploads/tu/201610/198/51wgjnwngl1.jpg',
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
          details: []
        },
        details: test,
        isShow: false
      }
    },
    beforeDestroy() {
    },
    methods: {
      ...mapActions([
        'updateContentText'
      ]),
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      refresh() {
        this._actionAddText()
      },
      _fileChange(e, flag, item) {
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
        if (flag === 'video') {
          this.$loading.show('视频上传中...')
          this.$vod.uploadFiles(arr[0]).then(res => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this._addVideo(item, res.data)
          })
        }
        if (flag === 'image') {
          this.$loading.show('图片上传中...')
          let file = new FormData()
          file.append('file', arr[0], arr[0].name)
          Upload.upLoadImage(file).then(res => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              return this.$toast.show(res.message)
            }
            let obj = {
              image_id: res.data.id,
              url: res.data.url,
              id: res.data.id
            }
            this._addImage(item, obj)
          })
        }
      },
      closeAllAddBox() {
        this.info.details.forEach(item => {
          item.isShow = false
        })
      },
      addHandle(item) {
        item.isShow = !item.isShow
      },
      delHandle(index) {
        this.details.splice(index, 1)
      },
      upHandle(index) {
        let arr = this.details
        let changeIndex = index - 1
        arr[index] = arr.splice(changeIndex, 1, arr[index])[0]
        this.details = arr
      },
      downHandle(index) {
        let arr = this.details
        let changeIndex = index + 1
        arr[index] = arr.splice(changeIndex, 1, arr[index])[0]
        this.details = arr
      },
      addText(index, item, actionType) {
        let obj = {}
        if (index === 'nothing') {
          obj = {txt: '', index, actionType}
          this.isShow = true
        } else {
          obj = {txt: item.text, index, actionType}
          item.isShow = false
          console.log(item)
        }
        this.updateContentText(obj)
        this.$router.push(this.$route.path + '/content-text')
      },
      _actionAddText() {
        const {index, txt, actionType} = this.contentText
        let newObj = {
          type: 1,
          text: txt,
          image_url: '',
          video_url: '',
          isShow: false
        }
        if (index === 'nothing') {
          this.details.unshift(newObj)
        } else if (actionType === 'add') {
          this.details.splice(index + 1, 0, newObj)
        } else {
          this.details.splice(index, 1, newObj)
        }
      },
      _addImage(item, obj) {
        if (typeof item === 'number' || item === 'nothing') {
          let newObj = {
            id: 0,
            type: 0,
            text: '',
            image_url: 'http://t2.hddhhn.com/uploads/tu/201610/198/51wgjnwngl1.jpg',
            video_url: '',
            isShow: false
          }
          newObj.image_url = obj.url
          newObj.id = obj.id
          if (typeof item === 'number') {
            this.details[item].isShow = false
            this.details.splice(item + 1, 0, newObj)
          } else if (item === 'nothing') {
            this.isShow = false
            this.details.unshift(newObj)
          }
        } else {
          item.image_url = obj.url
        }
      },
      _addVideo(item, obj) {
        if (typeof item === 'number' || item === 'nothing') {
          let newObj = {
            id: 0,
            type: 2,
            text: '',
            image_url: 'http://t2.hddhhn.com/uploads/tu/201610/198/51wgjnwngl1.jpg',
            video_url: '',
            isShow: false
          }
          newObj.video_url = obj.url
          newObj.id = obj.id
          if (typeof item === 'number') {
            this.details[item].isShow = false
            this.details.splice(item + 1, 0, newObj)
          } else if (item === 'nothing') {
            this.isShow = false
            this.details.unshift(newObj)
          }
        } else {
          item.video_url = obj.url
        }
      },
      saveBtn() {
        this.info.details = this.details
        this._checkForm()
      },
      _checkForm() {
        let arr = [
          {value: this.videoReg, txt: '请上传主视频'},
          {value: this.titleReg, txt: '请输入主标题'},
          {value: this.detailsReg, txt: '请添加故事内容'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this.$toast.show('发布成功')
          this.$router.back()
        }
      },
      _testPropety(arr) {
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'contentText'
      ]),
      titleReg() {
        return this.info.title
      },
      videoReg() {
        return this.info.video_url
      },
      detailsReg() {
        return this.details.length > 0
      },
      saveBtnStyle() {
        let btnClass = ''
        if (this.titleReg && this.videoReg && this.detailsReg) {
          btnClass = 'active'
        }
        return btnClass
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
        opacity: 0.5
        &.active
          opacity: 1
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
        .add-btn
          display: block
          margin: 10px 0 15px
          width: 24px
          height: @width
          icon-image(icon-add_nr)
          position: relative
          z-index: 2
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
              &.text
                icon-image(icon-text)
              &.image
                icon-image(icon-picadd)
              &.video
                icon-image(icon-videoadd)
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
            &.media
              padding: 0
            .box
              font-size: 14px;
              color: #363547;
              text-align: justify;
              word-break: break-all
              line-height: 1.2
              position: relative
              .img-style
                width: 100%
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
