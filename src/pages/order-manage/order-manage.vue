<template>
  <div class="service-manage">
    <div class="search-box">
      <div class="left-box">
        <img src="./icon-search@2x.png" class="search-icon">
        <input type="text" class="search-input" v-model="searchTxt" placeholder="手机号/订单号" @focus="inputOnFocus" @blur="inputBlur">
        <img src="./Clear@2x.png" class="del-icon" v-if="searchTxt.length" @click="clearInput">
      </div>
      <div class="right-box" v-if="searchTxt.length && inputFocus" @click="searchList">搜索</div>
      <div class="right-box" v-if="!searchTxt.length && inputFocus">取消</div>
      <div class="right-block" v-if="!inputFocus"></div>
    </div>
    <div class="header-tab border-bottom-1px">
      <div class="left-box">
        <div class="tab-box">
          <div class="tab-item" :class="tabIdx == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
            {{item.txt}}
          </div>
        </div>
        <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
          <div class="underline"></div>
        </div>
      </div>
      <div class="right-box" @click="choiceStaff">
        <span class="right-name" >{{listType === 'service' ? '服务订单' : '商品订单'}}</span>
        <img src="./icon-screen@2x.png" class="right-icon">
        <!--<img src="./icon-screen_pick@2x.png" class="right-icon" v-if="shopId">-->
      </div>
    </div>
    <div class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*25 + '%,0)'">
        <div class="container-item">
          <scroll ref="scroll0"
                  :data="list0"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj0"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore0">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list0" :key="index">
                <order-item :item="item" @toDetail="toDetail"></order-item>
              </div>
              <div class="nothing-box" v-if="nothing0">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无订单</div>
              </div>
            </div>
          </scroll>
        </div>
        <div class="container-item">
          <scroll ref="scroll1"
                  :data="list1"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj1"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore1">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list1" :key="index">
                <order-item :item="item" @toDetail="toDetail"></order-item>
              </div>
              <div class="nothing-box" v-if="nothing1">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无订单</div>
              </div>
            </div>
          </scroll>
        </div>
        <div class="container-item">
          <scroll ref="scroll2"
                  :data="list2"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj2"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore2">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list2" :key="index">
                <order-item :item="item" @toDetail="toDetail"></order-item>
              </div>
              <div class="nothing-box" v-if="nothing2">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无订单</div>
              </div>
            </div>
          </scroll>
        </div>
        <div class="container-item">
          <scroll ref="scroll3"
                  :data="list3"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj3"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore3">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list3" :key="index">
                <order-item :item="item" @toDetail="toDetail"></order-item>
              </div>
              <div class="nothing-box" v-if="nothing3">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无订单</div>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
    <div class="model">
      <transition name="fade">
        <div class="bg" v-if="showMenu" @click="cancelMenu"></div>
      </transition>
      <div class="box" :class="{'show': showMenu}">
        <p class="item border-bottom-1px" @click="selectType('service')">服务订单</p>
        <p class="item" @click="selectType('goods')">商品订单</p>
        <p class="item cancel" @click="cancelMenu">取消</p>
      </div>
    </div>

    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderItem from 'components/order-item/order-item'
  import Modal from 'components/confirm-msg/confirm-msg'
  import Scroll from 'components/scroll/scroll'
  import { OrderApi } from 'api'
  import {ease} from 'common/js/ease'
  const TABS = [
    {txt: '全部', id: 'all'},
    {txt: '交易中', id: 0},
    {txt: '交易完成', id: 1},
    {txt: '交易关闭', id: 2}
  ]
  const TABSNUM = ['wait_online_count', 'online_count', 'offline_count']
  export default {
    data() {
      return {
        tabList: TABS,
        tabIdx: 0,
        list0: [],
        list1: [],
        list2: [],
        list3: [],
        numObj: {},
        searchTxt: '',
        shopId: '',
        inputFocus: false,
        tabsNumArr: TABSNUM,
        pullUpLoad0: true,
        pullUpLoadThreshold0: 0,
        showNoMore0: false,
        page0: 1,
        nothing0: false,
        pullUpLoad1: true,
        pullUpLoadThreshold1: 0,
        showNoMore1: false,
        page1: 1,
        nothing1: false,
        pullUpLoad2: true,
        pullUpLoadThreshold2: 0,
        showNoMore2: false,
        page2: 1,
        nothing2: false,
        pullUpLoad3: true,
        pullUpLoadThreshold3: 0,
        showNoMore3: false,
        page3: 1,
        nothing3: false,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        temporaryItem: {}, // 缓存需要处理的item
        temporaryType: '',
        showMenu: false,
        listType: 'service',
        noSelect: false
      }
    },
    created() {
      this._getList()
    },
    methods: {
      inputOnFocus() {
        this.inputFocus = true
      },
      inputBlur() {
        this.inputFocus = false
      },
      clearInput() {
        this.searchTxt = ''
      },
      searchList() {
        this.page = 1
        this._getList()
      },
      choiceStaff() {
        this.showMenu = true
      },
      cancelMenu() {
        this.showMenu = false
      },
      selectType(type) {
        if (this.noSelect) return
        this.noSelect = true
        setTimeout(() => {
          this.noSelect = false
        }, 500)
        this.listType = type
        this._initAny()
        this._initAll()
        this._getList()
        this.cancelMenu()
      },
      _getList(loading = true) {
        let data = {
          page: this[`page${this.tabIdx}`],
          trading_status: this.tabList[this.tabIdx].id,
          shop_id: this.shopId,
          keyword: this.searchTxt,
          order_kind: this.orderKind
        }
        OrderApi.getList(data, loading).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this[`list${this.tabIdx}`] = res.data
            if (!res.data.length) {
              this[`nothing${this.tabIdx}`] = true
            }
            setTimeout(() => {
              this.$refs[`scroll${this.tabIdx}`].forceUpdate()
              this.$refs[`scroll${this.tabIdx}`].scrollTo(0, 0, 0, ease[this.scrollToEasing])
            }, 20)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      refresh(item) {
        this.shopId = item.shop_id || ''
        this._initAny()
        this._getList(false)
      },
      changeTab(idx) {
        this.tabIdx = idx * 1
        this._initAny()
        this._initAll()
        this._getList()
      },
      toDetail(item) {
        let url = `${this.$route.path}/order-detail?id=${item.id}`
        this.$router.push(url)
      },
      _initAll() {
        for (let i = 0; i < 3; i++) {
          this['list' + i] = []
        }
      },
      _initAny() {
        this[`page${this.tabIdx}`] = 1
        this[`showNoMore${this.tabIdx}`] = false
        this[`nothing${this.tabIdx}`] = false
      },
      onPullingUp() {
        if (this[`showNoMore${this.tabIdx}`]) {
          this.$refs[`scroll${this.tabIdx}`].forceUpdate()
          return
        }
        this[`page${this.tabIdx}`]++
        let data = {
          page: this[`page${this.tabIdx}`],
          trading_status: this.tabList[this.tabIdx].id,
          shop_id: this.shopId,
          keyword: this.searchTxt,
          order_kind: this.orderKind
        }
        OrderApi.getList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            if (!res.data.length) {
              this[`showNoMore${this.tabIdx}`] = true
              this[`page${this.tabIdx}`]--
            } else {
              this[`list${this.tabIdx}`] = [...this[`list${this.tabIdx}`], ...res.data]
            }
            setTimeout(() => {
              this.$refs[`scroll${this.tabIdx}`].forceUpdate()
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
      }
    },
    components: {
      OrderItem,
      Scroll,
      Modal
    },
    computed: {
      orderKind() { // 1为实体商品，2为虚拟，3为服务
        return this.listType === 'service' ? '3' : '1'
      },
      pullUpLoadObj0: function () {
        return this.pullUpLoad0 ? {
          threshold: parseInt(this.pullUpLoadThreshold0),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadObj1: function () {
        return this.pullUpLoad1 ? {
          threshold: parseInt(this.pullUpLoadThreshold1),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadObj2: function () {
        return this.pullUpLoad2 ? {
          threshold: parseInt(this.pullUpLoadThreshold2),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadObj3: function () {
        return this.pullUpLoad3 ? {
          threshold: parseInt(this.pullUpLoadThreshold3),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullDownRefreshObj0: function () {
        return this.pullDownRefresh0 ? {
          threshold: parseInt(this.pullDownRefreshThreshold0),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      },
      pullDownRefreshObj1: function () {
        return this.pullDownRefresh1 ? {
          threshold: parseInt(this.pullDownRefreshThreshold1),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      },
      pullDownRefreshObj2: function () {
        return this.pullDownRefresh2 ? {
          threshold: parseInt(this.pullDownRefreshThreshold2),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
        } : false
      },
      pullDownRefreshObj3: function () {
        return this.pullDownRefresh3 ? {
          threshold: parseInt(this.pullDownRefreshThreshold3),
          stop: parseInt(this.pullDownRefreshStop),
          txt: '没有更多了'
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
      },
      pullDownRefreshObj: {
        handler() {
          if (!this.pullDownRefresh) return
          this.rebuildScroll()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .service-manage
    fill-box()
    z-index: 20
    background: $color-F6F6F6
    .search-box
      position: fixed
      left: 0
      top: 0
      z-index: 40
      width: 100vw
      display: flex
      height: 45px
      align-items: center
      padding-left: 15px
      background: $color-white
      box-sizing: border-box
      .right-block
        width: 15px
      .left-box
        flex: 1
        overflow: hidden
        display: flex
        align-items: center
        font-size: 0
        background: $color-F6F6F6
        border-radius: 2px
        height: 34px
        .search-icon
          width: 15px
          height: 15px
          margin-left: 15px
          margin-right: 5px
        .search-input
          flex: 1
          overflow: hidden
          height: 24px
          font-size: $font-size-14
          background: $color-F6F6F6
        .search-input::-webkit-input-placeholder
          color: $color-9B9B9B
        .search-input::-ms-input-placeholder
          color: $color-9B9B9B
        .search-input::-moz-placeholder
          color: $color-9B9B9B
        .del-icon
          width: 15px
          height: 15px
          padding: 10px
      .right-box
        width: 60px
        text-align: center
        line-height: 45px
        font-size: $font-size-14
        color: $color-27273E
        font-family: $font-family-regular
    .header-tab
      width: 100vw
      height: 45px
      position: fixed
      left: 0
      top: 45px
      z-index: 40
      padding-right: 10px
      box-sizing: border-box
      background: $color-white
      display: flex
      .left-box
        flex: 1
        overflow: hidden
        position: relative
        .tab-box
          width: 100%
          height: 45px
          display: flex
          .tab-item
            flex: 1
            height: 45px
            line-height: 44px
            text-align: center
            font-size: $font-size-14
            color: $color-27273E
            font-family: $font-family-regular
            letter-spacing: 0.8px
          .tab-item.active
            font-family: $font-family-medium
        .underline-box
          height: 3px
          position: absolute
          bottom: 0
          width: 25%
          display: flex
          justify-content: center
          transform: translate(0, 0)
          transition: all 0.3s
          .underline
            width: 30px
            height: 3px
            background: $color-D32F2F
            border-radius: 3px
      .right-box
        width: 88px
        line-height: 45px
        display: flex
        align-items: center
        justify-content: center
        font-size: $font-size-14
        color: $color-27273E
        position: relative
        &::before
          content: ""
          width: 1px
          height: 14px
          background: $color-706B82
          position: absolute
          left: 0
          top: 50%
          transform: translate(0, -50%)
        .right-icon
          width: 11px
          height: 11px
          margin-left: 2px
          display: block
        .right-name.active
          color: $color-D32F2F

    .container
      width: 100vw
      height: 100vh
      overflow: hidden
      .big-container
        width: 400vw
        height: 100vh
        display: flex
        transition: all 0.3s
        .container-item
          width: 100vw
          height: 100vh
          box-sizing: border-box
          padding: 90px 0 0
          .list-container
            padding: 0 15px
            .list-item
              padding-top: 10px
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
    .footer-box
      position: fixed
      width: 100vw
      height: 64px
      z-index: 40
      bottom: 0
      left: 0
      background: $color-white
      box-sizing: border-box
      padding: 10px 15px
      .footer-btn
        width: 100%
        height: 100%
        background: $color-27273E
        border-radius: 2px
        line-height: 44px
        text-align: center
        font-family: $font-family-regular
        color: $color-white
        font-size: $font-size-16
        letter-spacing: 0.8px
    .bg
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: rgba(0,0,0,0.8)
      z-index: 40
    .box
      position: fixed
      bottom: -200px
      left: 0
      font-size: 14px
      font-family: $font-family-regular
      color: $color-27273E
      width: 100%
      height: 175px
      line-height: 55px
      text-align: center
      background: $color-F6F6F6
      transition: all 0.3s
      z-index: 40
      .item
        background: $color-white
      .item:first-child
        border-bottom-1px($color-E6E6E6)
      .cancel
        margin-top: 10px
    .show
      bottom: 0
</style>
