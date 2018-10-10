<template>
  <div class="editor-service">
    <scroll :bcColor="'#ffffff'" ref="scroll">
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">活动类型</div>
          <div class="item-right check-right">
            <span class="right-txt" :class="ruleId && type !== 'editor' ? '' : 'gray'">{{activityType[ruleId]}}</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
            <select v-model='ruleId' class="right-selected" v-if="type !== 'editor'">
              <option v-for="(option, index) in showSelectType" :value="option.id">
                {{ option.value }}
              </option>
            </select>
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">选择商品</div>
          <div class="item-right input-right" @click="selectAny('goods')">
            <div class="right-txt" :class="type !== 'editor' ? '' : 'gray'" v-if="activityDetail.goods_title">{{activityDetail.goods_title}}</div>
            <span class="right-txt-placeholder" v-if="!activityDetail.goods_title">请选择</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">活动标题</div>
          <div class="item-right input-right" @click="showTitleModal">
            <div class="right-txt" v-if="activityDetail.activity_name">{{activityDetail.activity_name}}</div>
            <span class="right-txt-placeholder" v-if="!activityDetail.activity_name">请输入</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
        <div class="editor-img-item border-bottom-1px">
          <div class="item-title">活动封面 (选填)</div>
          <div class="img-container">
            <div class="container-item">
              <div class="img-box">
                <div class="img-bc un-up"></div>
                <div class="img-bc up" v-if="!activityDetail.image_url"></div>
                <input type="file" class="img-bc image-file" @change="_fileImage($event)" accept="image/*" v-if="!activityDetail.image_url">
              </div>
            </div>
            <div class="container-item" v-if="activityDetail.image_url">
              <div class="img-box">
                <div class="img-show" v-if="activityDetail.image_url" :style="{backgroundImage: 'url(' + activityDetail.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <div class="del-icon" v-if="activityDetail.image_url" @click.stop="delBanner"></div>
              </div>
            </div>
          </div>
          <div class="item-subtitle">可上传一张具有活动气息的照片</div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px">
          <div class="item-left">现价</div>
          <div class="item-right check-right">
            <span class="right-txt gray" v-if="!activityDetail.goods_id">请先选择商品</span>
            <span class="right-txt" v-if="activityDetail.goods_id">{{activityDetail.goods_price}}</span>
          </div>
        </div>
        <div class="editor-item border-bottom-1px" v-if="ruleId == 3">
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
        <div class="editor-item border-bottom-1px" v-if="ruleId == 1">
          <div class="item-left">库存</div>
          <div class="item-right">
            <input type="number" class="input-box" v-model="activityDetail.stock" :placeholder="activityDetail.goods_id ? '请输入' : '请先选择商品'" :disabled="!activityDetail.goods_id">
          </div>
        </div>
        <div class="editor-item border-bottom-1px">
          <div class="item-left">活动时间</div>
          <div class="item-right time-right">
            <div class="time-right-first" @click="chioseTime('sale1')">
              <div class="time-none" v-if="!activityDetail.start_at">
                <div class="time-item">开始时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" :class="type === 'editor' ? 'disabled' : ''" v-if="activityDetail.start_at">{{activityDetail.start_at}}</div>
            </div>
            <div class="meddle-time">至</div>
            <div class="time-right-first" @click="chioseTime('sale2')">
              <div class="time-none" v-if="!activityDetail.end_at">
                <div class="time-item">结束时间</div>
                <img src="./icon-press_right@2x.png" class="time-icon">
              </div>
              <div class="time-txt" v-if="activityDetail.end_at">{{activityDetail.end_at}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin-box-10px" v-if="ruleId"></div>
      <div class="group-container">
        <div class="editor-item border-bottom-1px" v-if="ruleId == 3">
          <div class="item-left">底价</div>
          <div class="item-right">
            <input type="number" class="input-box" :class="type === 'editor' ? 'disabled' : ''" v-model="activityDetail.config.bottom_price" placeholder="能砍到的最低价格" :disabled="type === 'editor'">
          </div>
        </div>
        <div class="editor-item" v-if="ruleId == 3">
          <div class="item-left">砍价人数</div>
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
        <div class="editor-item border-bottom-1px" v-if="ruleId == 1">
          <div class="item-left">团购价</div>
          <div class="item-right">
            <input type="number" class="input-box" :class="type === 'editor' ? 'disabled' : ''" v-model="activityDetail.config.group_price" placeholder="成团时的商品价格" :disabled="type === 'editor'">
          </div>
        </div>
        <div class="editor-item" v-if="ruleId == 1">
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
      </div>
      <div class="margin-box-10px" v-if="ruleId == 3"></div>
      <div class="group-container" v-if="ruleId == 3">
        <div class="editor-item border-bottom-1px">
          <div class="item-left large">帮砍人兑换券</div>
          <div class="item-right input-right" @click="selectAny('prize')">
            <div class="right-txt" :class="type !== 'editor' ? '' : 'gray'" v-if="activityDetail.coupon_title">{{activityDetail.coupon_title}}</div>
            <span class="right-txt-placeholder" v-if="!activityDetail.coupon_title">请选择</span>
            <img src="./icon-press_right@2x.png" class="arrow-icon">
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container">
        <div class="royalty-item">
          <div class="item-left">活动提成</div>
          <div class="item-right">
            <div class="right-num-box">
              <input type="number" class="num-input" v-model="activityDetail.commission_rate" :class="type === 'editor' ? 'disabled' : ''" :disabled="type === 'editor'">
            </div>
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
            <switch-box @switchChange="switchChange" :values="activityDetail.is_sync * 1"></switch-box>
          </div>
        </div>
      </div>
      <div class="margin-box-10px"></div>
      <div class="group-container" v-if="ruleId == 3">
        <div class="text-item">
          <p class="item-title">1.什么是砍价抢购？</p>
          <p class="item-txt">疯狂砍价是由商家发起的一种营销类活动，商家可添加商品，设置能砍到的底价和砍到底价所需次数。用户若想以底价购买该商品，可邀请好友一起砍价，每次砍价金额随机。</p>
        </div>
        <div class="text-item">
          <p class="item-title">2.砍掉后的价格是否对所有用户有效？</p>
          <p class="item-txt">是的。所有用户可对同一个商品进行砍价，并享有砍掉后的商品价格，如商品A现价100元，当某用户砍掉2元后，所有人看到的现价更新为98元，并可在98元的基础上再进行砍价，直到砍到底价为止。</p>
        </div>
        <div class="text-item">
          <p class="item-title">3.未砍到底价时，用户能否购买？</p>
          <p class="item-txt">能购买，如商品A现价100元，底价10元，当被砍到80元时，若某用户认为已达自己的可接受价位，即可下单购买（为突出商品稀有性，建议商家添加的数量在1-3个）。</p>
        </div>
        <div class="text-item">
          <p class="item-title">4.用户一次能购买几件商品？</p>
          <p class="item-txt">同一个用户一次下单只能购买一件商品。</p>
        </div>
        <div class="text-item">
          <p class="item-title">5.砍价商品设置错了怎么办？</p>
          <p class="item-txt">商家可在砍价列表页删除该商品，删除后所有用户不能对该商品进行砍价，已下单但未支付的用户不能再进行支付，已支付的用户不受影响。</p>
        </div>
      </div>
      <div class="group-container" v-if="ruleId == 1">
        <div class="text-item">
          <p class="item-title">1.什么是火爆拼团？</p>
          <p class="item-txt">由商家发起的一种促销活动，商家可添加商品，设置成团价格、成团人数和成团有效期等信息。消费者可发起拼团活动或参与他人发起的拼团活动，若在有效期内若拼团成功，则可以成团价（较优惠的价格）购买商品或服务。目的是以部分优惠吸引多人购买，增加销售额。</p>
        </div>
        <div class="text-item">
          <p class="item-title">2.用户在多长时间内可成团？</p>
          <p class="item-txt">系统统一设定为24小时。即用户开团成功后，需在24小时内邀请好友参团，当达到成团人数后可认定为拼团成功；反之拼团失败，用户所支付款项原路退回。</p>
        </div>
      </div>
      <div class="last-box"></div>
    </scroll>
    <title-box ref="titleBox" @submitMsg="submitTile"></title-box>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">保存</div>
    </div>
    <awesome-picker
      ref="picker"
      type="date"
      @cancel="pickerCancel"
      @confirm="pickerConfirm">
    </awesome-picker>
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
  import { Upload, ActivityApi } from 'api'

  const ACTIVITY_TYPE = {
    0: '请选择',
    1: '火爆拼团',
    3: '砍价抢购'
  }
  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/
  const RATEREG = /^[0-9]\d*$/
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
          goods_price: '',
          config: {
            original_price: '',
            bottom_price: '',
            max_cut_num: '',
            group_validity: 24,
            group_number: '',
            group_price: ''
          },
          stock: '',
          is_sync: 0,
          commission_rate: '',
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
            this.activityDetail.goods_price = item.platform_price
            this.activityDetail.config.original_price = item.platform_price
            break
          case 'prize':
            this.activityDetail.coupon_id = item.id
            this.activityDetail.coupon_title = item.title
            break
        }
      },
      selectAny(type) {
        if (!this.ruleId) {
          this.$toast.show('请先选择活动类型')
          return
        }
        if (this.type === 'editor') return
        let url = `${this.$route.path}/choice-goods?type=${type}&ruleId=${this.ruleId}`
        this.$router.push(url)
      },
      showTitleModal() {
        let obj = {
          text: this.activityDetail.activity_name,
          title: '活动标题',
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
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _fileImage(e) {
        let arr = Array.from(e.target.files)
        this.$refs.cropper.show(arr[0])
      },
      cropperConfirm(e) {
        // this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e])
        // this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e])
        this.$loading.show()
        let blob = this.$handle.getBlobBydataURI(e)
        let file = this.$handle.createFormData(blob)
        Upload.upLoadImage(file).then(res => {
          if (res.error !== this.$ERR_OK) {
            return this.$toast.show(res.message)
          }
          this.activityDetail.image_url = res.data.url
          this.activityDetail.image_id = res.data.id
          this.$loading.hide()
          this.$refs.cropper.cancel()
        })
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
          return item.value.replace(reg, '')
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
          this.disabledCover = false
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
      _setGroupOn() {
        this.activityDetail.is_online = 1
        ActivityApi.newGroupMsg(this.id, this.activityDetail).then((res) => {
          this.$loading.hide()
          this.disabledCover = false
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
      _newBargain() {
        ActivityApi.newBargainMsg(this.activityDetail).then((res) => {
          this.$loading.hide()
          this.disabledCover = false
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
      _setBargain() {
        this.activityDetail.is_online = 1
        ActivityApi.editBargainMsg(this.id, this.activityDetail).then((res) => {
          this.$loading.hide()
          this.disabledCover = false
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
      submitAll() {
        this.disabledCover = true
        this.checkForm()
      },
      checkForm() {
        if (!this.ruleId) {
          this.$toast.show('请先选择活动类型')
          return
        }
        let arr
        if (+this.ruleId === 1) {
          arr = [
            {value: this.goodsReg, txt: '请先选择好参与活动的商品'},
            {value: this.titleReg, txt: '请输入活动标题'},
            {value: this.stockReg, txt: '请选择或输入合法的库存数量'},
            {value: this.use1TimeReg, txt: '请选择活动开始时间'},
            {value: this.use2TimeReg, txt: '请选择活动结束时间'},
            {value: this.groupPrizeReg, txt: '请输入合法的团购价'},
            {value: this.groupNumReg, txt: '请选择拼团人数'},
            {value: this.rateReg, txt: '请输入正整数提成比例'}
          ]
        } else if (+this.ruleId === 3) {
          arr = [
            {value: this.goodsReg, txt: '请先选择好参与活动的商品'},
            {value: this.titleReg, txt: '请输入活动标题'},
            {value: this.stockReg, txt: '请选择或输入合法的库存数量'},
            {value: this.use1TimeReg, txt: '请选择活动开始时间'},
            {value: this.use2TimeReg, txt: '请选择活动结束时间'},
            {value: this.bottomReg, txt: '请输入合法的底价'},
            {value: this.kanNumReg, txt: '请选择砍价人数'},
            {value: this.couponReg, txt: '请选择帮砍人兑换券'},
            {value: this.rateReg, txt: '请输入正整数提成比例'}
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
      rateReg() {
        return RATEREG.test(this.activityDetail.commission_rate)
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
    .last-box
      height: 82px
    .group-container
      padding-left: 15px
      background: $color-white
    .text-item
      padding-right: 15px
      .item-title
        line-height: 38px
        padding-top: 6px
        font-size: $font-size-14
        color: $color-363537
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
        color: $color-9B9B9B
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
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
          color: $color-363537
          width: 100%
          height: 55px
          no-wrap()
          &.gray
            color: $color-CCCCCC
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
          color: $color-363537
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
</style>
