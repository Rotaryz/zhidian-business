<template>
  <div class="editor-service">
    <scroll :bcColor="'#ffffff'" ref="scroll">
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">品类</div>
          <div class="item-right">
            <span class="right-txt">丽人</span>
          </div>
        </div>
        <div class="editor-item">
          <div class="item-left">类型</div>
          <div class="item-right">
            <span class="right-txt">套餐券</span>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="service-img-item border-bottom-1px">
          <div class="item-title">优惠券服务项目图片</div>
          <div class="img-container">
            <div class="img-box" v-for="(item, index) in bannerImg" :key="index">
              <div class="img-bc un-up"></div>
              <div class="img-bc up"></div>
              <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*">
              <div class="img-show" :style="{backgroundImage: 'url(' +  + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
              <div class="del-icon"></div>
            </div>
          </div>
          <div class="item-subtitle">添加1-3张服务项目图片(尺寸:750x400,大小2M以下)</div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">标题</div>
          <div class="item-right input-right" @click="showTitleModal('title')">
            <span class="right-txt" v-if="false">套餐券</span>
            <span class="right-txt-placeholder">请输入</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">副标题</div>
          <div class="item-right input-right" @click="showTitleModal('subtitle')">
            <span class="right-txt" v-if="false">套餐券</span>
            <span class="right-txt-placeholder">(选填)</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">平台价</div>
          <div class="item-right">
            <input type="number" class="input-box" placeholder="请输入">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">门市价</div>
          <div class="item-right">
            <input type="number" class="input-box" placeholder="请输入">
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">服务详情</div>
          <div class="item-right check-right">
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="service-img-item border-bottom-1px">
          <div class="item-title">优惠券服务项目图片</div>
          <div class="img-container">
            <div class="img-box" v-for="(item, index) in details" :key="index">
              <div class="img-bc un-up"></div>
              <div class="img-bc up"></div>
              <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*">
              <div class="img-show" :style="{backgroundImage: 'url(' +  + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
              <div class="del-icon"></div>
            </div>
          </div>
          <div class="item-subtitle">添加1-3张服务项目图片(尺寸:750x400,大小2M以下)</div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">售卖时间</div>
          <div class="item-right time-right">
            <div class="time-right-first">
              <div class="time-none" @click="chioseTime('sale1')">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="false">2018-9-28</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first">
              <div class="time-none" @click="chioseTime('sale2')">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
            </div>
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">券有效期</div>
          <div class="item-right time-right">
            <div class="time-right-first">
              <div class="time-none" @click="chioseTime('sale1')">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="false">2018-9-28</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first">
              <div class="time-none" @click="chioseTime('sale2')">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
            </div>
          </div>
        </div>
        <div class="large-item">
          <div class="item-left">最大可售数量</div>
          <div class="item-right num-right">
            <input type="number" class="num-input">
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="royalty-item">
          <div class="item-left">商品提成</div>
          <div class="item-right">
            <input type="number" class="num-input">
            <div class="right-txt-14">%</div>
            <div class="right-txt-12">按成交价计算</div>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="royalty-item">
          <div class="item-left">全员上架</div>
          <div class="item-right end-right">
            <div class="checkbox">
              <div class="circle-btn"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="only-title border-bottom-1px">购买须知</div>
        <div class="large-item border-bottom-1px">
          <div class="item-left">需要预约时间</div>
          <div class="item-right">
            <input type="text" class="input-box" placeholder="请输入">
          </div>
        </div>
        <div class="textarea-item">
          <div class="textarea-title">其他</div>
          <div class="textarea-box">
            <textarea class="textarea-content" @touchmove.stop maxlength="20" placeholder="请输入"></textarea>
            <div class="count-box">10/20</div>
          </div>
        </div>
      </div>
      <title-box ref="titleBox"></title-box>
    </scroll>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn">保存</div>
    </div>
    <transition name="fade">
      <div class="service-detail-cover">

      </div>
    </transition>
    <awesome-picker
      ref="picker"
      type="date"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleBox from 'components/title-box/title-box'
  import Scroll from 'components/scroll/scroll'
  export default {
    data() {
      return {
        type: 'new',
        id: '',
        bannerImg: [1, 2, 3],
        details: [1, 2, 3, 4, 5],
        timeType: ''
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
    },
    methods: {
      showTitleModal(type) {
        let obj
        switch (type) {
          case 'title':
            obj = {
              type,
              text: '123',
              title: '标题',
              placeholder: '请输入标题'
            }
            break
          case 'subtitle':
            obj = {
              type,
              text: '123',
              title: '副标题',
              placeholder: '请输入副标题'
            }
            break
        }
        this.$refs.titleBox.showTitleBox(obj)
      },
      pickerCancel() {
      },
      pickerConfirm(e) {
        let reg = /[\u4E00-\u9FA5]/g
        let arr = e.map(item => {
          return item.value.replace(reg, '')
        })
        console.log(arr.join('-'))
      },
      chioseTime(type) {
        this.timeType = type
        this.$refs.picker.show()
      }
    },
    components: {
      TitleBox,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .editor-service
    fill-box()
    z-index: 70
    background: $color-white
    .service-detail-cover
      width: 100vw
      height: 100vh
      background: rgba(54,53,71,0.80)
      fill-box()
    .bottom-box
      position: fixed
      left: 0
      right: 0
      bottom: 0
      z-index: 80
      height: 82px
      box-sizing: border-box
      padding: 19px 10px
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
    .group-container
      padding-left: 15px
      background: $color-white
    .editor-item
      width: 100%
      height: 55px
      display: flex
      aling-items: center
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
        height: 55px
        line-height: 55px
        font-size: 0
        overflow: hidden
        .right-txt
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
          color: $color-363537
        .right-txt-placeholder
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-CCCCCC
        .arrow-icon
          width: 7.5px
          height: 12.5px
        .input-box
          width: 100%
          height: 100%
          outline: none
          padding: 0
          margin: 0
          line-height: 55px
          border: 0 none
          font-size: $font-size-14
          color: $color-363537
        .input-box::-webkit-input-placeholder
          color: $color-9B9B9B
        .input-box::-ms-input-placeholder
          color: $color-9B9B9B
        .input-box::-moz-placeholder
          color: $color-9B9B9B
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
        .meddle-time
          font-family: $font-family-regular
          color: $color-9B9B9B
          font-size: $font-size-14
          margin: 0 20px

      .input-right.item-right
        padding-right: 15px
        display: flex
        align-items: center
        justify-content: space-between
      .check-right.item-right
        padding-right: 15px
        display: flex
        align-items: center
        justify-content: flex-end
      .item-right.time-right
        display: flex
        align-items: center
    .large-item
      display: flex
      justify-content: space-between
      align-items: center
      height: 55px
      .item-left
        width: 115px
        height: 55px
        line-height: 55px
        color: $color-9B9B9B
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
      .item-right
        flex: 1
        overflow: hidden
        height: 55px
        line-height: 55px
        font-size: 0
        .num-input
          width: 70px
          height: 32px
          outline: none
          text-align: center
          padding: 0
          margin: 0
          line-height: 32px
          border: 1px solid $color-CCCCCC
          font-size: $font-size-14
          color: $color-20202E
        .input-box
          width: 100%
          height: 100%
          outline: none
          padding: 0
          margin: 0
          line-height: 55px
          border: 0 none
          font-size: $font-size-14
          color: $color-363537
        .input-box::-webkit-input-placeholder
          color: $color-9B9B9B
        .input-box::-ms-input-placeholder
          color: $color-9B9B9B
        .input-box::-moz-placeholder
          color: $color-9B9B9B

      .num-right.item-right
        display: flex
        justify-content: flex-end
        align-items: center
        padding-right: 15px
    .service-img-item
      padding-bottom: 20px
      .item-title
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-9B9B9B
        padding-top: 20px
        padding-bottom: 17px
      .img-container
        display: flex
        .img-box
          width: 16vw
          height: 16vw
          margin-right: 4vw
          position: relative
          .img-bc
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
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
    .only-title
      height: 55px
      line-height: 55px
      font-size: $font-size-14
      color: $color-363537
      font-family: $font-family-regular
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
          color: $color-9B9B9B
        .textarea-content::-ms-input-placeholder
          color: $color-9B9B9B
        .textarea-content::-moz-placeholder
          color: $color-9B9B9B
        .count-box
          position: absolute
          right: 10px
          bottom: 10px
          font-size: $font-size-14
          color: $color-9B9B9B
    .royalty-item
      display: flex
      height: 55px
      align-items: center
      .item-left
        width: 80px
        height: 55px
        line-height: 55px
        color: $color-9B9B9B
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
      .item-right
        display: flex
        height: 55px
        align-items: center
        flex: 1
        overflow: hidden
        font-size: 0
        .num-input
          width: 70px
          height: 32px
          outline: none
          text-align: center
          padding: 0
          margin: 0
          line-height: 32px
          border: 1px solid $color-CCCCCC
          font-size: $font-size-14
          color: $color-20202E
        .right-txt-14
          font-size: $font-size-14
          color: $color-9B9B9B
          margin: 0 10px 0 5px
        .right-txt-12
          font-size: $font-size-12
          color: $color-9B9B9B
        .checkbox
          width: 51px
          height: 28px
          border-radius: 14px
          background: $color-CCCCCC
          display: flex
          align-items: center
          .circle-btn
            width: 24px
            height: 24px
            border-radius: 12px
            background: $color-white
            margin-left: 2px
            transition: all .3s
        .checkbox.checked
          background: #56BA15
          .circle-btn
            margin-left: 25px
      .end-right.item-right
        justify-content: flex-end
        padding-right: 15px
</style>
