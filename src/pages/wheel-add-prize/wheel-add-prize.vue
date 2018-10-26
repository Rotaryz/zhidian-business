<template>
  <div class="wheel-add-prize">
    <div class="scroll-wrapper">
      <scroll :bcColor="'#F6F6F6'"
              ref="scroll"
              :data="dataArray"
              v-if="dataArray.length"
      >
        <ul class="card-wrapper">
          <li class="card-item-wrapper" v-for="(item, idx) in dataArray" :key="item.prize_id" v-if="item.stock >=0 ">
            <card-item :dataInfo="item" :idx="idx" @choose="chooseHandle"></card-item>
          </li>
        </ul>
      </scroll>
    </div>
    <section class="btn-wrapper border-top-1px" v-if="dataArray.length">
      <div class="btn" :class="saveIndex !== -1?'active':''" @click="saveBtn">确定</div>
    </section>
    <section class="blank-wrapper" v-else>
      <blank></blank>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import CardItem from './card-item/card-item'
  import Blank from 'components/blank/blank'
  import { mapGetters } from 'vuex'

  const NameArr = ['谢谢惠顾', '奖品一', '奖品二', '奖品三', '奖品四', '奖品五']
  export default {
    components: {
      Scroll,
      CardItem,
      Blank
    },
    data() {
      return {
        place: 0,
        currentIndex: -1,
        dataArray: []
      }
    },
    created() {
      this.place = +this.$route.query.place
      this.currentIndex = +this.$route.query.currentIndex
      this._initList()
      window.document.title += `(${NameArr[this.place]})`
    },
    methods: {
      _initList() {
        let arr = []
        this.prizeArray.forEach((item, index) => {
          let node = {...item}
          let stock = this.prizeStorage.find(it => it.prize_id === item.prize_id).stock
          node.stock = stock
          node.isCheck = index === this.currentIndex
          arr.push(node)
        })
        this.dataArray = arr
      },
      saveBtn() {
        if (this.saveIndex < 0) {
          this.$toast.show('请选择奖品')
          return
        }
        let obj = {
          place: this.place, // 奖品位置索引
          savePrize: this.dataArray[this.saveIndex] // 奖品在奖品列表中的索引
        }
        this.$emit('refresh', obj)
        this.$router.back()
      },
      chooseHandle(item, idx) {
        let arr = []
        this.dataArray.forEach((item, index) => {
          arr.push({...item, ...{isCheck: index === idx}})
        })
        this.dataArray = arr
      }
    },
    computed: {
      ...mapGetters(['prizeArray', 'prizeStorage']),
      saveIndex() {
        return this.dataArray.findIndex(item => item.isCheck)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  input
    height: 24px
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .blank-wrapper
    padding-top: 100px

  .wheel-add-prize
    fill-box()
    z-index: 90
    height: 100vh
    background: #ffffff
    .scroll-wrapper
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 64px
      .card-wrapper
        .card-item-wrapper
          padding: 15px 15px 0
          &:last-child
            padding: 15px

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
    background: $color-white
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
      opacity: 0.5
      &.active
        opacity: 1
</style>
