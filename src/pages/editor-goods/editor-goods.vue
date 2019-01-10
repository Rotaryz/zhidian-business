<template>
  <div class="editor-goods">
    <scroll :data="goodsDetail.goods_images" :bcColor="'#ffffff'" ref="scroll">
      <div class="editor-title border-bottom-1px border-top-1px">
        <div class="title">基本信息</div>
      </div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px" @click="showTitleModal('title')">
          <div class="item-left">标题</div>
          <div class="item-right input-right" >
            <div class="right-txt" v-if="goodsDetail.title">{{goodsDetail.title}}</div>
            <span class="right-txt-placeholder" v-if="!goodsDetail.title">请填写商品的标题</span>
            <!--<img src="./icon-press_right@2x.png" class="arrow-icon">-->
          </div>
        </div>
        <div class="editor-item border-bottom-1px" @click="showTitleModal('subtitle')">
          <div class="item-left need-no">副标题</div>
          <div class="item-right input-right" >
            <div class="right-txt" v-if="goodsDetail.subtitle">{{goodsDetail.subtitle}}</div>
            <span class="right-txt-placeholder" v-if="!goodsDetail.subtitle">请填写商品的副标题</span>
            <!--<img src="./icon-press_right@2x.png" class="arrow-icon">-->
          </div>
        </div>
        <label>
          <div class="editor-item border-bottom-1px">
            <div class="item-left">门市价</div>
            <div class="item-right">
              <input type="number" class="input-box" v-model="goodsDetail.original_price" placeholder="请填写">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-bottom-1px">
            <div class="item-left">售价</div>
            <div class="item-right">
              <input type="number" class="input-box" v-model="goodsDetail.platform_price" placeholder="请填写">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item">
            <div class="item-left">库存</div>
            <div class="item-right">
              <input type="number" class="input-box" v-model="goodsDetail.usable_stock" placeholder="请填写">
            </div>
          </div>
        </label>
      </div>
      <div class="group-container no-padding">
        <div class="goods-img-item border-top-1px">
          <div class="item-title">商品图片 <span class="item-subtitle">建议尺寸比率为4:3,大小10M以内，最多3张</span></div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in [1, 2, 3]" :key="index">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="goodsDetail.goods_banner_images.length == index"></div>
                <base-wx-input class="img-bc image-file" @change="_fileImage($event)" accept="image/*" v-if="goodsDetail.goods_banner_images.length == index"></base-wx-input>
              </div>
            </div>
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in goodsDetail.goods_banner_images" :key="index">
                <div class="img-show" v-if="item.image_url" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="item.image_url" @click.stop="delBanner(index)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-container no-padding">
        <div class="goods-img-item">
          <div class="item-title">详情图片 <span class="item-subtitle">建议大小10M以内，最多5张</span></div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="goodsDetail.goods_images.length == index"></div>
                <base-wx-input class="img-bc image-file" @change="_fileDetail($event)" accept="image/*" v-if="goodsDetail.goods_images.length == index" :multiple="5"></base-wx-input>
              </div>
            </div>
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in goodsDetail.goods_images" :key="index">
                <div class="img-show" v-if="item.image_url" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="item.image_url" @click.stop="delDetail(index)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="editor-title border-bottom-1px border-top-1px">
        <div class="title">使用有效期</div>
      </div>
      <div class="group-container padding-right">
        <label>
          <div class="editor-item border-bottom-1px">
            <div class="item-left">开始时间</div>
            <div class="item-right">
              <input type="text" class="input-box" :class="{'no-click': (type === 'editor')}" @click="chioseTime('use1')" v-model="goodsDetail.start_at" readonly placeholder="请选择时间">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-bottom-1px">
            <div class="item-left">结束时间</div>
            <div class="item-right">
              <input type="text" class="input-box" @click="chioseTime('use2')" v-model="goodsDetail.end_at" readonly placeholder="请选择时间">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item">
            <div class="item-left">预约信息</div>
            <div class="item-right">
              <input type="text" class="input-box" maxlength="140" v-model="goodsDetail.note.need_subscribe" placeholder="请填写">
            </div>
          </div>
        </label>
      </div>
      <div class="editor-title border-bottom-1px border-top-1px">
        <div class="title">温馨提示</div>
      </div>
      <div class="group-container">
        <div class="textarea-item">
          <div class="textarea-box">
            <textarea class="textarea-content" @touchmove.stop maxlength="20" placeholder="请输入" v-model="goodsDetail.note.remarks"></textarea>
            <div class="count-box">{{goodsDetail.note.remarks.length}}/20</div>
          </div>
        </div>
      </div>
      <div class="padding-bottom"></div>
    </scroll>
    <title-box ref="titleBox" @submitMsg="submitTile"></title-box>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">保存并上架</div>
    </div>
    <awesome-picker
      ref="picker"
      type="date"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
    <cropper ref="cropper" @confirm="cropperConfirm"></cropper>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleBox from 'components/title-box/title-box'
  import Scroll from 'components/scroll/scroll'
  import SwitchBox from 'components/switch-box/switch-box'
  import Cropper from 'components/cropper/cropper'
  import { Goods } from 'api'

  const COUPON_TYPE = {
    1: '套餐券'
  }
  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/
  export default {
    data() {
      return {
        type: 'new',
        id: '',
        couponType: COUPON_TYPE,
        disabledCover: false, // 请求时禁止任何操作
        timeType: '',
        goodsDetail: {
          promotion_type: 0, // 1=套餐券;2=代金券;3=满减券;4=折扣券
          goods_banner_images: [], // banner图片
          image_id: '', // banner图片第一张
          title: '', // 商品标题
          subtitle: '', // 商品副标题
          platform_price: '', // 平台价
          original_price: '', // 门市价
          goods_images: [], // 商品详情图片
          start_at: '', // 售卖开始
          end_at: '', // 售卖结束
          commission_rate: '0', // 佣金 已无用保留默认值为0
          usable_stock: '', // 总库存
          note: {
            need_subscribe: '', // 预约信息
            remarks: '' // 其他备注
          },
          industry_name: '美业', // 品类
          is_online: '1', // 是否上线
          is_sync: 1 // 是否全员上架 已无用保留默认值为1
        }
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if (this.id) {
        document.title = '编辑商品'
        this._getGoodsDetail(this.id)
      }
    },
    mounted() {
      this.$refs.scroll.refresh()
    },
    methods: {
      _getGoodsDetail(id) {
        Goods.getGoodsDetail(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.goodsDetail = Object.assign({}, this.goodsDetail, res.data)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _newGoods() {
        Goods.newGoodsMsg(this.goodsDetail).then((res) => {
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
      _setGoods() {
        this.goodsDetail.is_online = 1
        Goods.setGoodsMsg(this.id, this.goodsDetail).then((res) => {
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
      delBanner(index) {
        this.goodsDetail.goods_banner_images.splice(index, 1)
      },
      _fileImage(e) {
        let arr = Array.from(e.target.files)
        if (arr.length > 0) {
          this.$refs.cropper.show(arr[0])
        }
      },
      _fileDetail(e) {
        let arr = Array.from(e.target.files)
        this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then((resArr) => {
          this.$loading.hide()
          let arr = []
          resArr.map(item => {
            if (item.error !== this.$ERR_OK) {
              return this.$toast.show(item.message)
            }
            let obj = {
              image_id: item.data.id,
              image_url: item.data.url,
              id: 0
            }
            arr.push(obj)
          })
          let newArr = this.goodsDetail.goods_images
          newArr.push(...arr)
          newArr = newArr.splice(0, 5)
          this.goodsDetail.goods_images = newArr
        })
      },
      delDetail(index) {
        this.goodsDetail.goods_images.splice(index, 1)
      },
      async cropperConfirm(e) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        if (res.error !== this.$ERR_OK) {
          return this.$toast.show(res.message)
        }
        let obj = {
          image_id: res.data.id,
          image_url: res.data.url,
          id: 0
        }
        this.goodsDetail.goods_banner_images.push(obj)
        this.$loading.hide()
        this.$refs.cropper.cancel()
      },
      showTitleModal(type) {
        let obj
        switch (type) {
          case 'title':
            obj = {
              type,
              text: this.goodsDetail.title,
              title: 'null',
              placeholder: '请输入标题'
            }
            break
          case 'subtitle':
            obj = {
              type,
              text: this.goodsDetail.subtitle,
              title: 'null',
              placeholder: '请输入副标题'
            }
            break
        }
        this.$refs.titleBox.showTitleBox(obj)
      },
      submitTile(txt, type) {
        this.goodsDetail[type] = txt
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
            this.goodsDetail.start_at = res
            break
          case 'use2':
            this.goodsDetail.end_at = res
            break
        }
      },
      chioseTime(type) {
        if (this.type === 'editor' && type === 'use1') return
        this.timeType = type
        this.$refs.picker.show()
      },
      switchChange(res) {
        this.goodsDetail.is_sync = res ? 1 : 0
      },
      submitAll() {
        if (this.disabledCover) return
        this.disabledCover = true
        this.checkForm()
      },
      checkForm() {
        let arr = [
          {value: this.titleReg, txt: '请输入商品标题'},
          {value: this.originalPriceNotReg, txt: '请输入合法的门市价格'},
          {value: this.platformPriceNotReg, txt: '请输入合法的售价'},
          {value: this.platformPriceRangeReg, txt: '平台价格不得高于门市价'},
          {value: this.stockReg, txt: '请输入合法的最大库存数量'},
          {value: this.bannerReg, txt: '请添加至少一张商品图片'},
          {value: this.detailImgReg, txt: '请添加至少一张商品详情图片'},
          {value: this.use1TimeReg, txt: '请选择售卖开始时间'},
          {value: this.use2TimeReg, txt: '请选择售卖结束时间'},
          {value: this.subscribeMsg, txt: '请输入预约信息'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          switch (this.type) {
            case 'new':
              this._newGoods()
              break
            case 'editor':
              this._setGoods()
              break
          }
        }
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
    computed: {
      bannerReg() {
        return this.goodsDetail.goods_banner_images.length
      },
      titleReg() {
        return this.goodsDetail.title
      },
      platformPriceNotReg() {
        return this.goodsDetail.platform_price && MONEYREG.test(this.goodsDetail.platform_price)
      },
      platformPriceRangeReg() {
        return +this.goodsDetail.platform_price <= +this.goodsDetail.original_price
      },
      originalPriceNotReg() {
        return this.goodsDetail.original_price && MONEYREG.test(this.goodsDetail.original_price)
      },
      detailImgReg() {
        return this.goodsDetail.goods_images.length
      },
      use1TimeReg() {
        return this.goodsDetail.start_at
      },
      use2TimeReg() {
        return this.goodsDetail.end_at
      },
      subscribeMsg() {
        return this.goodsDetail.note.need_subscribe
      },
      stockReg() {
        return this.goodsDetail.usable_stock && COUNTREG.test(this.goodsDetail.usable_stock)
      }
    },
    watch: {
      'goodsDetail.goods_banner_images'(curVal) {
        this.goodsDetail.image_id = (curVal[0] && curVal[0].image_id) || ''
      }
    },
    components: {
      TitleBox,
      Scroll,
      SwitchBox,
      Cropper
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  body
    position: fixed

  label
    display: block
  .editor-goods
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
        background: $color-27273E
        border-radius: 2px
    .editor-title
      height: 40px
      background: $color-F6F6F6
      font-size: 14px
      line-height: 40px
      padding: 0 15px
      color: $color-9B9B9B
      &:before
        border-top-color: $color-E6E6E6
      &:after
        border-bottom-color: $color-E6E6E6
      .title
        display: flex
        justify-content: space-between
        align-items: center
        .add-server
          width: 20px
          height: 20px
          background: $color-F9F9F9
          border-radius: 20px
          bg-image(icon-addfw)
          background-size: 100% 100%
    .group-container
      padding-left: 15px
      background: $color-white
    .padding-right
      padding-right: 15px
      .input-box
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .no-padding
      padding-left: 0
      transition: all 0.3s
      .server-list
        overflow: hidden
        height: 0
      .has-class
        transition: all 0.3s
      .show-list
        height: 160px
      .hide-list
        height: 0
        transition: all 0.3s ease-in-out
    .editor-item
      width: 100%
      height: 55px
      display: flex
      aling-items: center
      .item-left
        width: 80px
        height: 55px
        line-height: 55px
        color: $color-2E0034
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
        position: relative
        &:before
          content: '*'
          position: absolute
          color: $color-D32F2F
          left: -7px
          top: 2px
          font-size: 14px
      .need-no:before
        content: ''
      .item-right
        flex: 1
        height: 55px
        line-height: 55px
        font-size: 0
        overflow: hidden
        display: flex
        align-items: center
        .right-txt
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
          color: $color-27273E
          width: 100%
          height: 55px
          no-wrap()
        .right-txt-placeholder
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-CCCCCC
        .arrow-icon
          width: 7.5px
          height: 12.5px
        .input-box
          width: 100%
          height: 20px
          outline: none
          padding: 0
          margin: 0
          line-height: 20px
          border: 0 none
          font-size: $font-size-14
          color: $color-27273E
        .no-click
          color: $color-CCCCCC
        .input-box::-webkit-input-placeholder
          color: $color-CCCCCC
        .input-box::-ms-input-placeholder
          color: $color-CCCCCC
        .input-box::-moz-placeholder
          color: $color-CCCCCC
        .time-right-first
          width: 90px
          .time-none
            display: flex
            align-items: center
            .time-item
              font-family: $font-family-regular
              color: $color-27273E
              font-size: $font-size-14
              margin-right: 5px
            .time-icon
              width: 7.5px
              height: 12.5px
          .time-txt
            font-family: $font-family-regular
            color: $color-27273E
            font-size: $font-size-14
            &.disabled
              color: $color-9B9B9B
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
    .server-list
      padding: 0 15px
      .item-left
        display: flex
        justify-content: space-between
        align-items: center
      .item-right
        display: flex
        justify-content: space-between
        align-items: center
      .del-server
        width: 20px
        height: 20px
        background: $color-F9F9F9
        border-radius: 20px
        bg-image(icon-delfw)
        background-size: 100% 100%
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
        .right-num-box
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
          display: flex
          align-items: center
          justify-content: center
        .num-input
          width: 70px
          height: 20px
          outline: none
          text-align: center
          padding: 0
          margin: 0
          line-height: 20px
          border: 0 none
          font-size: $font-size-14
          color: $color-20202E
        .input-box
          width: 100%
          height: 20px
          outline: none
          padding: 0
          margin: 0
          line-height: 20px
          border: 0 none
          font-size: $font-size-14
          color: $color-27273E
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
      .meddle-right.item-right
        display: flex
        align-items: center
    .goods-img-item
      padding-bottom: 20px
      padding-left: 15px
      .item-title
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-2E0034
        padding-top: 20px
        padding-bottom: 17px
        position: relative
        &:before
          content: '*'
          color: $color-D32F2F
          font-size: 14px
          margin-right: 2px
          position: absolute
          left: -7px
          top: 22px
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
    .only-title
      height: 55px
      line-height: 55px
      font-size: $font-size-14
      color: $color-27273E
      font-family: $font-family-regular
    .textarea-item
      margin-top: 15px
      padding-right: 15px
      padding-bottom: 15px
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
          color: $color-27273E
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
    .royalty-item
      display: flex
      height: 55px
      padding-left: 15px
      align-items: center
      .item-left
        width: 80px
        height: 55px
        line-height: 55px
        color: $color-2E0034
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
        position: relative
        &:before
          content: '*'
          position: absolute
          color: $color-D32F2F
          left: -7px
          top: 2px
          font-size: 14px
      .need-no:before
        content: ''
      .item-right
        display: flex
        height: 55px
        align-items: center
        flex: 1
        overflow: hidden
        font-size: 0
        .right-num-box
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
          display: flex
          align-items: center
          justify-content: center
        .num-input
          width: 70px
          height: 20px
          outline: none
          text-align: center
          padding: 0
          margin: 0
          line-height: 20px
          border: 0 none
          font-size: $font-size-14
          color: $color-20202E
          &.disabled
            color: $color-9B9B9B
        .num-input:disabled
          background: $color-white
        .right-txt-14
          font-size: $font-size-14
          color: $color-9B9B9B
          margin: 0 10px 0 5px
        .right-txt-12
          font-size: $font-size-12
          color: $color-9B9B9B
          padding-left: 80px
          padding-bottom: 15px
    .deducte
      display: flex
      height: 75px
      justify-content: space-between
      align-items: center
      padding-right: 10px
      .item-right
        flex: inherit
      .item-left
        height: 40px
        flex: 1
        line-height: 20px
        .right-txt-12
          font-size: $font-size-12
          color: $color-CCCCCC
  .end-right.item-right
        justify-content: flex-end
        padding-right: 15px
  .padding-bottom
    padding-bottom: 80px
</style>
