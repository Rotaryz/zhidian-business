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
              <input class="middle active" type="tel" v-model="shopInfo.telephone" maxlength="11" placeholder="请输入您的联系电话">
            </article>
            <article class="base-item border-bottom-1px">
              <div class="left">微信号</div>
              <input class="middle active" type="" v-model="shopInfo.employee.weixin_no"  placeholder="请输入您的微信号">
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
              <div class="left">地区信息</div>
              <div class="middle" v-if="!shopInfo.province">请选择门店的地区信息</div>
              <div class="middle active" v-else>{{formatPCA}}</div>
              <div class="right right-location" @click.stop="chooseLocation"></div>
            </article>
            <article class="base-item border-bottom-1px" @click="showTitleModal('address')">
              <div class="left">详细地址</div>
              <div class="middle-address" v-if="!shopInfo.address">请输入门店的街道门牌</div>
              <div class="middle-address active" v-else>
                <p class="detail">{{shopInfo.address}}</p>
              </div>
              <div v-if="shopInfo.address && shopInfo.address.length>0" class="right right-del" @click.stop="delAddress"></div>
            </article>
            <article class="base-item">
              <div class="left">营业时间</div>
              <figure class="time-item" @click="choosePicker('opening_hours','start')">
                <div class="time">{{start}}</div>
                <div class="right-arrow"></div>
              </figure>
              <div class="cut-line">至</div>
              <figure class="time-item" @click="choosePicker('opening_hours', 'end')">
                <div class="time">{{end}}</div>
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
                  <div class="img-show" v-if="shopInfo.logo.url" :style="{backgroundImage: 'url(' + shopInfo.logo.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.logo.url" @click.stop="delDetail('logo')"></div>
                  <base-wx-input v-if="!shopInfo.logo.url"  style="display: none" @change="_fileChange($event, 'logo')"
                                 accept="image/*"></base-wx-input>
                </label>
                <div class="explain one">点击图片预览实际展示效果</div>
                <div class="explain">添加1张图片（尺寸200*200，大小2M以下）</div>
              </figure>
            </article>
            <article class="media-item border-bottom-1px">
              <div class="title">门店封面</div>
              <figure class="content">
                <label class="add">
                  <div class="img-show" v-if="shopInfo.cover.url" :style="{backgroundImage: 'url(' + shopInfo.cover.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.cover.url" @click.stop="delDetail('cover')"></div>
                  <base-wx-input v-if="!shopInfo.logo.cover"  style="display: none" @change="_fileChange($event, 'cover')"
                                 accept="image/*"></base-wx-input>
                </label>
                <div class="explain one">点击图片预览实际展示效果</div>
                <div class="explain">添加1张图片（尺寸750*320，大小2M以下）</div>
              </figure>
            </article>
            <article class="media-item border-bottom-1px">
              <div class="title">门店视频</div>
              <figure class="content">
                <label class="add">
                  <div class="img-show" v-if="shopInfo.video.url" :style="{backgroundImage: 'url(' + shopInfo.video.url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.video.url" @click.stop="delDetail('video')"></div>
                  <div class="video-mask" v-if="shopInfo.video.url">
                    <div class="icon-btn"/>
                  </div>
                  <input type="file" v-if="!shopInfo.video || !shopInfo.video.url" style="display: none" @change="_fileChange($event, 'video')"
                                 accept="video/*">
                </label>
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
                  <div class="img-show" v-if="shopInfo.images[index]" :style="{backgroundImage: 'url(' + shopInfo.images[index].url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                  <div class="del-icon" v-if="shopInfo.images[index]" @click.stop="delDetail(index)"></div>
                  <base-wx-input v-if="shopInfo.images && shopInfo.images.length == index" style="display: none" @change="_fileChange($event, 'images')"
                                 accept="image/*"></base-wx-input>
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
    <cropper ref="cropper-shop_cover" @confirm="cropperConfirm($event ,'cover')" :aspect="720/320"></cropper>
    <router-view-common @refresh="refresh"></router-view-common>
  </form>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import TitleBox from 'components/title-box/title-box'
  import { checkIsPhoneNumber, cityData, getAddress } from 'common/js/utils'
  import { Mine } from 'api'
  import Cropper from 'components/cropper/cropper'
  import VueCropper from 'vue-cropperjs'

  const DEFAULT_INDUSTRY = '美业'
  const industryArr = [
    [DEFAULT_INDUSTRY]
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
          weixin: '',
          industry_name: DEFAULT_INDUSTRY, // 行业名称
          area: '',
          city: '',
          province: '',
          longitude: 0,
          latitude: 0,
          address: '', // 门店地址
          opening_hours: {}, // 营业时间
          logo: {}, // 门店logo
          cover: {}, // 门店封面
          video: {}, // 门店视频
          images: [], // 门店图片
          employee: {
            weixin_no: ''
          }
        },
        start: '9:00',
        end: '21:00',
        cityData,
        industryArr,
        pickerType: '',
        timeType: '',
        visible: false
      }
    },
    created() {
      this._getShopInfo()
    },
    mounted() {
      this.$refs.scroll && this.$refs.scroll.refresh()
    },
    beforeRouteLeave(to, from, next) {
      this.$emit('refresh')
      next(true)
    },
    methods: {
      refresh(loc) {
        this._handler(loc)
      },
      chooseLocation() {
        this.$router.push(this.$route.path + '/map-picker')
      },
      delAddress() {
        this.shopInfo.address = ''
      },
      _handler(event) {
        let ctx = this
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        let loc = event
        if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          ctx.shopInfo.longitude = loc.latlng.lng
          ctx.shopInfo.latitude = loc.latlng.lat
          let address = loc.poiaddress + loc.poiname
          let location = loc.latlng.lng + ',' + loc.latlng.lat
          ctx.$loading.show()
          getAddress(location).then(res => {
            ctx.$loading.hide()
            let data = res.data.regeocode.addressComponent
            ctx.shopInfo.province = data.province && data.province.toString()
            ctx.shopInfo.city = data.city && data.city.toString()
            ctx.shopInfo.area = data.district && data.district.toString()
            let newAddress = /我的位置/.test(address) ? address.split('我的位置')[0] : address.split(data.province + data.city + data.district)[1]
            ctx.shopInfo.address = newAddress
          })
        }
      },
      _getShopInfo() {
        Mine.getShopInfo().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          res.data.video = res.data.video ? res.data.video : {}
          res.data.logo = res.data.logo ? res.data.logo : {}
          res.data.cover = res.data.cover || {}
          Object.assign(this.shopInfo, res.data)
          if (this.shopInfo.opening_hours.start) {
            this.start = this.shopInfo.opening_hours.start
          }
          if (this.shopInfo.opening_hours.end) {
            this.end = this.shopInfo.opening_hours.end
          }
          this.$refs.scroll && this.$refs.scroll.refresh()
        })
      },
      _updateShopInfo() {
        Mine.updateShopInfo(this.shopInfo).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$loading.hide()
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('保存成功')
          this.$emit('refresh')
          this.$router.go(-1)
        })
      },
      _fileChange(e, flag) {
        let arr = Array.from(e.target.files)
        if (arr.length < 1) return
        flag === 'images' && this.$refs['cropper-shop_images'].show(arr[0])
        flag === 'logo' && this.$refs['cropper-shop_logo'].show(arr[0])
        flag === 'cover' && this.$refs['cropper-shop_cover'].show(arr[0])
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
            this.shopInfo.video = res.data
          }).catch(err => {
            this.$toast.show(err)
          })
        }
      },
      delDetail(index) {
        if (index === 'logo') {
          this.shopInfo.logo = ''
          return
        }
        if (index === 'video') {
          this.shopInfo.video = ''
          return
        }
        if (index === 'cover') {
          this.shopInfo.cover = ''
          return
        }
        this.shopInfo.images.splice(index, 1)
      },
      async cropperConfirm(e, type) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        if (res.error !== this.$ERR_OK) {
          return this.$toast.show(res.message)
        }
        let obj = {
          image_id: res.data.id,
          url: res.data.url,
          id: res.data.id
        }
        switch (type) {
          case 'logo' :
            this.shopInfo.logo = obj
            this.$refs['cropper-shop_logo'].cancel()
            break
          case 'cover':
            this.shopInfo.cover = obj
            this.$refs['cropper-shop_cover'].cancel()
            break
          default:
            this.shopInfo.images.push(obj)
            this.$refs['cropper-shop_images'].cancel()
            break
        }
        this.$loading.hide()
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
          case 'address':
            obj = {
              type,
              text: this.shopInfo[type],
              title: '详细地址',
              placeholder: '请输入门店的街道门牌',
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
              this.start = arr
            } else {
              this.end = arr
            }
            break
          case 'address':
            arr = []
            for (let i = 0; i < e.length; i++) {
              e[i].value && arr.push(e[i].value)
            }
            this.shopInfo.province = e[0].value
            this.shopInfo.city = e[1].value
            this.shopInfo.area = e[2].value
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
          {value: this.addressReg, txt: '请选择您的门店所在的区域'},
          {value: this.addressDetailReg, txt: '请输入您的门店的详细地址'},
          {value: this.openHoursReg, txt: '请选择您的营业时间'},
          {value: this.shopLogoReg, txt: '请添加门店logo'},
          {value: this.shopCoverReg, txt: '请添加门店封面'},
          // {value: this.shopVideoReg, txt: '请添加门店视频'},
          {value: this.locationReg, txt: '请选择地理位置'},
          {value: this.shopImagesReg, txt: '请添加至少一张门店图片'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this._updateShopInfo()
        } else {
          this.$loading.hide()
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
      saveBtn() {
        this.shopInfo.opening_hours = {start: this.start, end: this.end}
        this._checkForm()
      }
    },
    computed: {
      formatPCA() {
        let province = this.shopInfo.province + ' ' || ''
        let city = this.shopInfo.city + ' ' || ''
        let area = this.shopInfo.area || ''
        return province + city + area
      },
      locationReg() {
        return this.shopInfo.latitude || this.shopInfo.longitude
      },
      shopImagesReg() {
        return this.shopInfo.images.length > 0
      },
      shopVideoReg() {
        return this.shopInfo.video && this.shopInfo.video.url
      },
      shopLogoReg() {
        return this.shopInfo.logo && this.shopInfo.logo.url
      },
      shopCoverReg() {
        return this.shopInfo.cover && this.shopInfo.cover.url
      },
      shopImagesLen() {
        return Math.min(this.shopInfo.images.length + 1, 10)
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
        return this.formatPCA
      },
      addressDetailReg() {
        return this.shopInfo.address
      },
      openHoursReg() {
        return this.shopInfo.opening_hours.start && this.shopInfo.opening_hours.end
      }
    },
    watch: {
      'shopInfo.weixin'(val, oldVal) {
        val = val.match(/[^\u4e00-\u9fa5]+/) ? val.match(/[^\u4e00-\u9fa5]+/) : ''
        this.shopInfo.weixin = val[0] ? val[0].replace(/^\s+|\s+$/g, '') : val
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .map-picker
    position fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 499

  input
    height: 24px
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

  .right-del
    width: 17px
    height: 17px
    icon-image(icon-del34)
    margin-right: 15px
    extend-click()

  .right-location
    width: 13px
    height: 17px
    icon-image(icon-address)
    margin-right: 15px
    extend-click()

  .shop-info
    fill-box()
    z-index: 20
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
        min-height: 55.5px
        font-family: PingFangSC-Regular
        font-size: 14px
        layout(row)
        align-items: center
        .time-item
          layout(row)
          height: 100%
          align-items: center
          .time
            color: $color-27273E
            margin-right: 5px
            &:first-child
              margin-left: 24px
        .cut-line
          color: $color-9B9B9B
          margin: 0 6px 0 15px
        .left
          width: 60px
          color: $color-9B9B9B
        .middle
          flex: 1
          color: $color-CCCCCC
          padding: 0 24px
          line-height: 1.2
          overflow: hidden
          no-wrap()
          &.active
            color: $color-27273E
        .middle-address
          flex: 1
          color: $color-CCCCCC
          padding: 10px 14px 10px 24px
          line-height: 1.2
          &.active
            color: $color-27273E
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
              &.video
                width: 64px
                height: @width
            .del-icon
              width: 16px
              height: 16px
              position: absolute
              right: -6px
              top: -6px
              icon-image('./icon-del24')
              z-index: 2
            .video-mask
              fill-box(absolute)
              background: transparent
              z-index: 1
              layout()
              justify-content: center
              align-items: center
              .icon-btn
                icon-image(icon-video)
                transform: scale(0.5)
                width: 50px
                height: 50px
                border-radius: 50%
                border: 1px solid $color-FFFFFF
                box-sizing: border-box
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
        background: #27273E
        border-radius: 4px
        font-family: PingFangSC-Regular
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 0.8px
        text-align: center
        line-height: 44px
</style>
