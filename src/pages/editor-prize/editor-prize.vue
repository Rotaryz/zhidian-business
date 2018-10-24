<template>
  <div class="editor-prize">
    <scroll :bcColor="'#ffffff'" ref="scroll">
      <div class="container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">奖品名称</div>
          <div class="item-right between">
            <input type="text" class="input-box" v-model="prizeDetail.title" placeholder="请输入" maxlength="10">
            <div class="count-box">{{prizeDetail.title.length}}/10</div>
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">券有效期</div>
          <div class="item-right time-right">
            <div class="time-right-first" @click="chioseTime('use1')">
              <div class="time-none" v-if="!prizeDetail.start_at">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" :class="type === 'editor' ? 'disabled' : ''" v-if="prizeDetail.start_at">{{prizeDetail.start_at}}</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first" @click="chioseTime('use2')">
              <div class="time-none" v-if="!prizeDetail.end_at">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="prizeDetail.end_at">{{prizeDetail.end_at}}</div>
            </div>
          </div>
        </div>
        <div class="editor-img-item border-bottom-1px">
          <div class="item-title">兑换券图片</div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="!prizeDetail.image_url"></div>
                <input type="file" class="img-bc image-file" @change="_fileImage($event)" accept="image/*" v-if="!prizeDetail.image_url">
              </div>
            </div>
            <div class="container-item" v-if="prizeDetail.image_url">
              <div class="img-box">
                <div class="img-show" v-if="prizeDetail.image_url" :style="{backgroundImage: 'url(' + prizeDetail.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="prizeDetail.image_url" @click.stop="delBanner"></div>
              </div>
            </div>
          </div>
          <div class="item-subtitle">添加1张服务详情图片(大小10M以下)</div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">兑换券数量</div>
          <div class="item-right flexEnd">
            <div class="right-num-container">
              <div class="num-item sub-item" @click="subNum"></div>
              <div class="num-box">
                <input type="number" class="num-input" v-model="prizeDetail.stock">
              </div>
              <div class="num-item add-item" @click="addNum"></div>
            </div>
          </div>
        </div>
        <div class="textarea-item">
          <div class="textarea-title">券使用须知</div>
          <div class="textarea-box">
            <textarea class="textarea-content" @touchmove.stop maxlength="20" placeholder="请输入" v-model="prizeDetail.note.note"></textarea>
            <div class="count-box">{{prizeDetail.note.note.length}}/20</div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">保存</div>
    </div>
    <awesome-picker
      ref="picker"
      type="date"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <cropper ref="cropper" @confirm="cropperConfirm" :aspect="1"></cropper>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Cropper from 'components/cropper/cropper'
  import { PrizeApi } from 'api'

  const COUNTREG = /^[1-9]\d*$/
  export default {
    data() {
      return {
        id: '',
        type: '',
        timeType: '',
        prizeDetail: {
          image_id: '',
          image_url: '',
          title: '',
          start_at: '',
          end_at: '',
          stock: 1,
          note: {
            note: ''
          },
          is_online: 1
        },
        disabledCover: false
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if (this.id) {
        this._getPrizeDetail(this.id)
      }
    },
    methods: {
      _getPrizeDetail(id) {
        PrizeApi.getPrizeDetail(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.prizeDetail = Object.assign({}, this.prizeDetail, res.data)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      chioseTime(type) {
        if (this.type === 'editor' && (type === 'sale1' || type === 'use1')) return
        this.timeType = type
        this.$refs.picker.show()
      },
      pickerCancel() {
      },
      pickerConfirm(e) {
        let reg = /[\u4E00-\u9FA5]/g
        let arr = e.map(item => {
          return item.value.replace(reg, '')
        })
        let res = arr.join('-')
        switch (this.timeType) {
          case 'use1':
            this.prizeDetail.start_at = res
            break
          case 'use2':
            this.prizeDetail.end_at = res
            break
        }
      },
      _fileImage(e) {
        let arr = Array.from(e.target.files)
        this.$refs.cropper.show(arr[0])
      },
      delBanner() {
        this.prizeDetail.image_url = ''
        this.prizeDetail.image_id = ''
      },
      subNum() {
        if (+this.prizeDetail.stock <= 1) return
        this.prizeDetail.stock--
      },
      addNum() {
        this.prizeDetail.stock++
      },
      async cropperConfirm(e) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        if (res.error !== this.$ERR_OK) {
          return this.$toast.show(res.message)
        }
        this.prizeDetail.image_url = res.data.url
        this.prizeDetail.image_id = res.data.id
        this.$loading.hide()
        this.$refs.cropper.cancel()
      },
      submitAll() {
        if (this.disabledCover) return
        this.disabledCover = true
        this.checkForm()
      },
      checkForm() {
        let arr = [
          {value: this.titleReg, txt: '请输入兑换券标题'},
          {value: this.use1TimeReg, txt: '请选择券有效期开始时间'},
          {value: this.use2TimeReg, txt: '请选择券有效期结束时间'},
          {value: this.bannerReg, txt: '请添加兑换券图片'},
          {value: this.numReg, txt: '请输入合法的兑换券数量'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          switch (this.type) {
            case 'new':
              this._newPrize()
              break
            case 'editor':
              this._setPrize()
              break
          }
        }
      },
      _newPrize() {
        PrizeApi.newPrize(this.prizeDetail).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$emit('refresh')
            this.$toast.show('创建成功')
            setTimeout(() => {
              this.disabledCover = false
              this.$router.back()
            }, 1500)
          } else {
            this.disabledCover = false
            this.$toast.show(res.message)
          }
        })
      },
      _setPrize() {
        this.prizeDetail.is_online = 1
        PrizeApi.editPrize(this.id, this.prizeDetail).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$emit('refresh')
            this.$toast.show('保存成功')
            setTimeout(() => {
              this.disabledCover = false
              this.$router.back()
            }, 1500)
          } else {
            this.disabledCover = false
            this.$toast.show(res.message)
          }
        })
      },
      _testPropety(arr) {
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            this.disabledCover = false
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      }
    },
    components: {
      Scroll,
      Cropper
    },
    computed: {
      titleReg() {
        return this.prizeDetail.title
      },
      use1TimeReg() {
        return this.prizeDetail.start_at
      },
      use2TimeReg() {
        return this.prizeDetail.end_at
      },
      bannerReg() {
        return this.prizeDetail.image_url && this.prizeDetail.image_id
      },
      numReg() {
        return this.prizeDetail.stock && COUNTREG.test(this.prizeDetail.stock)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .editor-prize
    fill-box()
    z-index: 70
    background: $color-white
    .disabled-cover
      fill-box()
      z-index: 100
    .bottom-box
      position: fixed
      left: 0
      right: 0
      bottom: 0
      z-index: 80
      height: 62px
      box-sizing: border-box
      padding: 10px 15px
      background: $color-F6F6F6
      .bottom-btn
        width: 100%
        height: 100%
        line-height: 44px
        text-align: center
        font-size: $font-size-16
        color: $color-white
        background: $color-363537
        border-radius: 2px
    .container
      padding-left: 15px
      .editor-item
        width: 100%
        height: 55px
        display: flex
        aling-items: center
        box-sizing: border-box
        padding-right: 15px
        .item-left
          width: 80px
          height: 55px
          line-height: 55px
          color: $color-9B9B9B
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
        .item-right
          flex: 1
          overflow: hidden
          display: flex
          align-items: center
          .count-box
            font-size: $font-size-14
            color: $color-9B9B9B
          .input-box
            flex: 1
            overflow: hidden
            height: 20px
            outline: none
            padding: 0
            margin: 0
            line-height: 20px
            border: 0 none
            font-size: $font-size-14
            color: $color-363537
          .input-box::-webkit-input-placeholder
            color: $color-9B9B9B
          .input-box::-ms-input-placeholder
            color: $color-9B9B9B
          .input-box::-moz-placeholder
            color: $color-9B9B9B
          .right-num-container
            display: flex
            align-items: center
            .num-item
              width: 22px
              height: 22px
              &.sub-item
                icon-image('./icon-reduce')
              &.add-item
                icon-image('./icon-plus')
            .num-box
              width: 48px
              height: 22px
              overflow: hidden
              box-sizing: border-box
              border: 1px solid $color-F0EFF5
              border-radius: 2px
              margin: 0 3px
              .num-input
                line-height: 20px
                width: 100%
                text-align: center
                height: 20px
                outline: none
                padding: 0
                margin: 0
                font-size: $font-size-14
                color: $color-363537
          .time-right-first
            width: 90px
            .time-none
              display: flex
              align-items: center
              .time-item
                font-family: $font-family-regular
                color: $color-363537
                font-size: $font-size-14
                margin-right: 5px
              .time-icon
                width: 7.5px
                height: 12.5px
            .time-txt
              font-family: $font-family-regular
              color: $color-363537
              font-size: $font-size-14
              &.disabled
                color: $color-9B9B9B
          .meddle-time
            font-family: $font-family-regular
            color: $color-9B9B9B
            font-size: $font-size-14
            margin: 0 20px

        .between.item-right
          justify-content: space-between
        .flexEnd.item-right
          justify-content: flex-end
      .editor-img-item
        padding-bottom: 20px
        .item-title
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-9B9B9B
          padding-top: 20px
          padding-bottom: 17px
        .img-container
          position: relative
          height: 16vw
          .container-item
            position: absolute
            left: 0
            top: 0
            display: flex
          .img-box
            width: 16vw
            height: 16vw
            margin-right: 2.6vw
            position: relative
            .img-bc
              width: 100%
              height: 100%
              position: absolute
              left: 0
              top: 0
              &.image-file
                opacity: 0
              &.un-up
                icon-image('./icon-addpic_un')
              &.up
                icon-image('./icon-addpic02')
            .image-file
              width: 100%
              height: 100%
              position: absolute
              left: 0
              top: 0
              opacity: 0

            .img-show
              width: 100%
              height: 100%
              position: absolute
              left: 0
              top: 0
              background: $color-white
              box-sizing: border-box
              border-1px($color-9B9B9B)
            .del-icon
              width: 16px
              height: 16px
              position: absolute
              right: -6px
              top: -6px
              icon-image('./icon-del24')
        .item-subtitle
          font-size: $font-size-12
          font-family: $font-family-regular
          color: $color-CCCCCC
          margin-top: 10px
      .textarea-item
        padding-right: 15px
        padding-bottom: 112px
        .textarea-title
          font-size: $font-size-14
          color: $color-9B9B9B
          font-family: $font-family-regular
          margin: 20px 0 10px
        .textarea-box
          width: 100%
          height: 90px
          box-sizing: border-box
          padding: 10px
          background: $color-F9F9F9
          border-1px($color-E6E6E6)
          position: relative
          .textarea-content
            font-size: $font-size-14
            width: 100%
            height: 100%
            resize: none
            background: $color-F9F9F9
            border: 0 none
            padding: 0
            margin: 0
            outline: none
            font-family: $font-family-regular
            color: $color-363537
          .textarea-content::-webkit-input-placeholder
            color: $color-CCCCCC
          .textarea-content::-ms-input-placeholder
            color: $color-CCCCCC
          .textarea-content::-moz-placeholder
            color: $color-CCCCCC
          .count-box
            position: absolute
            right: 10px
            bottom: 10px
            font-size: $font-size-14
            color: $color-CCCCCC
</style>
