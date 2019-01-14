<template>
  <div class="discount-coupon-editor">
    <div class="scroll-wrapper" :style="scrollWrapperStyle">
      <scroll ref="scroll"
              bcColor="#f6f6f6"
              :data="dataArray"
              :showNoMore="false"
      >
        <section class="panel-wrapper">
          <header class="header">
            <p>基本信息</p>
            <base-icon-help></base-icon-help>
          </header>
          <ul class="content">
            <li class="item-wrapper border-bottom-1px">
              <div class="left key-icon">优惠券名称</div>
              <div class="middle">
                <input type="text" placeholder="请填写" maxlength="30" v-model="name">
              </div>
            </li>
            <li class="item-wrapper border-bottom-1px" @click="showPickerHandle('USE_TYPE_ARR')">
              <div class="left key-icon">优惠形式</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{USE_TYPE_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
            <li v-if="isShowDiscount" class="item-wrapper border-bottom-1px">
              <div class="left">折扣</div>
              <div class="middle">
                <p v-if="disableEditor" class="select-placeholder">{{discount}}</p>
                <input v-else type="tel" placeholder="请设置1.0~9.9之间的折扣额度" maxlength="3" v-model="discount">
              </div>
            </li>
            <li class="item-wrapper border-bottom-1px">
              <div class="left key-icon">优惠金额</div>
              <div class="middle">
                <p v-if="disableEditor" class="select-placeholder">{{money}}</p>
                <input v-else type="tel" placeholder="请填写" maxlength="15" v-model="money">
              </div>
            </li>
            <li class="item-wrapper">
              <div class="left key-icon">发放数量</div>
              <div class="middle">
                <input type="tel" placeholder="请填写" maxlength="8" v-model="stock">
              </div>
            </li>
          </ul>
        </section>
        <div style="height: 10px" class="border-bottom-1px border-top-1px"></div>
        <section class="panel-wrapper">
          <header class="header">
            <p>使用设置</p>
          </header>
          <ul class="content">
            <li class="item-wrapper border-bottom-1px">
              <div class="left key-icon">使用门槛</div>
              <div class="middle middle-set">
                <p class="p">订单金额满</p>
                <p v-if="disableEditor" class="input-style select-placeholder">{{moneyLimit}}</p>
                <input v-else class="input-style" type="tel" placeholder="0" maxlength="7" v-model="moneyLimit">
                <p class="p">元可用</p>
              </div>
            </li>
            <li class="item-wrapper border-bottom-1px" @click="showPickerHandle('STOCK_LIMIT_ARR')">
              <div class="left key-icon">每人限领</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{STOCK_LIMIT_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
            <li class="item-wrapper" :class="{'border-bottom-1px': isShowSelect}" @click="showPickerHandle('USE_RANGE_ARR')">
              <div class="left key-icon">使用范围</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{USE_RANGE_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
            <li v-if="isShowSelect" class="item-wrapper" @click="showSheetHandle">
              <div class="left">选择商品</div>
              <div class="middle" :class="{'select-placeholder': !selectItem  || disableEditor}">{{selectItem ||'请选择'}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
          </ul>
        </section>
        <div style="height: 10px" class="border-bottom-1px border-top-1px"></div>
        <section class="panel-wrapper">
          <header class="header">
            <p>有效期</p>
          </header>
          <ul class="content">
            <li class="item-wrapper border-bottom-1px" @click="showPickerHandle('startDate')">
              <div class="left key-icon">开始时间</div>
              <div class="middle" :class="{'select-placeholder': !startDate || disableEditor}">{{startDate || '请选择时间'}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
            <li class="item-wrapper" @click="showPickerHandle('endDate')">
              <div class="left key-icon">结束时间</div>
              <div class="middle" :class="{'select-placeholder': !endDate || disableEditor}">{{endDate || '请选择时间'}}</div>
              <base-icon-arrow></base-icon-arrow>
            </li>
          </ul>
        </section>
      </scroll>
    </div>
    <section class="btn-group-wrapper border-top-1px" :style="buttonGroupStyle">
      <div class="footer-btn" @click="submitHandle">保存并发布</div>
      <div v-if="PAGE_CONFIG.hasDisableButton" class="disable-btn">使失效</div>
    </section>
    <awesome-picker
      ref="picker"
      :data="PICKER_DATA"
      @confirm="pickerConfirmHandle">
    </awesome-picker>
    <awesome-picker
      ref="pickerDate"
      type="date"
      @confirm="pickerConfirmHandle">
    </awesome-picker>
    <base-sheet ref="sheet" :sheetList="SHEET_LIST" @select="selectHandle"></base-sheet>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import {
    PAGE_CONFIG, SHEET_LIST, PICKER_DATA_OBJ, USE_TYPE_ARR, STOCK_LIMIT_ARR, USE_RANGE_ARR, formatPickerDate, PAGE_TYPE
  } from './editor-config'

  const PAGE_NAME = 'DISCOUNT_COUPON_EDITOR'

  export default {
    name: PAGE_NAME,
    components: {
      Scroll
    },
    data() {
      return {
        SHEET_LIST: SHEET_LIST,
        // pullUpLoad: true,
        // pullUpLoadThreshold: 0,
        // pullUpLoadMoreTxt: '加载更多',
        // pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: new Array(20).fill(1),
        PICKER_DATA: PICKER_DATA_OBJ.USE_TYPE_ARR,
        PICKER_TYPE: '',
        USE_TYPE_ARR: USE_TYPE_ARR[0][0],
        STOCK_LIMIT_ARR: STOCK_LIMIT_ARR[0][0],
        USE_RANGE_ARR: USE_RANGE_ARR[0][0],
        CURRENT_PICKER: '',
        name: '',
        useType: '',
        money: '',
        discount: '',
        stock: '',
        moneyLimit: '',
        stockLimit: '',
        useRange: '',
        selectItem: '',
        startDate: '',
        endDate: ''
      }
    },
    computed: {
      PAGE_CONFIG() {
        return PAGE_CONFIG[PAGE_TYPE.NEW]
      },
      buttonGroupStyle() {
        return `height:${this.PAGE_CONFIG.buttonGroupHeight}px`
      },
      scrollWrapperStyle() {
        return `bottom:${this.PAGE_CONFIG.buttonGroupHeight}px`
      },
      isShowSelect() {
        return this.USE_RANGE_ARR === USE_RANGE_ARR[0][1]
      },
      isShowDiscount() {
        return this.USE_TYPE_ARR === USE_TYPE_ARR[0][1]
      },
      disableEditor() {
        return this.PAGE_CONFIG === PAGE_CONFIG[PAGE_TYPE.EDITOR]
      }
    },
    methods: {
      refresh() {
        // todo
      },
      showSheetHandle() {
        if (this.disableEditor) return
        this.$refs.sheet && this.$refs.sheet.show()
      },
      selectHandle(key) {
        if (this.disableEditor) return
        this.$router.push(this.$route.path + '/discount-coupon-select?key=' + key)
      },
      submitHandle() {
        // todo
      },
      showPickerHandle(pickerType) {
        if (this.disableEditor) return
        this.CURRENT_PICKER = pickerType
        if (pickerType.includes('Date')) {
          this.$refs.pickerDate.show()
        } else {
          this.PICKER_DATA = PICKER_DATA_OBJ[pickerType]
          this.$refs.picker.show()
        }
      },
      pickerConfirmHandle(e) {
        if (this.disableEditor) return
        if (this.CURRENT_PICKER.includes('Date')) {
          this[this.CURRENT_PICKER] = formatPickerDate(e)
        } else {
          this[this.CURRENT_PICKER] = e[0].value
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $button-height=44px
  $button-group-height=120px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import "./editor-style.styl"

  .discount-coupon-editor
    fill-box(fixed)
    z-index :80
    background: $color-F6F6F6

  .panel-wrapper
    .header
      font-family: $font-family-medium
      font-size: 16px;
      color: #000000;
      padding :18.5px 15px 13px
      display :flex
      justify-content :space-between
      align-items :flex-end
      background :$color-white
    .content
      padding-left :15px
      background :$color-white
      .item-wrapper
        height :55px
        padding-right :15px
        font-family: $font-family-regular
        font-size: 14px;
        line-height :1.2
        color: #000000;
        layout(row,block,nowrap)
        align-items :center
        .left
          width :100px
        .middle
          flex:1
          overflow :hidden
          color: #27273E
  .scroll-wrapper
    position :fixed
    top:0
    left :0
    right :0
    bottom: $button-group-height

  .btn-group-wrapper
    position: fixed
    width: 100vw
    height: $button-group-height
    z-index: 60
    bottom: 0
    left: 0
    background: #F6F6F6
    font-family: $font-family-regular
    font-size: $font-size-16
    letter-spacing: 0.8px
    line-height: $button-height
    box-sizing: border-box
    padding: 10px 15px
    .footer-btn
      width: 100%
      height: $button-height
      background: $color-27273E
      border-radius: 2px
      text-align: center
      color: $color-white
    .disable-btn
      margin-top : 10px
      width: 100%
      height: $button-height
      box-sizing :border-box
      border: 1px solid #27273E;
      border-radius: 2px;
      text-align: center
      color: #27273E;
</style>
