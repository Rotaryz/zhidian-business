<template>
  <div class="editor-service">
    <scroll :bcColor="'#ffffff'" ref="scroll">
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">品类</div>
          <div class="item-right">
            <span class="right-txt">{{serviceDetail.industry_name}}</span>
          </div>
        </div>
        <div class="editor-item">
          <div class="item-left">类型</div>
          <div class="item-right">
            <span class="right-txt">{{couponType[serviceDetail.promotion_type]}}</span>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="service-img-item border-bottom-1px">
          <div class="item-title">优惠券服务项目图片</div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in [1, 2, 3]" :key="index">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="serviceDetail.goods_banner_images.length == index" @click="chooseBanner"></div>
              </div>
            </div>
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in serviceDetail.goods_banner_images" :key="index">
                <div class="img-show" v-if="item.image.url" :style="{backgroundImage: 'url(' + item.image.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="item.image.url" @click.stop="delBanner(index)"></div>
              </div>
            </div>
          </div>
          <div class="item-subtitle">添加1-3张服务项目图片(尺寸:600*480,大小10M以下)</div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">标题</div>
          <div class="item-right input-right" @click="showTitleModal('title')">
            <div class="right-txt" v-if="serviceDetail.title">{{serviceDetail.title}}</div>
            <span class="right-txt-placeholder" v-if="!serviceDetail.title">请输入</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">副标题</div>
          <div class="item-right input-right" @click="showTitleModal('subtitle')">
            <div class="right-txt" v-if="serviceDetail.subtitle">{{serviceDetail.subtitle}}</div>
            <span class="right-txt-placeholder" v-if="!serviceDetail.subtitle">(选填)</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">平台价</div>
          <div class="item-right">
            <input type="number" class="input-box" v-model="serviceDetail.platform_price" placeholder="请输入">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">门市价</div>
          <div class="item-right">
            <input type="number" class="input-box" v-model="serviceDetail.original_price" placeholder="请输入">
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">服务详情</div>
          <div class="item-right check-right" @click="checkService">
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="service-img-item border-bottom-1px">
          <div class="item-title">优惠券服务详情图片</div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in [1, 2, 3]" :key="index">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="serviceDetail.goods_banner_images.length == index"></div>
                <input type="file" class="image-file" @change="_fileImage($event)" accept="image/*" v-if="serviceDetail.goods_banner_images.length == index">
              </div>
            </div>
            <div class="container-item">
              <div class="img-box" v-for="(item, index) in serviceDetail.goods_banner_images" :key="index">
                <div class="img-show" v-if="item.image.url" :style="{backgroundImage: 'url(' + item.image.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="item.image.url" @click.stop="delBanner(index)"></div>
              </div>
            </div>
          </div>
          <div class="item-subtitle">添加1-5张服务详情图片(大小10M以下)</div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">售卖时间</div>
          <div class="item-right time-right">
            <div class="time-right-first" @click="chioseTime('sale1')">
              <div class="time-none" v-if="!serviceDetail.sale_start_at">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" :class="type === 'editor' ? 'disabled' : ''" v-if="serviceDetail.sale_start_at">{{serviceDetail.sale_start_at}}</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first" @click="chioseTime('sale2')">
              <div class="time-none" v-if="!serviceDetail.sale_end_at">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="serviceDetail.sale_end_at">{{serviceDetail.sale_end_at}}</div>
            </div>
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">券有效期</div>
          <div class="item-right time-right">
            <div class="time-right-first" @click="chioseTime('use1')">
              <div class="time-none" v-if="!serviceDetail.start_at">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" :class="type === 'editor' ? 'disabled' : ''" v-if="serviceDetail.start_at">{{serviceDetail.start_at}}</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first" @click="chioseTime('use2')">
              <div class="time-none" v-if="!serviceDetail.end_at">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="serviceDetail.end_at">{{serviceDetail.end_at}}</div>
            </div>
          </div>
        </div>
        <div class="large-item">
          <div class="item-left">最大可售数量</div>
          <div class="item-right num-right">
            <input type="number" class="num-input" v-model="serviceDetail.total_stock">
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="royalty-item">
          <div class="item-left">商品提成</div>
          <div class="item-right">
            <input type="number" class="num-input" v-model="serviceDetail.commission_rate">
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
            <switch-box @switchChange="switchChange" :values="serviceDetail.is_sync * 1"></switch-box>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="only-title border-bottom-1px">购买须知</div>
        <div class="large-item border-bottom-1px">
          <div class="item-left">需要预约时间</div>
          <div class="item-right">
            <input type="text" class="input-box" placeholder="请输入" v-model="serviceDetail.note.need_subscribe">
          </div>
        </div>
        <div class="textarea-item">
          <div class="textarea-title">其他</div>
          <div class="textarea-box">
            <textarea class="textarea-content" @touchmove.stop maxlength="20" placeholder="请输入" v-model="serviceDetail.note.remarks"></textarea>
            <div class="count-box">10/20</div>
          </div>
        </div>
      </div>
    </scroll>
    <title-box ref="titleBox" @submitMsg="submitTile"></title-box>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">保存</div>
    </div>
    <detail-modal ref="detailModal" @serviceSuccess="serviceSuccess"></detail-modal>
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
  import DetailModal from 'components/service-detail-modal/service-detail-modal'
  import SwitchBox from 'components/switch-box/switch-box'
  import Cropper from 'components/cropper/cropper'
  import {ServiceApi} from 'api'
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
        serviceDetail: {
          promotion_type: 1, // 1=套餐券;2=代金券;3=满减券;4=折扣券
          goods_banner_images: [], // banner图片
          image_id: '', // banner图片第一张
          title: '', // 商品标题
          subtitle: '', // 商品副标题
          platform_price: '', // 平台价
          original_price: '', // 门市价
          goods_images: [], // 商品详情图片
          sale_start_at: '', // 售卖开始
          sale_end_at: '', // 售卖结束
          start_at: '', // 券使用开始
          end_at: '', // 券结束时间
          commission_rate: '', // 佣金
          total_stock: '', // 总库存
          note: {
            need_subscribe: '', // 预约信息
            remarks: '' // 其他备注
          },
          detail_config: [
            {
              servie: '',
              number: '',
              price: ''
            }
          ], // 服务详情
          industry_name: '美业', // 品类
          is_online: '1', // 是否上线
          is_sync: 0 // 是否全员上架
        }
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if (this.id) {
        this._getServiceDetail(this.id)
      }
    },
    methods: {
      _getServiceDetail(id) {
        ServiceApi.getServiceDetail(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.serviceDetail = Object.assign({}, this.serviceDetail, res.data)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _newService() {
        ServiceApi.newServiceMsg(this.serviceDetail).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$emit('refresh')
            this.$toast.show('创建成功')
            setTimeout(() => {
              this.$router.back()
            }, 1500)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _setService() {
        this.serviceDetail.is_online = 1
        ServiceApi.setServiceMsg(this.id, this.serviceDetail).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$emit('refresh')
            this.$toast.show('保存成功')
            setTimeout(() => {
              this.$router.back()
            }, 1500)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      delBanner(index) {
        this.serviceDetail.goods_banner_images.splice(index, 1)
      },
      chooseBanner() {
        this.$handle.fileController(this.$cosFileType.IMAGE_TYPE).then(res => {
          this.$refs.cropper.show(res[0])
        })
      },
      cropperConfirm(e) {
        this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e])
        this.$refs.cropper.cancel()
      },
      showTitleModal(type) {
        let obj
        switch (type) {
          case 'title':
            obj = {
              type,
              text: this.serviceDetail.title,
              title: '标题',
              placeholder: '请输入标题'
            }
            break
          case 'subtitle':
            obj = {
              type,
              text: this.serviceDetail.subtitle,
              title: '副标题',
              placeholder: '请输入副标题'
            }
            break
        }
        this.$refs.titleBox.showTitleBox(obj)
      },
      submitTile(txt, type) {
        this.serviceDetail[type] = txt
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
          case 'sale1':
            this.serviceDetail.sale_start_at = res
            break
          case 'sale2':
            this.serviceDetail.sale_end_at = res
            break
          case 'use1':
            this.serviceDetail.start_at = res
            break
          case 'use2':
            this.serviceDetail.end_at = res
            break
        }
      },
      chioseTime(type) {
        if (this.type === 'editor' && (type === 'sale1' || type === 'use1')) return
        this.timeType = type
        this.$refs.picker.show()
      },
      checkService() {
        this.$refs.detailModal.showCover(this.serviceDetail.detail_config)
      },
      serviceSuccess(res) {
        this.serviceDetail.detail_config = res.map((item) => {
          return Object.assign({}, item)
        })
      },
      switchChange(res) {
        this.serviceDetail.is_sync = res ? 1 : 0
      },
      submitAll() {
        this.disabledCover = true
        this.checkForm()
      },
      checkForm() {
        let arr = [
          {value: this.bannerReg, txt: '请添加至少一张服务项目图片'},
          {value: this.titleReg, txt: '请输入服务标题'},
          {value: this.platformPriceNotReg, txt: '请输入合法的平台价格'},
          {value: this.platformPriceRangeReg, txt: '平台价格不得高于门市价'},
          {value: this.originalPriceNotReg, txt: '请输入合法的门市价格'},
          {value: this.detailImgReg, txt: '请添加至少一张服务详情图片'},
          {value: this.sale1TimeReg, txt: '请选择售卖开始时间'},
          {value: this.sale2TimeReg, txt: '请选择售卖结束时间'},
          {value: this.use1TimeReg, txt: '请选择券有效期开始时间'},
          {value: this.use2TimeReg, txt: '请选择券有效期结束时间'},
          {value: this.stockReg, txt: '请输入合法的最大可售数量'},
          {value: this.rateReg, txt: '请输入正整数提成比例'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          switch (this.type) {
            case 'new':
              this._newService()
              break
            case 'editor':
              this._setService()
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
        return this.serviceDetail.goods_banner_images.length
      },
      titleReg() {
        return this.serviceDetail.title
      },
      platformPriceNotReg() {
        return this.serviceDetail.platform_price && MONEYREG.test(this.serviceDetail.platform_price)
      },
      platformPriceRangeReg() {
        return +this.serviceDetail.platform_price <= +this.serviceDetail.original_price
      },
      originalPriceNotReg() {
        return this.serviceDetail.original_price && MONEYREG.test(this.serviceDetail.original_price)
      },
      detailImgReg() {
        return this.serviceDetail.goods_images.length
      },
      sale1TimeReg() {
        return this.serviceDetail.sale_start_at
      },
      sale2TimeReg() {
        return this.serviceDetail.sale_end_at
      },
      use1TimeReg() {
        return this.serviceDetail.start_at
      },
      use2TimeReg() {
        return this.serviceDetail.end_at
      },
      stockReg() {
        return this.serviceDetail.total_stock && COUNTREG.test(this.serviceDetail.total_stock)
      },
      rateReg() {
        return this.serviceDetail.commission_rate && COUNTREG.test(this.serviceDetail.commission_rate)
      }
    },
    components: {
      TitleBox,
      Scroll,
      DetailModal,
      SwitchBox,
      Cropper
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
    .disabled-cover
      fill-box()
      z-index: 100
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

      .end-right.item-right
        justify-content: flex-end
        padding-right: 15px
</style>
