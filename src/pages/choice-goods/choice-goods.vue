<template>
  <div class="choice-goods">
    <div class="select-container">
      <scroll ref="scroll"
              :data="list"
              bcColor="#f6f6f6"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
              :showNoMore="showNoMore">
        <div class="list-container">
          <div class="page-title" v-if="!nothing">{{type === 'prize' ? '选择奖品券' : '选择商品'}}</div>
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <select-item :item="item" :type="type" @selectSome="selectDone"></select-item>
          </div>
          <div class="nothing-box" v-if="nothing">
            <img src="./pic-empty_order@2x.png" class="nothing-img">
            <div class="nothing-txt">暂无数据</div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom-box border-top-1px" v-if="!nothing">
      <div class="bottom-btn" @click="submitAll">确定</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SelectItem from 'components/select-item/select-item'
  import Scroll from 'components/scroll/scroll'
  import {ActivityApi} from 'api'
  import {ease} from 'common/js/ease'
  export default {
    data() {
      return {
        type: '',
        ruleId: '',
        list: [],
        checkItem: '',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        showNoMore: false,
        page: 1,
        nothing: false,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        goodsId: ''
      }
    },
    created() {
      this.type = this.$route.query.type
      this.ruleId = this.$route.query.ruleId
      this.goodsId = this.$route.query.goodsId
      if (this.type === 'prize') {
        document.title = '选择奖品券'
        this._getPrizeList()
      } else {
        this._getGoodsList()
      }
    },
    methods: {
      _getGoodsList() {
        let data = {
          page: this.page,
          rule_id: this.ruleId
        }
        ActivityApi.getGoodsList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.list = res.data
            this.list = this.list.map((item) => {
              if (+item.id === +this.goodsId) {
                item.checked = true
              } else {
                item.checked = false
              }
              this.checkItem = item
              return Object.assign({}, item)
            })
            if (!res.data.length) {
              this.nothing = true
            }
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
              this.$refs.scroll.scrollTo(0, 0, 0, ease[this.scrollToEasing])
            }, 20)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _getPrizeList() {
        let data = {
          page: this.page
        }
        ActivityApi.getPrizeList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.list = res.data
            if (!res.data.length) {
              this.nothing = true
            }
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
              this.$refs.scroll.scrollTo(0, 0, 0, ease[this.scrollToEasing])
            }, 20)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      selectDone(item) {
        this.list = this.list.map((item1) => {
          if (+item.id === +item1.id) {
            item1.checked = true
          } else {
            item1.checked = false
          }
          return Object.assign({}, item1)
        })
        this.checkItem = Object.assign({}, item)
      },
      onPullingUp() {
        if (this.showNoMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        if (this.type === 'goods') {
          let data = {
            page: this.page,
            rule_id: this.ruleId
          }
          ActivityApi.getGoodsList(data).then((res) => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              if (!res.data.length) {
                this.showNoMore = true
                this.page--
              } else {
                this.list = this.list.concat(res.data)
              }
              setTimeout(() => {
                this.$refs.scroll.forceUpdate()
              }, 20)
            } else {
              this.$toast.show(res.message)
            }
          })
        } else {
          let data = {
            page: this.page
          }
          ActivityApi.getPrizeList(data).then((res) => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              if (!res.data.length) {
                this.showNoMore = true
                this.page--
              } else {
                this.list = [...this.list, res.data]
              }
              setTimeout(() => {
                this.$refs.scroll.forceUpdate()
              }, 20)
            } else {
              this.$toast.show(res.message)
            }
          })
        }
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs['scroll' + this.tabIdx].destroy()
          this.$refs['scroll' + this.tabIdx].initScroll()
        })
      },
      submitAll() {
        this.$emit('refresh', this.checkItem, this.type)
        this.$router.back()
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return
          this.rebuildScroll()
        },
        deep: true
      }
    },
    components: {
      SelectItem,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .choice-goods
    fill-box()
    z-index: 90
    background: $color-F6F6F6
    .select-container
      width: 100vw
      height: 100vh
      .list-container
        padding: 0 15px
        .page-title
          line-height: 40px
          font-family: $font-family-regular
          color: $color-27273E
        .list-item
          padding-bottom: 10px
        .nothing-box
          display: flex
          flex-direction: column
          align-items: center
          font-size: 0
          padding-top: 100px
          .nothing-img
            width: 100px
            height: 80px
            margin-bottom: 5px
          .nothing-txt
            font-size: $font-size-12
            color: $color-CCCCCC
            font-family: $font-family-regular
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

</style>
