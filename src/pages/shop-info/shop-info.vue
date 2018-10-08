<template>
  <form class="shop-info">
    <div class="scroll-wrapper">
      <scroll :bcColor="'#F6F6F6'" ref="scroll">
        <div>
          <section class="base-wrapper">
            <article class="base-item border-bottom-1px" @click="showTitleModal('name')">
              <div class="left">门店名称</div>
              <div class="middle" v-if="!shopInfo.name">请输入门店名称</div>
              <div class="middle active" v-else>{{shopInfo.name}}</div>
              <div class="right right-arrow"></div>
            </article>
            <article class="base-item border-bottom-1px" @click="showTitleModal('intro')">
              <div class="left">门店描述</div>
              <div class="middle" v-if="!shopInfo.intro">请描述您的门店</div>
              <div class="middle active" v-else>{{shopInfo.intro}}</div>
              <div class="right right-arrow"></div>
            </article>
            <article class="base-item border-bottom-1px">
              <div class="left">联系电话</div>
              <input class="middle active" type="number" v-model="shopInfo.telephone" placeholder="请输入您的联系电话">
            </article>
            <article class="base-item" @click="choosePicker('industry')">
              <div class="left">行业类型</div>
              <div class="middle" v-if="!shopInfo.industry_name">请选择门店的行业类型</div>
              <div class="middle active" v-else>{{shopInfo.industry_name}}</div>
              <div class="right right-arrow"></div>
            </article>
          </section>
          <div class="margin-box-10px"></div>
          <section class="base-wrapper extend-wrapper">
            <article class="base-item border-bottom-1px" @click="choosePicker('address')">
              <div class="left">所在地区</div>
              <div class="middle" v-if="!shopInfo.address">请选择门店所在区域</div>
              <div class="middle active" v-else>{{shopInfo.address}}</div>
              <div class="right right-arrow"></div>
            </article>
            <article class="base-item border-bottom-1px" @click="showTitleModal('address_detail')">
              <div class="left">详细地址</div>
              <div class="middle" v-if="!shopInfo.address_detail">请输入门店详细地址</div>
              <div class="middle active" v-else>{{shopInfo.address_detail}}</div>
              <div class="right right-arrow"></div>
            </article>
            <article class="base-item">
              <div class="left">营业时间</div>
              <figure class="time-item" @click="choosePicker('opening_hours','start')">
                <div class="time">{{openingStart}}</div>
                <div class="right-arrow"></div>
              </figure>
              <div class="cut-line">至</div>
              <figure class="time-item" @click="choosePicker('opening_hours', 'end')">
                <div class="time">{{openingEnd}}</div>
                <div class="right-arrow"></div>
              </figure>
            </article>
          </section>
          <div class="margin-box-10px"></div>
          <section class="base-wrapper media-wrapper">
            <article class="media-item border-bottom-1px">
              <div class="title">门店logo</div>
              <figure class="content">
                <label class="add">
                  <div class="img-show" v-if="shopInfo.shop_logo[0]" :style="{backgroundImage: 'url(' + shopInfo.shop_logo[0].image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.shop_logo[0]" @click.stop="delDetail('logo')"></div>
                  <input v-if="shopInfo.shop_logo.length === 0" type="file" style="display: none" @change="_fileChange($event, 'logo')"
                         accept="image/*">
                </label>
                <div class="explain one">点击图片预览实际展示效果</div>
                <div class="explain">添加1张图片（尺寸200*200，大小2M以下）</div>
              </figure>
            </article>
            <article class="media-item border-bottom-1px">
              <div class="title">门店视频</div>
              <figure class="content">
                <div class="add"></div>
                <div class="explain one">点击视频预览实际展示效果</div>
                <div class="explain">添加30S左右视频</div>
              </figure>
            </article>
            <article class="media-item">
              <div class="title">门店图片</div>
              <figure class="content">
                <label class="add"
                       v-for="(item, index) in shopImagesLen"
                       :key="index"
                >
                  <div class="img-show" v-if="shopInfo.shop_images[index]" :style="{backgroundImage: 'url(' + shopInfo.shop_images[index].image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.shop_images[index]" @click.stop="delDetail(index)"></div>
                  <input v-if="shopInfo.shop_images.length == index" type="file" style="display: none" @change="_fileChange($event, 'images')"
                         accept="image/*">
                </label>
                <div class="explain one">点击图片预览实际展示效果</div>
                <div class="explain">添加1-10 张图片（尺寸400*300，大小10M以下）</div>
              </figure>
            </article>
          </section>
        </div>
      </scroll>
    </div>
    <section class="btn-wrapper border-top-1px">
      <div class="btn" @click="saveBtn">保存</div>
    </section>
    <title-box ref="titleBox" @submitMsg="submitTile"></title-box>
    <awesome-picker
      ref="picker-industry"
      :data="industryArr"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <awesome-picker
      ref="picker-address"
      :data="cityData"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <awesome-picker
      ref="picker-opening_hours"
      type="time"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <cropper ref="cropper-shop_images" @confirm="cropperConfirm"></cropper>
    <cropper ref="cropper-shop_logo" @confirm="cropperConfirm($event ,'logo')" :aspect="1"></cropper>
  </form>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import TitleBox from 'components/title-box/title-box'
  import { checkIsPhoneNumber, cityData } from 'common/js/utils'
  import axios from 'axios'
  import { Upload } from 'api'
  import Cropper from 'components/cropper/cropper'
  import VueCropper from 'vue-cropperjs'

  const KEY = '206ec5511b39a51e02627ffbd8dfc16c'

  const industryArr = [
    ['美业']
  ]
  export default {
    components: {
      Scroll,
      TitleBox,
      Cropper,
      VueCropper
    },
    data() {
      return {
        shopInfo: {
          name: '',
          intro: '', // 介绍
          telephone: '',
          industry_id: '', // 行业id
          industry_name: '', // 行业名称
          circle_id: '0', // 商圈id
          address: '', // 门店区域
          address_detail: '', // 门店详细地址
          opening_hours: [], // 营业时间
          shop_logo: [], // 门店logo
          shop_video: [], // 门店视频
          shop_images: [] // 门店图片
        },
        addressInfo: {
          province: '',
          city: '',
          area: '',
          address_detail: '',
          pca: '', // 省会+城市+地区
          longitude: 0,
          latitude: 0
        },
        openingStart: '9:00',
        openingEnd: '21:00',
        cityData,
        industryArr,
        pickerType: '',
        timeType: '',
        visible: false
      }
    },
    created() {
      this.shopInfo.opening_hours = [this.openingStart, this.openingEnd]
    },
    methods: {
      _fileChange(e, flag) {
        let arr = Array.from(e.target.files)
        flag === 'images' && this.$refs['cropper-shop_images'].show(arr[0])
        flag === 'logo' && this.$refs['cropper-shop_logo'].show(arr[0])
      },
      delDetail(index) {
        if (index === 'logo') {
          this.shopInfo.shop_logo = []
          return
        }
        this.shopInfo.shop_images.splice(index, 1)
      },
      cropperConfirm(e, type) {
        this.$loading.show()
        let blob = this.$handle.getBlobBydataURI(e)
        let file = this.$handle.createFormData(blob)
        Upload.upLoadImage(file).then(res => {
          if (res.error !== this.$ERR_OK) {
            return this.$toast.show(res.message)
          }
          let obj = {
            image_id: res.data.id,
            image_url: res.data.url,
            id: 0
          }
          switch (type) {
            case 'logo' :
              this.shopInfo.shop_logo.push(obj)
              this.$refs['cropper-shop_logo'].cancel()
              break
            default:
              this.shopInfo.shop_images.push(obj)
              this.$refs['cropper-shop_images'].cancel()
              break
          }
          this.$loading.hide()
        })
      },
      showTitleModal(type) {
        let obj
        switch (type) {
          case 'name':
            obj = {
              type,
              text: this.shopInfo[type],
              title: '门店名称',
              placeholder: '请输入',
              maxLength: 20
            }
            break
          case 'intro':
            obj = {
              type,
              text: this.shopInfo[type],
              title: '门店描述',
              placeholder: '请输入',
              maxLength: 20
            }
            break
          case 'address_detail':
            obj = {
              type,
              text: this.shopInfo[type],
              title: '门店详细地址',
              placeholder: '请输入',
              maxLength: 100
            }
            break
          default:
            break
        }
        this.$refs.titleBox.showTitleBox(obj)
      },
      submitTile(txt, type) {
        this.shopInfo[type] = txt.trim()
        if (type === 'address_detail') {
          this.addressInfo.address_detail = this.shopInfo.address_detail
        }
      },
      choosePicker(type, flag) {
        this.timeType = flag
        this.pickerType = type
        this.$refs[`picker-${type}`].show()
      },
      pickerConfirm(e) {
        let arr = []
        switch (this.pickerType) {
          case 'industry':
            this.shopInfo.industry_name = e[0].value
            this.shopInfo.industry_id = e[0].id
            break
          case 'opening_hours':
            arr = []
            for (let i = 0; i < e.length - 1; i++) {
              arr.push(e[i].value.substr(0, 2))
            }
            arr = arr.join(':')
            if (this.timeType === 'start') {
              this.openingStart = arr
              this.shopInfo.opening_hours[0] = arr
            } else {
              this.openingEnd = arr
              this.shopInfo.opening_hours[1] = arr
            }
            break
          case 'address':
            arr = []
            let text = ''
            for (let i = 0; i < e.length; i++) {
              e[i].value && arr.push(e[i].value)
              text += e[i].value
            }
            let addressInfo = this.addressInfo
            addressInfo.province = e[0].value
            addressInfo.city = e[1].value
            addressInfo.area = e[2].value
            addressInfo.pca = text
            this.shopInfo.address = arr.join('-')
            break
          default:
            break
        }
        this.pickerType = ''
        this.timeType = ''
      },
      pickerCancel() {
        this.pickerType = ''
        this.timeType = ''
      },
      _checkForm() {
        let arr = [
          {value: this.nameReg, txt: '请输入门店名称'},
          {value: this.introReg, txt: '请描述您的门店'},
          {value: this.telephoneReg, txt: '请输入正确的手机号码'},
          {value: this.industryReg, txt: '请选择您的行业类型'},
          {value: this.addressReg, txt: '请选择您的门店所在的地区'},
          {value: this.addressDetailReg, txt: '请输入您的门店的详细地址'},
          {value: this.openHoursReg, txt: '请选择您的营业时间'},
          {value: this.shopLogoReg, txt: '请添加门店logo'},
          {value: this.shopVideoReg, txt: '请添加门店视频'},
          {value: this.shopImagesReg, txt: '请添加至少一张门店图片'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._getGeocoder(data => {
            this._updateShopInfo()
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
      },
      _updateShopInfo() {
        // todo
      },
      saveBtn() {
        // todo
        this._checkForm()
      },
      _getGeocoder(callback) {
        let addressInfo = this.addressInfo
        let text = addressInfo.pca + addressInfo.address_detail
        axios.get(`https://restapi.amap.com/v3/geocode/geo?address=${text}&key=${KEY}`)
          .then(res => {
            if (res && res.statusText !== 'OK') {
              return
            }
            let location = res.data.geocodes[0].location.split(',')
            addressInfo.longitude = location[0]
            addressInfo.latitude = location[1]
            let data = {
              address: addressInfo.address_detail,
              province: addressInfo.province,
              city: addressInfo.city,
              area: addressInfo.area,
              longitude: addressInfo.longitude,
              latitude: addressInfo.latitude
            }
            callback && callback(data)
          })
      }
    },
    computed: {
      shopImagesReg() {
        return this.shopInfo.shop_images.length > 0
      },
      shopVideoReg() {
        return this.shopInfo.shop_video.length > 0
      },
      shopLogoReg() {
        return this.shopInfo.shop_logo.length > 0
      },
      shopImagesLen() {
        return Math.min(this.shopInfo.shop_images.length + 1, 10)
      },
      introReg() {
        return this.shopInfo.intro
      },
      nameReg() {
        return this.shopInfo.name
      },
      industryReg() {
        return this.shopInfo.industry_name
      },
      telephoneReg() {
        return checkIsPhoneNumber(this.shopInfo.telephone)
      },
      addressReg() {
        return this.shopInfo.address
      },
      addressDetailReg() {
        return this.shopInfo.address_detail
      },
      openHoursReg() {
        return this.shopInfo.opening_hours.length === 2
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  input
    height: 40px
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .right-arrow
    width: 7px
    height: 12px
    icon-image(icon-press_right)
    margin-right: 15px

  .shop-info
    fill-box()
    z-index: 70
    height: 100vh
    .scroll-wrapper
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 64px
    .base-wrapper
      padding-left: 15px
      background: #fff
      .base-item
        height: 55.5px
        font-family: PingFangSC-Regular
        font-size: 14px
        layout(row)
        align-items: center
        .time-item
          layout(row)
          height: 100%
          align-items: center
          .time
            color: $color-363547
            margin-right: 5px
            &:first-child
              margin-left: 24px
        .cut-line
          color: $color-9B9B9B
          margin: 0 6px 0 15px
        .left
          color: $color-9B9B9B
        .middle
          flex: 1
          color: $color-CCCCCC
          padding: 0 24px
          no-wrap()
          &.active
            color: $color-363547
        .right
          color: $color-CCCCCC
          font-size: 12px
          margin-right: 15px
    .media-wrapper
      .media-item
        font-family: PingFangSC-Regular
        layout(row, block, nowrap)
        padding: 20px 0
        .title
          font-size: 14px
          color: #9B9B9B
          margin-right: 24px
          white-space: nowrap
        .content
          .add
            display: block
            width: 64px
            height: @width
            border-radius: 4px
            border-1px($color-9B9B9B, 4px)
            icon-image(icon-addpic02)
            margin-right: 15px
            margin-bottom: 10px
            position: relative
            z-index: 1
            &.un-up
              icon-image('./icon-addpic_un')
              border-1px($color-E6E6E6, 4px)
            &.up
              icon-image('./icon-addpic02')
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
              z-index: 2
          .explain
            font-size: 12px
            color: $color-CCCCCC
            line-height: 1.6
            padding-right: 15px
    .btn-wrapper
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: 64px
      layout()
      align-items: center
      justify-content: center
      padding: 0 15px
      z-index: 80
      background: $color-F6F6F6
      .btn
        height: 44px
        width: 100%
        box-sizing: border-box
        background: #363547
        border-radius: 4px
        font-family: PingFangSC-Regular
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 0.8px
        text-align: center
        line-height: 44px
</style>
