<template>
  <div class="content">
    <div class="scroll-wrapper">
      <scroll bcColor="#f6f6f6" ref="scroll" :data="details">
        <div>
          <article class="header-video">
            <div class="img-style" v-if="info.cover_image" :style="{backgroundImage: 'url(' + info.cover_image + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
            <label class="video-mask">
              <div class="icon-btn add" v-if="!info.video_url"></div>
              <div class="add-txt" v-if="!info.video_url">上传视频</div>
              <div class="icon-btn play" v-else></div>
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
                      <base-wx-input style="display: none" @change="_fileChange($event, 'image', 'nothing')"
                                    accept="image/*"></base-wx-input>
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
                    <!--<img class="img-style" v-if="item.image_url" :src="item.image_url" alt="">-->
                    <div class="img-style" v-if="item.image_url" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                    <label class="video-mask">
                      <base-wx-input style="display: none" @change="_fileChange($event, 'image', item)"
                                     accept="image/*"></base-wx-input>
                    </label>
                  </div>
                  <div class="box video" v-if="+item.type === 2">
                    <img class="img-style" v-if="item.cover_image" :src="item.cover_image" alt="">
                    <label class="video-mask">
                      <div class="icon-btn play"/>
                      <input type="file" style="display: none" @change="_fileChange($event, 'video', item)"
                                     accept="video/*">
                    </label>
                  </div>
                </div>
                <div class="btn del" @click.stop="delHandle(index, item)"></div>
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
                      <base-wx-input style="display: none" @change="_fileChange($event, 'image', index)"
                                    accept="image/*"></base-wx-input>
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
    <confirm-msg ref="confirm" @confirm="_deleteContentItem"></confirm-msg>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { Content } from 'api'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      Scroll,
      ConfirmMsg
    },
    data() {
      return {
        info: {
          id: 0,
          title: '',
          video_url: '',
          video_id: 0,
          cover_image: '',
          details: []
        },
        details: [],
        isShow: false,
        delObject: {},
        delArr: [] // 待删除的
      }
    },
    created() {
      this._getContent()
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
      _getContent() {
        Content.getContent().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          let arr = []
          res.data.details.forEach(item => {
            item.isShow = false
            arr.push(item)
          })
          Object.assign(this.info, res.data)
          this.details = this.info.details
        })
      },
      _updateContent() {
        Content.updateContent(this.info).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$loading.hide()
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('发布成功')
          this.$router.back()
        })
      },
      _deleteContentItem() {
        let id = this.delObject.item.id
        let index = this.delObject.index
        if (id) {
          this.delArr.push(id)
        }
        this.details.splice(index, 1)
        this.delObject = {}
      },
      _actionDel(callback) {
        if (this.delArr.length) {
          Content.deleteContentItem({detail_ids: this.delArr}).then(res => {
            if (this.$ERR_OK !== res.error) {
              this.$toast.show(res.message)
              return
            }
            callback && callback()
          })
        } else {
          callback && callback()
        }
      },
      _fileChange(e, flag, item) {
        let arr = Array.from(e.target.files)
        if (arr.length < 1) return
        if (flag === 'header-video') {
          this.$loading.show('视频上传中...')
          this.$vod.uploadFiles(arr[0], (curr) => {
            this.$loading.showCurr(curr)
          }).then(res => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.info.video_url = res.data.url
            this.info.video_id = res.data.file_id
            this.info.cover_image = res.data.url
          })
        }
        if (flag === 'video') {
          this.$loading.show('视频上传中...')
          this.$vod.uploadFiles(arr[0], curr => {
            this.$loading.showCurr(curr)
          }).then(res => {
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
          this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then(resArr => {
            this.$loading.hide()
            let res = resArr[0]
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
      delHandle(index, item) {
        this.delObject = {index, item}
        this.$refs.confirm.show()
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
          obj = {txt: '', index, actionType, id: 0}
          this.isShow = true
        } else {
          obj = {txt: item.text, index, actionType, id: item.id}
          item.isShow = false
        }
        this.updateContentText(obj)
        this.$router.push(this.$route.path + '/content-text')
      },
      _actionAddText() {
        const {index, txt, actionType, id} = this.contentText
        let newObj = {
          id: id,
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
            image_url: '',
            image_id: obj.id,
            isShow: false
          }
          newObj.image_url = obj.url
          if (typeof item === 'number') {
            this.details[item].isShow = false
            this.details.splice(item + 1, 0, newObj)
          } else if (item === 'nothing') {
            this.isShow = false
            this.details.unshift(newObj)
          }
        } else {
          item.image_url = obj.url
          item.image_id = obj.id
        }
      },
      _addVideo(item, obj) {
        obj.id = obj.file_id
        if (typeof item === 'number' || item === 'nothing') {
          let newObj = {
            id: 0,
            type: 2,
            video_url: '',
            video_id: obj.id,
            cover_image: '',
            isShow: false
          }
          newObj.video_url = obj.url
          if (typeof item === 'number') {
            this.details[item].isShow = false
            this.details.splice(item + 1, 0, newObj)
          } else if (item === 'nothing') {
            this.isShow = false
            this.details.unshift(newObj)
          }
        } else {
          item.video_url = obj.url
          item.video_id = obj.id
          item.cover_image = obj.url
        }
      },
      saveBtn() {
        let arr = []
        this.details.forEach((item, index) => {
          item.sort = index
          arr.push(item)
        })
        this.info.details = arr
        this._checkForm()
      },
      _checkForm() {
        let arr = [
          // {value: this.videoReg, txt: '请上传主视频'},
          {value: this.titleReg, txt: '请输入主标题'},
          {value: this.detailsReg, txt: '请添加故事内容'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._actionDel(() => {
            this._updateContent()
          })
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
        .img-style
          width: 100%
          height: 100%
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
            box-sizing: border-box
            background-color: #f3f3f3
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
              height: 90px
              overflow: hidden
              white-space: pre
              .img-style
                width: 100%
                height: 100%
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
