<template>
  <div class="discount-coupon-editor">
    <div class="scroll-wrapper" :style="scrollWrapperStyle">
      <scroll ref="scroll"
              bcColor="#f6f6f6"
              :data="dataArray"
              :showNoMore="false"
              :listenScroll="true"
      >
        <section class="panel-wrapper">
          <header class="header">
            <p>基本信息</p>
            <div @click="helpHandle">
              <base-icon-help></base-icon-help>
            </div>
          </header>
          <nav class="content">
            <label class="item-wrapper border-bottom-1px">
              <div class="left key-icon">优惠券名称</div>
              <div class="middle">
                <input type="text" placeholder="请填写" maxlength="30" v-model="name">
              </div>
            </label>
            <label class="item-wrapper border-bottom-1px" @click="showPickerHandle('USE_TYPE_ARR')">
              <div class="left key-icon">优惠形式</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{USE_TYPE_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
              <input type="button" class="input-empty" onfocus="this.blur()">
            </label>
            <label v-if="isShowDiscount" class="item-wrapper border-bottom-1px">
              <div class="left">折扣</div>
              <div class="middle">
                <p v-if="disableEditor" class="select-placeholder">{{discounts}}</p>
                <input v-else type="number" placeholder="请设置1.0~9.9之间的折扣额度" maxlength="3" v-model="discounts">
              </div>
            </label>
            <label v-else class="item-wrapper border-bottom-1px">
              <div class="left key-icon">优惠金额</div>
              <div class="middle">
                <p v-if="disableEditor" class="select-placeholder">{{discounts}}</p>
                <input v-else type="number" placeholder="请填写" maxlength="15" v-model="discounts">
              </div>
            </label>
            <label class="item-wrapper">
              <div class="left key-icon">发放数量</div>
              <div class="middle">
                <input type="number" placeholder="请填写" maxlength="8" v-model="stock">
              </div>
            </label>
          </nav>
        </section>
        <div style="height: 10px" class="border-bottom-1px border-top-1px"></div>
        <section class="panel-wrapper">
          <header class="header">
            <p>使用设置</p>
          </header>
          <nav class="content">
            <label class="item-wrapper border-bottom-1px">
              <div class="left">使用门槛</div>
              <div class="middle middle-set">
                <p class="p">订单金额满</p>
                <p v-if="disableEditor" class="input-style select-placeholder">{{moneyLimit}}</p>
                <div v-else class="input-style">
                  <input type="number" placeholder="0" maxlength="7" v-model="moneyLimit" @focus="focusHandle" @blur="blurHandle">
                </div>
                <p class="p">元可用</p>
              </div>
            </label>
            <label class="item-wrapper border-bottom-1px" @click="showPickerHandle('STOCK_LIMIT_ARR')">
              <div class="left key-icon">每人限领</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{STOCK_LIMIT_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
              <input type="button" class="input-empty" onfocus="this.blur()">
            </label>
            <label class="item-wrapper" :class="{'border-bottom-1px': isShowSelect}" @click="showPickerHandle('USE_RANGE_ARR')">
              <div class="left key-icon">使用范围</div>
              <div class="middle" :class="{'select-placeholder': disableEditor}">{{USE_RANGE_ARR}}</div>
              <base-icon-arrow></base-icon-arrow>
              <input type="button" class="input-empty" onfocus="this.blur()">
            </label>
            <label v-if="isShowSelect" class="item-wrapper" @click="selectHandle">
              <div class="left">选择商品</div>
              <div class="middle" :class="{'select-placeholder': !selectItem.id  || disableEditor}">{{selectItem.title ||'请选择'}}</div>
              <base-icon-arrow></base-icon-arrow>
            </label>
          </nav>
        </section>
        <div style="height: 10px" class="border-bottom-1px border-top-1px"></div>
        <section class="panel-wrapper">
          <header class="header">
            <p>有效期</p>
          </header>
          <nav class="content">
            <label class="item-wrapper border-bottom-1px" @click="showPickerHandle('startDate')">
              <div class="left key-icon">开始时间</div>
              <div class="middle" :class="{'select-placeholder': !startDate || disableEditor}">{{startDate || '请选择时间'}}</div>
              <base-icon-arrow></base-icon-arrow>
              <input type="button" class="input-empty" onfocus="this.blur()">
            </label>
            <label class="item-wrapper" @click="showPickerHandle('endDate')">
              <div class="left key-icon">结束时间</div>
              <div class="middle" :class="{'select-placeholder': !endDate || disableEditor}">{{endDate || '请选择时间'}}</div>
              <base-icon-arrow></base-icon-arrow>
              <input type="button" class="input-empty" onfocus="this.blur()">
            </label>
          </nav>
        </section>
      </scroll>
    </div>
    <section class="btn-group-wrapper border-top-1px" :style="buttonGroupStyle">
      <div class="footer-btn" @click="submitHandle">保存并发布</div>
      <div v-if="PAGE_CONFIG.hasDisableButton" class="disable-btn" @click="closeHandle">使失效</div>
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
    <coupon-rule ref="rule"></coupon-rule>
    <confirm-msg v-if="disableEditor" ref="confirm" @confirm="confirmHandle"></confirm-msg>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    PAGE_CONFIG,
    PICKER_DATA_OBJ,
    PICKER_RELATION_OBJ,
    USE_TYPE_ARR, STOCK_LIMIT_ARR,
    USE_RANGE_ARR,
    PAGE_TYPE,
    formatPickerDate
  } from './editor-config'
  import * as API from 'api'
  import {RATE, MONEYREG} from 'common/js/utils'
  import CouponRule from './coupon-rule/coupon-rule'
  import Scroll from 'components/scroll/scroll'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'

  const PAGE_NAME = 'DISCOUNT_COUPON_EDITOR'

  export default {
    name: PAGE_NAME,
    components: {
      Scroll,
      CouponRule,
      ConfirmMsg
    },
    data() {
      return {
        dataArray: [],
        PICKER_DATA: PICKER_DATA_OBJ.USE_TYPE_ARR,
        PICKER_TYPE: '',
        USE_TYPE_ARR: USE_TYPE_ARR[0][0],
        STOCK_LIMIT_ARR: STOCK_LIMIT_ARR[0][0],
        USE_RANGE_ARR: USE_RANGE_ARR[0][0],
        CURRENT_PICKER: '',
        PAGE_CONFIG: PAGE_CONFIG[PAGE_TYPE.NEW],
        name: '',
        useType: PICKER_RELATION_OBJ.USE_TYPE_ARR.arr[0].key,
        money: '',
        discounts: '',
        stock: '',
        moneyLimit: 0,
        stockLimit: PICKER_RELATION_OBJ.STOCK_LIMIT_ARR.arr[0].key,
        useRange: PICKER_RELATION_OBJ.USE_RANGE_ARR.arr[0].key,
        selectItem: {},
        startDate: '',
        endDate: '',
        minStock: 0,
        nowTime: Date.now()
      }
    },
    computed: {
      // 按钮样式
      buttonGroupStyle() {
        return `height:${this.PAGE_CONFIG.buttonGroupHeight}px`
      },
      // scroll样式
      scrollWrapperStyle() {
        return `bottom:${this.PAGE_CONFIG.buttonGroupHeight}px`
      },
      // 是否选择商品
      isShowSelect() {
        return this.USE_RANGE_ARR === USE_RANGE_ARR[0][1]
      },
      // 是否为折扣优惠券类型
      isShowDiscount() {
        return this.USE_TYPE_ARR === USE_TYPE_ARR[0][1]
      },
      // 是否为编辑模式
      disableEditor() {
        return this.PAGE_CONFIG === PAGE_CONFIG[PAGE_TYPE.EDITOR]
      },
      // 优惠券名称 检查
      nameReg() {
        return this.name
      },
      // 优惠券折扣或优惠金额 检查
      discountReg() {
        if (this.isShowDiscount) {
          return this.discounts >= 1 && this.discounts <= 9.9
        } else {
          return this.discounts > 0 && MONEYREG.test(this.discounts)
        }
      },
      // 最小库存的 检查
      minStockReg() {
        if (this.disableEditor) {
          return this.stock - this.minStock >= 0
        } else {
          return true
        }
      },
      // 库存 检查
      stockReg() {
        return this.stock > 0 && RATE.test(this.stock)
      },
      // 门槛金额 检查
      moneyLimitReg() {
        return MONEYREG.test(this.moneyLimit)
      },
      // 满减金额不能小于优惠金额
      moneyLimitReg2() {
        if (!this.isShowDiscount && +this.moneyLimit === 0) {
          return true
        } else if (!this.isShowDiscount) {
          return this.moneyLimit - this.discounts > 0
        } else {
          return true
        }
      },
      // 选中的商品/服务的 检查
      selectItemReg() {
        if (this.isShowSelect) {
          return this.selectItem.id
        } else {
          return true
        }
      },
      // 日期的 检查
      startReg() {
        let startDate = this.startDate.replace(/-/g, '/')
        let start = (new Date(startDate)).getTime() + 1000 * 60 * 60 * 24
        if (!this.disableEditor) {
          return start - Date.now() >= 0
        } else {
          return true
        }
      },
      dateReg() {
        let startDate = this.startDate.replace(/-/g, '/')
        let endDate = this.endDate.replace(/-/g, '/')
        let start = (new Date(startDate)).getTime()
        let end = (new Date(endDate)).getTime()
        return end - start > 0
      }
    },
    watch: {
      // 切换优惠形式
      USE_TYPE_ARR() {
        if (this.disableEditor) return
        this.discounts = ''
      }
    },
    created() {
      this._initPageData()
    },
    methods: {
      // 优化门槛金额 聚焦/实效
      focusHandle() {
        let flag = +this.moneyLimit
        if (!flag) {
          this.moneyLimit = ''
        }
      },
      blurHandle() {
        let flag = +this.moneyLimit
        if (!flag) {
          this.moneyLimit = 0
        }
      },
      // 帮助
      helpHandle() {
        this.$refs.rule && this.$refs.rule.showRule()
      },
      // 页面数据初始化
      _initPageData() {
        let {couponId} = this.$route.query
        if (couponId) {
          this.PAGE_CONFIG = PAGE_CONFIG[PAGE_TYPE.EDITOR]
          document.title = this.PAGE_CONFIG.pageTitle
          this._getDetail(couponId)
        } else {
          this._resolvePickerData()
        }
      },
      // 获取详细信息
      _getDetail(couponId) {
        API.Coupon.getDetail({couponId}).then((res) => {
          Object.assign(this.$data, res.data)
          this._resolvePickerData()
        })
      },
      // 将后台数据映射各个选择器的文案
      _resolvePickerData() {
        for (let [dataKey, dataValue] of Object.entries(PICKER_RELATION_OBJ)) {
          let arr = dataValue.arr
          let key = '' + dataValue.key
          let obj = arr.find((val) => '' + val.key === '' + this[key]) || {}
          this[dataKey] = obj.title || arr[0].title
        }
      },
      // 选择商品
      selectHandle() {
        if (this.disableEditor) return
        this.$router.push(this.$route.path + '/choice-goods')
      },
      refresh(e) {
        this._selectItem(e)
      },
      _selectItem(e) {
        if (e && e.id) {
          this.selectItem = e
        }
      },
      // 提交
      submitHandle() {
        if (Date.now() - this.nowTime < 150) {
          return
        }
        this.nowTime = Date.now()
        this._checkForm(() => {
          let data = {
            ...this.$data,
            couponId: this.$route.query.couponId
          }
          API.Coupon[this.PAGE_CONFIG.submitFn](data).then(() => {
            this.$emit('refresh')
            this.$toast.show('发布成功！')
            this.$router.back()
          })
        })
      },
      // 实效
      closeHandle() {
        this.$refs.confirm && this.$refs.confirm.show({msg: '优惠券失效后不可恢复'})
      },
      confirmHandle() {
        if (Date.now() - this.nowTime < 150) {
          return
        }
        this.nowTime = Date.now()
        let {couponId} = this.$route.query
        API.Coupon.close({couponId}).then(() => {
          this.$emit('refresh')
          this.$toast.show('操作成功！')
          this.$router.back()
        })
      },
      // 检验数据有效性
      _checkForm(cb) {
        let arr = [
          {value: this.nameReg, txt: '请输优惠券名称'},
          {value: this.discountReg, txt: '请输入正确的优惠或折扣'},
          {value: this.minStockReg, txt: '发放数量不能少于' + this.minStock},
          {value: this.stockReg, txt: '请输入正确的发放数量'},
          {value: this.moneyLimitReg, txt: '请输入正确的门槛金额'},
          {value: this.moneyLimitReg2, txt: '门槛满减金额不能小于优惠金额'},
          {value: this.selectItemReg, txt: '请选择商品或服务'},
          {value: this.startReg, txt: '开始日期不能小于今天'},
          {value: this.dateReg, txt: '结束日期不能小于开始日期'}
        ]
        let res = this._testPropety(arr)
        res && cb && cb()
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
      // 选择器
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
          let value = e[0].value
          this[this.CURRENT_PICKER] = e[0].value
          // 设置对应的值
          let current = PICKER_RELATION_OBJ[this.CURRENT_PICKER]
          let obj = current.arr.find((val) => val.title === value)
          this[current.key] = obj.key
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
        position :relative
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
