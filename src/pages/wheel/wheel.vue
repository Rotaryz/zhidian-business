<template>
  <div class="wheel">
    <div class="scroll-wrapper">
      <scroll
        :bcColor="'#F6F6F6'"
        ref="scroll"
        :data="prizeList"
      >
        <article class="container">
          <section class="open-wrapper border-bottom-1px">
            <p>开启大转盘</p>
            <div class="checkbox" :class="prizeInfo.status ? 'checked' : ''" @click="checkSwitch">
              <div class="circle-btn"></div>
            </div>
          </section>
          <panel title="添加奖品" subHead="奖品数量越大中奖几率越高">
            <div class="wheel-wrapper">
              <div class="auto-wrapper">
                <article class="box">
                  <div class="prize" :class="'prize-' + idx" v-for="(item,idx) in [0,1,2,3,4,5]" :key="idx" @click="navTo(item)"></div>
                </article>
              </div>
            </div>
          </panel>
          <div class="margin-box-10px"></div>
          <panel title="奖品池">
            <ul class="prize-wrapper" v-if="prizeList.length">
              <li class="prize-item-wrapper" v-for="(item, idx) in prizeList" :key="idx">
                <prize-item :idx="idx" :item="item" @updatePrizeStock="updatePrizeStock" @delHandle="delHandle" @navTo="navTo"></prize-item>
              </li>
            </ul>
            <div class="prize-empty" v-else>
              请点击转盘奖品添加奖品~
            </div>
          </panel>
          <div class="margin-box-10px"></div>
          <panel title="抽奖设置" :style="'padding-right: 0'">
            <ul class="setting-wrapper">
              <li class="setting-item-wrapper">
                <div class="left">中奖机率</div>
                <div class="middle">用户中奖率设置</div>
                <div class="right"><input type="number" placeholder="请输入" v-model="prizeInfo.percentage"></div>
                <div class="unit">%</div>
              </li>
              <li class="setting-item-wrapper border-top-1px">
                <div class="left">抽奖次数</div>
                <div class="middle">下单支付额外获得1次</div>
                <div class="right"><input type="number" placeholder="请输入" v-model="prizeInfo.joinTimes"></div>
                <div class="unit">次</div>
              </li>
            </ul>
          </panel>
          <div class="margin-box-10px"></div>
          <panel title="兑换说明">
            <section class="texts-wrapper border-bottom-1px">
              <div class="texts-number">{{prizeInfo.note.length}}<span>/{{maxLength}}</span></div>
              <div class="data-wrapper">
                <textarea class="data-area" @touchmove.stop v-model="prizeInfo.note" :maxlength="maxLength" placeholder="请填写"></textarea>
              </div>
            </section>
          </panel>
        </article>
      </scroll>
    </div>
    <section class="btn-wrapper border-top-1px">
      <div class="btn" :class="saveBtnReg?'active':''" @click="saveBtn">保存</div>
    </section>
    <confirm-msg ref="confirm" @confirm="confirmHandle"></confirm-msg>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Panel from './panel/panel'
  import PrizeItem from './prize-item/prize-item'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { mapActions, mapGetters } from 'vuex'
  import { ActiveExtend } from 'api'

  export default {
    components: {
      Scroll,
      Panel,
      PrizeItem,
      ConfirmMsg
    },
    data() {
      return {
        maxLength: 30,
        prizeList: [],
        prizePool: [],
        prizeInfo: {
          id: 0,
          percentage: 0,
          joinTimes: 0,
          note: '',
          status: 0 // 1开启0关闭
        },
        delNode: null,
        delList: [],
        prizeLength: 0
      }
    },
    created() {
      this._getPrizePoolList(false)
    },
    methods: {
      ...mapActions(['initPrizeStorage', 'initPrizeArray', 'deletePrizeStorage', 'updatePrizeStorage']),
      refresh(obj, item) {
        this._updatePrizeList(obj, item)
      },
      updatePrizeStock() {
        // 刷新每个位置的库存
        this.prizeList.map(item => {
          item.stock = this.prizeStorage.find(it => it.prize_id === item.prize_id).stock
          return item
        })
      },
      _updatePrizeList(obj) {
        const defaultStock = 0
        const {place, savePrize} = obj
        // 1.判断是否为新位置
        let idx = this.prizeList.findIndex(item => +item.place === +place)
        if (idx === -1) {
          // 新位置
          this.updatePrizeStorage({prize_id: savePrize.prize_id, number: defaultStock})
          let node = {
            prize_pools_id: savePrize.prize_pools_id,
            activity_prize_id: 0,
            id: 0,
            type: savePrize.type,
            prize_id: savePrize.prize_id,
            title: savePrize.title,
            place: place,
            prize_stock: defaultStock,
            image_url: savePrize.image_url,
            end_at: savePrize.end_at,
            status: savePrize.status,
            stock: this.prizeStorage.find(item => item.prize_id === savePrize.prize_id).stock
          }
          this.prizeList.push({...node})
          if (savePrize.status === 1) {
            // 刷新每个位置的库存
            this.prizeList = this.prizeList.map(item => {
              if (item.prize_id === savePrize.prize_id) {
                item.stock = node.stock
              }
              return item
            })
          }
        } else {
          // 老位置
          let node = this.prizeList[idx]
          if (node.prize_id === savePrize.prize_id) {
            return
          }
          if (+node.status === 1) {
            this.deletePrizeStorage(node)
          }
          this.updatePrizeStorage({prize_id: savePrize.prize_id, number: defaultStock})
          let replaceNode = {
            prize_pools_id: savePrize.prize_pools_id,
            activity_prize_id: savePrize.activity_prize_id,
            id: node.id,
            type: savePrize.type,
            prize_id: savePrize.prize_id,
            title: savePrize.title,
            place: place,
            prize_stock: defaultStock,
            image_url: savePrize.image_url,
            end_at: savePrize.end_at,
            status: savePrize.status,
            stock: this.prizeStorage.find(item => item.prize_id === savePrize.prize_id).stock
          }
          // 刷新每个位置的库存
          if (+this.prizeList[idx].status === 1) {
            this.prizeList.splice(idx, 1, replaceNode)
            this._renderPrizeList()
          } else {
            this.prizeList.splice(idx, 1, replaceNode)
          }
        }
        // 排序
        this.prizeList.sort(function (a, b) {
          return a.place - b.place
        })
      },
      delHandle(node) {
        this.delNode = node
        this.$refs.confirm.show()
      },
      confirmHandle() {
        let idx = this.prizeList.findIndex(item => item.place === this.delNode.place)
        let node = this.prizeList[idx]
        if (node.id !== 0) {
          this.delList.push({activity_prize_id: node.activity_prize_id})
        }
        this.prizeList.splice(idx, 1)
        // 删除产品在有效期内，调用下面方法
        if (+node.status === 1) {
          // 刷新每个位置的库存
          this.deletePrizeStorage(node)
          this._renderPrizeList()
        }
      },
      _renderPrizeList() {
        this.prizeList.map(item => {
          let tempItem = this.prizeStorage.find(it => it.prize_id === item.prize_id)
          tempItem && (item.stock = tempItem.stock)
          return item
        })
      },
      _getPrizePoolList(loading) {
        this.$loading.show()
        ActiveExtend.getPrizePoolList({}, loading).then(res => {
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.prizePool = res.data
          this._getPrizeInfo(false)
        })
      },
      _getPrizeInfo(loading) {
        ActiveExtend.getPrizeInfo({}, loading).then(resp => {
          this.$loading.hide()
          if (this.$ERR_OK !== resp.error) {
            this.$toast.show(resp.message)
            return
          }
          if (resp.data && !(resp.data instanceof Array)) {
            this.prizeInfo = {
              id: resp.data.id || 0,
              percentage: resp.data.percentage || 0,
              joinTimes: resp.data.join_times || 0,
              note: resp.data.note || '',
              status: resp.data.status || 0 // 1开启0关闭
            }
            this.prizeList = resp.data.activity_prizes
          }
          let obj = {
            prizePool: this.prizePool,
            prizeList: this.prizeList
          }
          this.initPrizeStorage(obj)
          this.initPrizeArray(this.prizePool)
        })
      },
      _updateWheel(data, loading) {
        ActiveExtend.updateWheel(data, loading).then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('保存成功')
          this.$router.back()
        })
      },
      navTo(item) {
        if (item === 0) return
        let node = this.prizeList.find(it => +it.place === +item)
        let currentIndex = node ? this.prizePool.findIndex(it => it.prize_id === node.prize_id) : -1
        this.$router.push(this.$route.path + `/wheel-add-prize?place=${item}&currentIndex=${currentIndex}`)
      },
      saveBtn() {
        this._checkForm(() => {
          let data = {
            type: 1,
            id: this.prizeInfo.id,
            join_times: this.prizeInfo.joinTimes,
            note: this.prizeInfo.note,
            status: this.prizeInfo.status,
            percentage: this.prizeInfo.percentage,
            activity_prizes: this.prizeList,
            del_activity_prizes: this.delList
          }
          this._updateWheel(data)
        })
      },
      checkSwitch() {
        let flag = !this.prizeInfo.status
        this.prizeInfo.status = flag ? 1 : 0
      },
      _checkForm(callback) {
        let arr = [
          {value: this.prizeListReg, txt: '请点击大转盘添加五个奖品'},
          {value: this.prizeListInputReg, txt: '请输入正确的奖品数量'},
          {value: this.percentageReg, txt: '请输入正确的中奖率'},
          {value: this.joinTimesReg, txt: '请输入正确的中奖次数'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          callback && callback()
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
      _scrollUpdate() {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 40)
      }
    },
    computed: {
      ...mapGetters(['prizeStorage']),
      prizeListReg() {
        return this.prizeList.length === 5
      },
      prizeListInputReg() {
        return this.prizeList.every(item => item.stock >= 0 && item.prize_stock >= 0)
      },
      percentageReg() {
        let percentage = this.prizeInfo.percentage
        return percentage >= 0 && percentage <= 100
      },
      joinTimesReg() {
        let joinTimes = this.prizeInfo.joinTimes + ''
        return /^[+]?(\d+)$/.test(joinTimes)
      },
      saveBtnReg() {
        return this.prizeListReg && this.prizeListInputReg && this.percentageReg && this.joinTimesReg
      }
    },
    watch: {
      prizeList(data, oldData) {
        if (this.prizeLength !== data.length) {
          this.prizeLength = data.length
          this._scrollUpdate()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  input
    height: 24px
    width: 100%
    text-align: center
    line-height: 1
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #27273E;
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .wheel
    fill-box()
    z-index: 20
    height: 100vh
    .scroll-wrapper
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 64px

  .wheel-wrapper
    padding: 20px 0
    .auto-wrapper
      height: 0
      padding-top: 100%
      position: relative
      .box
        fill-box(absolute)
        icon-image(pic-bigpan)
        .prize
          position: absolute
          width: 28%
          height: 35%
          box-sizing: border-box
          border-radius: 0 0 50% 50%
          for $i in 0 1 2 3 4 5
            &.prize-{$i}
              z-index: (-($i) + 6)
              transform: rotate($i * 60deg)
              if $i == 0
                left: 35.7%
                top: 0
              if $i == 1
                left: 62.7%
                top: 14.7%
              if $i == 2
                bottom: 19%
                right: 9%
              if $i == 3
                left: 35.7%
                bottom: 4%
              if $i == 4
                left: 8.7%
                bottom: 19%
              if $i == 5
                top: 15%
                left: 9%

  .prize-wrapper
    padding-top: 15px
    .prize-item-wrapper
      padding-bottom: 10px
      &:last-child
        padding-bottom: 20px

  .prize-empty
    padding: 35px 0 40px
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #27273E;
    text-align: center

  .setting-wrapper
    .setting-item-wrapper
      layout(row, block, nowrap)
      padding: 12px 0
      align-items: center
      &:first-child
        padding-top: 20px
      .left
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #464646;
      .middle
        flex: 1
        overflow: hidden
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #9B9B9B;
        padding-left: 16px
      .right
        height: 28px
        width 56px
        margin: 0 5px
        layout()
        justify-content: center
        align-items: center
        border: 1px solid #F0EFF5
        border-radius :2px
      .unit
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #27273E;
        padding-right: 15px

  .texts-wrapper
    padding: 18px 0 20px
    position: relative
    border-bottom-1px(rgba(236, 237, 241, 1))
    .data-wrapper
      .data-area
        resize: none
        box-sizing: border-box
        width: 100%
        border-color: rgba(0, 0, 0, 0)
        font-size: $font-size-14
        color: $color-20202E
        font-family: $font-family-regular
        height: 75px
        outline: none
        word-break: break-all
        background: $color-F9F9F9
        padding: 10px 9px !important
        line-height: 1.4
        .&::-webkit-input-placeholder
          color: $color-9B9B9B
        .&::-ms-input-placeholder
          color: $color-9B9B9B
        .&::-moz-placeholder
          color: $color-9B9B9B
    .texts-number
      position: absolute
      bottom: 30px
      right: 15px
      font-family: $font-family-regular
      color: $color-CCCCCC
      font-size: $font-size-10

  .open-wrapper
    padding: 12px 15px
    layout(row)
    align-items: center
    justify-content: space-between
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #464646;
    background: $color-white

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
    z-index: 40
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
      opacity: 0.5
      &.active
        opacity: 1
</style>
