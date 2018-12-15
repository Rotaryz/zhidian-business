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
          <div class="list-item" v-for="(item, index) in list" :key="index" @click="choiceStaff(item)">
            <div class="left">
              <div class="img-box">
                <img :src="item.avatar" class="avatar">
              </div>
              <div class="name">{{item.name}}</div>
              <div class="role">{{+item.role_id === 1 ? '店长' : '店员'}}</div>
            </div>
            <div class="right">
              <div class="select-circle" v-show="!item.checked"></div>
              <img src="./icon-pitchup@2x.png" class="checked" v-show="item.checked">
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom-box border-top-1px">
      <div class="bottom-btn" @click="submitAll">完成</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import {OrderApi} from 'api'
  import {ease} from 'common/js/ease'
  export default {
    data() {
      return {
        list: [],
        shopId: '',
        checkItem: '',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        showNoMore: false,
        page: 1,
        nothing: false,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce']
      }
    },
    created() {
      this.shopId = this.$route.query.shopId
      this._getList()
    },
    methods: {
      _getList() {
        let data = {
          page: this.page
        }
        OrderApi.getStaffList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.list = res.data
            if (this.shopId) {
              this.list = this.list.map((item) => {
                if (+item.shop_id === +this.shopId) {
                  item.checked = true
                  this.checkItem = Object.assign({}, item)
                } else {
                  item.checked = false
                }
                return Object.assign({}, item)
              })
            }
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
      choiceStaff(item) {
        this.list = this.list.map((item1) => {
          if (+item.id === +item1.id) {
            item1.checked = !item1.checked
            if (item1.checked) {
              this.checkItem = Object.assign({}, item1)
            } else {
              this.checkItem = {}
            }
          } else {
            item1.checked = false
          }
          return Object.assign({}, item1)
        })
      },
      onPullingUp() {
        if (this.showNoMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        let data = {
          page: this.page
        }
        OrderApi.getStaffList(data).then((res) => {
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
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs['scroll' + this.tabIdx].destroy()
          this.$refs['scroll' + this.tabIdx].initScroll()
        })
      },
      submitAll() {
        this.$emit('refresh', this.checkItem)
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
        .list-item
          width: 100%
          height: 75px
          display: flex
          justify-content: space-between
          .left
            display: flex
            align-items: center
            .img-box
              width: 40px
              height: 40px
              border-1px($color-E6E6E6)
              border-radius: 50%
              overflow: hidden
              font-size: 0
              margin-right: 10px
              .avatar
                width: 100%
                height: 100%
                border-radius: 50%
            .name
              font-size: $font-size-16
              color: $color-27273E
              letter-spacing: 0.34px
              margin-right: 5px
            .role
              width: 34px
              height: 18px
              border: 1px solid $color-D32F2F
              border-radius: 2px
              line-height: 18px
              text-align: center
              font-size: $font-size-12
              color: $color-EF705D
          .right
            height: 100%
            display: flex
            align-items: center
            justify-content: center
            font-size: 0
            .select-circle
              width: 20px
              height: 20px
              box-sizing: border-box
              border: 1px solid $color-9B9B9B
              border-radius: 50%
            .checked
              width: 20px
              height: 20px
              border-radius: 50%

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
