<template>
  <div class="editor-service">
    <scroll :bcColor="'#ffffff'" ref="scroll">
      <div class="editor-title border-bottom-1px border-top-1px">
        <div class="title">
          基本信息
          <span v-if="ruleId !== 0" class="msg" @click.stop="showRule"></span>
        </div>
      </div>
      <div class="group-container">
        <div class="editor-item">
          <div class="item-left">活动类型</div>
          <div class="item-right check-right">
            <span class="right-txt" :class="ruleId && type !== 'editor' ? '' : 'gray'">{{activityType[ruleId]}}</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
            <select id="ruleId" v-model='ruleId' class="right-selected" v-if="type !== 'editor'">
              <option v-for="(option, index) in showSelectType" :value="option.id">
                {{ option.value }}
              </option>
            </select>
          </div>
        </div>
        <div class="editor-item border-top-1px">
          <div class="item-left">服务</div>
          <div class="item-right input-right" @click="selectAny('goods')">
            <div class="right-txt" :class="type !== 'editor' ? '' : 'gray'" v-if="activityDetail.goods_title">{{activityDetail.goods_title}}</div>
            <span class="right-txt-placeholder" v-if="!activityDetail.goods_title">请选择</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <label>
          <div class="editor-item border-top-1px">
            <div class="item-left">标题</div>
            <div class="item-right input-right" @click="showTitleModal">
              <div class="right-txt" v-if="activityDetail.activity_name">{{activityDetail.activity_name}}</div>
              <span class="right-txt-placeholder" v-if="!activityDetail.activity_name">请填写</span>
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 3">
            <div class="item-left">底价</div>
            <div class="item-right">
              <input type="number" class="input-box" :class="type === 'editor' ? 'disabled' : ''" v-model="activityDetail.config.bottom_price" placeholder="请填写" :disabled="type === 'editor'">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 3">
            <div class="item-left">砍价次数</div>
            <div class="item-right check-right">
              <span class="right-txt" :class="type !== 'editor' ? activityDetail.config.max_cut_num ? '' : 'gray' : 'gray'">{{activityDetail.config.max_cut_num ? activityDetail.config.max_cut_num : '请选择'}}</span>
              <img src="./icon-press_right@2x.png" class="arrow-icon">
              <select v-model='activityDetail.config.max_cut_num' class="right-selected" v-if="type !== 'editor'">
                <option v-for="(option, index) in showBraginCount" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 1">
            <div class="item-left">拼团价</div>
            <div class="item-right">
              <input type="number" class="input-box" :class="type === 'editor' ? 'disabled' : ''" v-model="activityDetail.config.group_price" placeholder="请填写" :disabled="type === 'editor'">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 1">
            <div class="item-left">拼团人数</div>
            <div class="item-right check-right">
              <span class="right-txt" :class="type !== 'editor' ? activityDetail.config.group_number ? '' : 'gray' : 'gray'">{{activityDetail.config.group_number ? activityDetail.config.group_number : '请选择'}}</span>
              <img src="./icon-press_right@2x.png" class="arrow-icon">
              <select v-model='activityDetail.config.group_number' class="right-selected" v-if="type !== 'editor'">
                <option v-for="(option, index) in showGroupCount" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 3">
            <div class="item-left">库存</div>
            <div class="item-right check-right">
              <span class="right-txt" :class="activityDetail.goods_id ? activityDetail.stock ? '' : 'gray' : 'gray'">{{activityDetail.goods_id ? activityDetail.stock ? activityDetail.stock : '请选择' : '请先选择商品'}}</span>
              <img src="./icon-press_right@2x.png" class="arrow-icon">
              <select v-model='activityDetail.stock' class="right-selected" :disabled="!activityDetail.goods_id">
                <option v-for="(option, index) in showBraginStock" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px" v-if="ruleId == 1">
            <div class="item-left">库存</div>
            <div class="item-right">
              <input type="number" class="input-box" v-model="activityDetail.stock" :placeholder="activityDetail.goods_id ? '请填写' : '请先选择商品'" :disabled="!activityDetail.goods_id">
            </div>
          </div>
        </label>
      </div>
      <div class="group-container no-padding">
        <div class="editor-img-item border-top-1px">
          <div class="item-title need-no">活动封面 <span class="item-subtitle">建议尺寸600*480,大小10M以内，最多3张</span></div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="!activityDetail.image_url"></div>
                <base-wx-input class="img-bc image-file" @change="_fileImage($event)" accept="image/*" v-if="!activityDetail.image_url"></base-wx-input>
              </div>
            </div>
            <div class="container-item" v-if="activityDetail.image_url">
              <div class="img-box">
                <div class="img-show" v-if="activityDetail.image_url" :style="{backgroundImage: 'url(' + activityDetail.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="activityDetail.image_url" @click.stop="delBanner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="editor-title border-bottom-1px border-top-1px">
        <div class="title">活动时间</div>
      </div>
      <div class="group-container border-bottom-1px">
        <label>
          <div class="editor-item">
            <div class="item-left">开始时间</div>
            <div class="item-right">
              <input type="text" class="input-box" :class="{'no-click': (type === 'editor')}" @click="chioseTime('sale1')" v-model="activityDetail.start_at" readonly placeholder="请选择时间">
            </div>
          </div>
        </label>
        <label>
          <div class="editor-item border-top-1px">
            <div class="item-left">结束时间</div>
            <div class="item-right">
              <input type="text" class="input-box" @click="chioseTime('sale2')" v-model="activityDetail.end_at" readonly placeholder="请选择时间">
            </div>
          </div>
        </label>
      </div>
      <div class="group-container border-bottom-1px" v-if="ruleId == 3">
        <div class="editor-item"  @click="selectAny('prize')">
          <div class="item-left large">设置兑换券</div>
          <div class="item-right input-right">
            <div class="right-txt" :class="type !== 'editor' ? '' : 'gray'" v-if="activityDetail.coupon_title">{{activityDetail.coupon_title}}</div>
            <span class="right-txt-placeholder" v-if="!activityDetail.coupon_title">成功砍价可领取</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
      </div>
      <div class="last-box"></div>
    </scroll>
    <title-box ref="titleBox" @submitMsg="submitTile"></title-box>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">保存并发布</div>
    </div>
    <awesome-picker
      ref="picker"
      type="date"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
    <activity-rule ref="activityRule"></activity-rule>
    <div class="disabled-cover" @click.stop="" v-if="disabledCover"></div>
    <router-view-common @refresh="refresh"></router-view-common>
    <cropper ref="cropper" @confirm="cropperConfirm"></cropper>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleBox from 'components/title-box/title-box'
  import Scroll from 'components/scroll/scroll'
  import DetailModal from 'components/service-detail-modal/service-detail-modal'
  import SwitchBox from 'components/switch-box/switch-box'
  import Cropper from 'components/cropper/cropper'
  import ActivityRule from 'components/activity-rule/activity-rule'
  import { ActivityApi } from 'api'

  const ACTIVITY_TYPE = {
    0: '请选择',
    1: '火爆拼团',
    3: '砍价抢购'
  }
  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/
  export default {
    data() {
      return {
        type: 'new',
        id: '',
        ruleId: 0,
        optionsType: [
          {value: '请选择', id: 0},
          {value: '火爆拼团', id: 1},
          {value: '砍价抢购', id: 3}
        ],
        activityType: ACTIVITY_TYPE,
        disabledCover: false, // 请求时禁止任何操作
        timeType: '',
        braginStock: ['', 1, 2, 3, 5, 10],
        braginCount: ['', 10, 20, 30, 50, 100],
        groupCount: ['', 2, 3, 5],
        activityDetail: {
          goods_id: '',
          goods_title: '',
          activity_name: '',
          // goods_price: '',
          config: {
            original_price: '',
            bottom_price: '',
            max_cut_num: '',
            group_validity: 24,
            group_number: '',
            group_price: ''
          },
          stock: '',
          is_sync: 1,
          commission_rate: '0',
          start_at: '',
          end_at: '',
          image_id: '',
          image_url: '',
          coupon_id: '',
          coupon_title: ''
        }
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      this.ruleId = +this.$route.query.ruleId
      if (this.id) {
        this._getDetail(this.id)
      }
    },
    methods: {
      refresh(item, type) {
        switch (type) {
          case 'goods':
            this.activityDetail.goods_id = item.id
            this.activityDetail.goods_title = item.title
            this.activityDetail.config.original_price = item.platform_price
            break
          case 'prize':
            this.activityDetail.coupon_id = item.id
            this.activityDetail.coupon_title = item.title
            break
        }
      },
      showRule() {
        this.$refs.activityRule.showRule(this.ruleId)
      },
      selectAny(type) {
        if (!this.ruleId) {
          this.$toast.show('请先选择活动类型')
          return
        }
        if (this.type === 'editor') return
        let url = `${this.$route.path}/choice-goods?type=${type}&ruleId=${this.ruleId}&goodsId=${this.activityDetail.goods_id}`
        this.$router.push(url)
      },
      showTitleModal() {
        let obj = {
          text: this.activityDetail.activity_name,
          title: 'null',
          placeholder: '请输入活动标题'
        }
        this.$refs.titleBox.showTitleBox(obj)
      },
      submitTile(txt) {
        this.activityDetail.activity_name = txt
      },
      _getDetail(id) {
        if (+this.ruleId === 1) {
          this._getGroupDetail(id)
        } else if (+this.ruleId === 3) {
          this._getKanDetail(id)
        }
      },
      _getGroupDetail(id) {
        ActivityApi.getGroup(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.activityDetail = Object.assign({}, this.serviceDetail, res.data)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _getKanDetail(id) {
        ActivityApi.getBargain(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.activityDetail = Object.assign({}, this.serviceDetail, res.data)
            let idx = this.braginStock.indexOf(this.activityDetail.stock)
            if (idx < 0) {
              this.braginStock.push(this.activityDetail.stock)
              this.braginStock = this.braginStock.sort(function (a, b) {
                return a - b
              })
            }
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _fileImage(e) {
        let arr = Array.from(e.target.files)
        if (arr.length > 0) {
          this.$refs.cropper.show(arr[0])
        }
      },
      async cropperConfirm(e) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        this.activityDetail.image_url = res.data.url
        this.activityDetail.image_id = res.data.id
        this.$loading.hide()
        this.$refs.cropper.cancel()
      },
      delBanner() {
        this.activityDetail.image_url = ''
        this.activityDetail.image_id = ''
      },
      chioseTime(type) {
        if (this.type === 'editor' && (type === 'sale1')) return
        this.timeType = type
        this.$refs.picker.show()
      },
      pickerCancel() {
      },
      pickerConfirm(e) {
        let reg = /[\u4E00-\u9FA5]/g
        let arr = e.map(item => {
          return item.value.replace(reg, '').replace(/\b\d\b/g, '0$&')
        })
        let res = arr.join('-')
        switch (this.timeType) {
          case 'sale1':
            this.activityDetail.start_at = res
            break
          case 'sale2':
            this.activityDetail.end_at = res
            break
        }
      },
      switchChange(res) {
        this.activityDetail.is_sync = res ? 1 : 0
      },
      _newGroupOn() {
        ActivityApi.newGroupMsg(this.activityDetail).then((res) => {
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
      _setGroupOn() {
        this.activityDetail.is_online = 1
        ActivityApi.editGroupMsg(this.id, this.activityDetail).then((res) => {
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
      _newBargain() {
        ActivityApi.newBargainMsg(this.activityDetail).then((res) => {
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
      _setBargain() {
        this.activityDetail.is_online = 1
        ActivityApi.editBargainMsg(this.id, this.activityDetail).then((res) => {
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
      submitAll() {
        if (this.disabledCover) return
        this.disabledCover = true
        this.checkForm()
      },
      checkForm() {
        if (!this.ruleId) {
          this.$toast.show('请先选择活动类型')
          this.disabledCover = false
          return
        }
        let arr
        if (+this.ruleId === 1) {
          arr = [
            {value: this.goodsReg, txt: '请先选择好参与活动的商品'},
            {value: this.titleReg, txt: '请输入活动标题'},
            {value: this.groupPrizeReg, txt: '请输入合法的拼团价'},
            {value: this.groupNumReg, txt: '请选择拼团人数'},
            {value: this.stockReg, txt: '请选择或输入合法的库存数量'},
            {value: this.use1TimeReg, txt: '请选择活动开始时间'},
            {value: this.use2TimeReg, txt: '请选择活动结束时间'}
          ]
        } else if (+this.ruleId === 3) {
          arr = [
            {value: this.goodsReg, txt: '请先选择好参与活动的商品'},
            {value: this.titleReg, txt: '请输入活动标题'},
            {value: this.bottomReg, txt: '请输入合法的底价'},
            {value: this.kanNumReg, txt: '请选择砍价次数'},
            {value: this.stockReg, txt: '请选择或输入合法的库存数量'},
            {value: this.use1TimeReg, txt: '请选择活动开始时间'},
            {value: this.use2TimeReg, txt: '请选择活动结束时间'},
            {value: this.couponReg, txt: '请选择帮砍人兑换券'}
          ]
        }
        let res = this._testPropety(arr)
        if (res) {
          switch (this.type) {
            case 'new':
              if (+this.ruleId === 1) {
                this._newGroupOn()
              } else if (+this.ruleId === 3) {
                this._newBargain()
              }
              break
            case 'editor':
              if (+this.ruleId === 1) {
                this._setGroupOn()
              } else if (+this.ruleId === 3) {
                this._setBargain()
              }
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
      goodsReg() {
        return this.activityDetail.goods_title && this.activityDetail.goods_id
      },
      titleReg() {
        return this.activityDetail.activity_name
      },
      stockReg() {
        return this.activityDetail.stock && COUNTREG.test(this.activityDetail.stock)
      },
      use1TimeReg() {
        return this.activityDetail.start_at
      },
      use2TimeReg() {
        return this.activityDetail.end_at
      },
      bottomReg() {
        return this.activityDetail.config.bottom_price && MONEYREG.test(this.activityDetail.config.bottom_price)
      },
      kanNumReg() {
        return this.activityDetail.config.max_cut_num
      },
      groupPrizeReg() {
        return this.activityDetail.config.group_price && MONEYREG.test(this.activityDetail.config.group_price)
      },
      groupNumReg() {
        return this.activityDetail.config.group_number
      },
      couponReg() {
        return this.activityDetail.coupon_id
      },
      showSelectType() {
        if (this.ruleId) {
          return this.optionsType.filter((item) => {
            return item.id
          })
        } else {
          return this.optionsType
        }
      },
      showBraginStock() {
        if (this.activityDetail.stock) {
          return this.braginStock.filter((item) => {
            return item
          })
        } else {
          return this.braginStock
        }
      },
      showBraginCount() {
        if (this.activityDetail.config.max_cut_num) {
          return this.braginCount.filter((item) => {
            return item
          })
        } else {
          return this.braginCount
        }
      },
      showGroupCount() {
        if (this.activityDetail.config.group_number) {
          return this.groupCount.filter((item) => {
            return item
          })
        } else {
          return this.groupCount
        }
      }
    },
    components: {
      TitleBox,
      Scroll,
      DetailModal,
      SwitchBox,
      Cropper,
      ActivityRule
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
    .last-box
      height: 82px
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
        .msg
          width: 20px
          height: 20px
          background: $color-F9F9F9
          border-radius: 20px
          bg-image(icon-rule)
          background-size: 100% 100%
    .group-container
      width: 100vw
      padding-left: 15px
      box-sizing: border-box
      background: $color-white
    .no-padding
      padding-left: 0
      transition: all 0.3s
      .server-list
        overflow: hidden
        animation: show 0.6s
    .text-item
      padding-right: 15px
      .item-title
        line-height: 38px
        padding-top: 6px
        font-size: $font-size-14
        color: $color-27273E
        font-family: $font-family-medium
      .item-txt
        font-family: $font-family-regular
        color: $color-696771
        font-size: $font-size-14
        line-height: 21px
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
        &.large
          width: 110px
      .item-right
        flex: 1
        height: 55px
        line-height: 55px
        font-size: 0
        overflow: hidden
        display: flex
        align-items: center
        position: relative
        .right-selected
          position: absolute
          width: 100%
          height: 50px
          left: 0
          top: 0
          opacity: 0
        .select-right
          layout(row)
          align-items: center
          .selecet-data
            font-size: $font-size-14
            color: $color-20202E
            font-family: $font-family-regular
        .select-right-active
          flex: 1
        .right-txt
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
          color: $color-27273E
          width: 100%
          height: 55px
          flex: 1
          no-wrap()
          &.gray
            color: $color-CCCCCC
        .right-txt-placeholder
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-CCCCCC
          flex: 1
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
          &.disabled
            color: $color-CCCCCC
        .input-box::-webkit-input-placeholder
          color: $color-CCCCCC
        .input-box::-ms-input-placeholder
          color: $color-CCCCCC
        .input-box::-moz-placeholder
          color: $color-CCCCCC
        .input-box:disabled
          background: $color-white
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
    .editor-img-item
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
      .need-no:before
        content: ''
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
          height: 100%
          outline: none
          padding: 0
          margin: 0
          line-height: 55px
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
      color: $color-27273E
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
          color: $color-27273E
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
            color: $color-CCCCCC
        .num-input:disabled
          background: $color-white
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
</style>
