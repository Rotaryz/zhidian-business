<template>
  <div class="wheel">
    <div class="scroll-wrapper">
      <scroll
        :bcColor="'#F6F6F6'"
        ref="scroll"
        :data="prizeCollection.prizePool"
      >
        <article class="container">
          <panel title="添加奖品" subHead="奖品数量越大中奖几率越高">
            <div class="wheel-wrapper">
              <div class="auto-wrapper">
                <article class="box">
                  <div class="prize" :class="'prize-' + idx" v-for="(item,idx) in [-1,0,1,2,3,4]" :key="idx" @click="navTo(item)"></div>
                </article>
              </div>
            </div>
          </panel>
          <div class="margin-box-10px"></div>
          <panel title="奖品池">
            <ul class="prize-wrapper" v-if="prizeCollection.prizePool.length">
              <li class="prize-item-wrapper" v-for="(item, idx) in prizeCollection.prizePool" :key="idx">
                <prize-item :idx="idx"></prize-item>
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
                <div class="right"><input type="number"></div>
                <div class="unit">%</div>
              </li>
              <li class="setting-item-wrapper border-top-1px">
                <div class="left">抽奖次数</div>
                <div class="middle">下单支付额外获得1次</div>
                <div class="right"><input type="number"></div>
                <div class="unit">次</div>
              </li>
            </ul>
          </panel>
          <div class="margin-box-10px"></div>
          <panel title="兑换说明">
            <section class="texts-wrapper border-bottom-1px">
              <div class="texts-number">{{explainTxt.length}}<span>/{{maxLength}}</span></div>
              <div class="data-wrapper">
                <textarea class="data-area" @touchmove.stop v-model="explainTxt" :maxlength="maxLength" placeholder="请填写"></textarea>
              </div>
            </section>
          </panel>
          <section class="open-wrapper border-top-1px">
            <p>开启大转盘</p>
            <div class="checkbox" :class="isOpen ? 'checked' : ''" @click.stop="checkSwitch">
              <div class="circle-btn"></div>
            </div>
          </section>
        </article>
      </scroll>
    </div>
    <section class="btn-wrapper border-top-1px">
      <div class="btn" @click="saveBtn">保存</div>
    </section>
    <router-view-common></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Panel from './panel/panel'
  import PrizeItem from './prize-item/prize-item'
  import { mapGetters, mapActions } from 'vuex'
  import { ActiveExtend } from 'api'

  export default {
    components: {
      Scroll,
      Panel,
      PrizeItem
    },
    data () {
      return {
        explainTxt: '',
        maxLength: 30,
        isOpen: false
      }
    },
    created () {
      this._getPrizeList()
    },
    methods: {
      ...mapActions(['getPrizeList']),
      _getPrizeList () {
        ActiveExtend.getPrizeList().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.getPrizeList(res.data)
        })
      },
      _updateWheel() {
        ActiveExtend.updateWheel().then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          console.log(res, '---')
        })
      },
      navTo (item) {
        if (item < 0) return
        this.$router.push(this.$route.path + `/wheel-add-prize?prizeFlag=${item}`)
      },
      saveBtn () {
        // todo
      },
      checkSwitch () {
        this.isOpen = !this.isOpen
      }
    },
    computed: {
      ...mapGetters(['prizeCollection'])
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
    color: #363547;
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .wheel
    fill-box()
    z-index: 70
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
    color: #363547;
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
        border-1px(#F0EFF5, 2px)
      .unit
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #363547;
        padding-right: 15px

  .texts-wrapper
    padding: 18px 0 20px
    position: relative
    border-bottom-1px(rgba(236, 237, 241, 1))
    .data-wrapper
      border-1px(#F0EFF5, 2px)
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
