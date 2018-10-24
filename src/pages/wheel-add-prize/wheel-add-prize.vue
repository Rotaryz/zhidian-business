<template>
  <div class="wheel-add-prize">
    <div class="scroll-wrapper">
      <scroll :bcColor="'#F6F6F6'"
              ref="scroll"
              :data="dataArray"
              v-if="dataArray.length"
      >
        <ul class="card-wrapper">
          <li class="card-item-wrapper" v-for="(item, idx) in dataArray" :key="idx">
            <card-item :dataInfo="item" :prizeFlag="prizeFlag" @choose="chooseHandle"></card-item>
          </li>
        </ul>
      </scroll>
    </div>
    <section class="btn-wrapper border-top-1px" v-if="dataArray.length">
      <div class="btn" :class="saveReg?'active':''" @click="saveBtn">保存</div>
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

  export default {
    components: {
      Scroll,
      CardItem,
      Blank
    },
    data () {
      return {
        dataArray: [],
        prizeFlag: -1
      }
    },
    created () {
      this.dataArray = [...this.prizeCollection.prizeList]
      this.prizeFlag = +this.$route.query.prizeFlag
      console.log(this.dataArray)
    },
    methods: {
      saveBtn () {
        // todo
      },
      chooseHandle(obj) {
        let arr = []
        this.dataArray.map(item => {
          item.checkArr[this.prizeFlag] = false
          if (item.id === obj.id) {
            item.checkArr[this.prizeFlag] = true
          }
          arr.push(item)
        })
        this.dataArray = arr
      }
    },
    computed: {
      ...mapGetters(['prizeCollection']),
      saveReg () {
        return false
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
