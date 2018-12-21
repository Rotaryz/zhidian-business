<template>
  <div class="service-manage">
    <div class="header-tab border-bottom-1px">
      <div class="tab-box">
        <div class="tab-item" :class="tabIdx == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index, item)">
          {{item.txt}}({{numObj[tabsNumArr[index]]}})
        </div>
      </div>
      <div class="underline-box" :style="'transform: translate(' + tabIdx*100 + '%,0)'">
        <div class="underline"></div>
      </div>
    </div>
    <div class="container">
      <div class="big-container" :style="'transform: translate(-' + tabIdx*50 + '%,0)'">
        <div class="container-item">
          <scroll ref="scroll0"
                  :data="list0"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj0"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore0">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list0" :key="index">
                <service-item :tabIdx="tabIdx"
                              :item="item"
                              :showEdit="item.showEdit"
                              @showEdit="showEditor"
                              @itemEditor="itemEditor"
                              @itemDown="itemDown"
                              @itemDelete="itemDelete">
                </service-item>
              </div>
              <div class="nothing-box" v-if="nothing0">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无数据</div>
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
                <service-item :tabIdx="tabIdx"
                              :item="item"
                              :showEdit="item.showEdit"
                              @showEdit="showEditor"
                              @itemEditor="itemEditor"
                              @itemDown="itemDown"
                              @itemDelete="itemDelete">
                </service-item>
              </div>
              <div class="nothing-box" v-if="nothing1">
                <img src="./pic-empty_order@2x.png" class="nothing-img">
                <div class="nothing-txt">暂无数据</div>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
    <div class="footer-box">
      <div class="footer-btn" @click="toDetail('new')">新建服务</div>
    </div>
    <router-view-common @refresh="refresh"></router-view-common>
    <modal ref="modal" @confirm="modalConfirm"></modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import ServiceItem from 'components/service-item/service-item'
  import Modal from 'components/confirm-msg/confirm-msg'
  import Scroll from 'components/scroll/scroll'
  import { ServiceApi } from 'api'
  import {ease} from 'common/js/ease'
  const TABS = [
    {txt: '已上架', id: 0},
    {txt: '已下架', id: 1}
  ]
  const TABSNUM = ['online_count', 'offline_count']
  export default {
    data() {
      return {
        tabList: TABS,
        tabIdx: 0,
        list0: [],
        list1: [],
        numObj: {},
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
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        temporaryItem: {}, // 缓存需要处理的item
        temporaryType: ''
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList(loading = true) {
        let data = {
          page: this[`page${this.tabIdx}`],
          status: this.tabIdx + 1
        }
        ServiceApi.getServiceList(data, loading).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this._setTabNum(res)
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
      refresh() {
        this._initAny()
        this._getList(false)
      },
      _setTabNum(obj) {
        this.numObj = {
          online_count: obj.online_count,
          offline_count: obj.offline_count
        }
      },
      changeTab(idx) {
        this.tabIdx = idx * 1
        this._initAny()
        this._initAll()
        this._getList()
      },
      modalConfirm() {
        if (!this.temporaryItem.id) return
        switch (this.temporaryType) {
          case 'down':
            this._serviceDown(this.temporaryItem)
            break
          case 'del':
            this._serviceDel(this.temporaryItem)
            break
        }
      },
      showEditor(item) {
        this['list' + this.tabIdx] = this['list' + this.tabIdx].map((item1) => {
          if (+item.id === +item1.id) {
            item1.showEdit = !item1.showEdit
          } else {
            item1.showEdit = false
          }
          return item1
        })
      },
      itemEditor(item) {
        let id = item.id
        this.toDetail('editor', id)
      },
      async itemDown(item) {
        let res = await this._checkActivity(item)
        if (res === 'error') return
        this.temporaryItem = item
        this.temporaryType = 'down'
        if (res) {
          this.$refs.modal.show({msg: '该服务已关联活动，下架会导致活动下架，确定吗？'})
        } else {
          this.$refs.modal.show({msg: '确定下架该服务吗？'})
        }
      },
      _serviceDown(item) {
        ServiceApi.setServiceDown(item.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$toast.show('操作成功')
            this.numObj[this.tabsNumArr[this.tabIdx]]--
            this.numObj[this.tabsNumArr[1]]++
            this['list' + this.tabIdx] = this['list' + this.tabIdx].filter((item1) => {
              return +item1.id !== +item.id
            })
            setTimeout(() => {
              this.$refs[`scroll${this.tabIdx}`].forceUpdate()
            }, 20)
          }
        })
      },
      async itemDelete(item) {
        this.temporaryItem = item
        this.temporaryType = 'del'
        this.$refs.modal.show({msg: '确定删除该服务吗？'})
      },
      _serviceDel(item) {
        ServiceApi.setServiceDel(item.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.$toast.show('操作成功')
            this.numObj[this.tabsNumArr[this.tabIdx]]--
            this['list' + this.tabIdx] = this['list' + this.tabIdx].filter((item1) => {
              return +item1.id !== +item.id
            })
            setTimeout(() => {
              this.$refs[`scroll${this.tabIdx}`].forceUpdate()
            }, 20)
          } else {
            this.$toast.show(res.message)
            this['list' + this.tabIdx] = this['list' + this.tabIdx].map((item1) => {
              item1.showEdit = false
              return item1
            })
          }
        })
      },
      async _checkActivity(item) {
        let res = await ServiceApi.getServiceConect(item.id)
        this.$loading.hide()
        if (res.error === this.$ERR_OK) {
          return res.data.length
        } else {
          this.$toast.show(res.message)
          return 'error'
        }
      },
      toDetail(type, id = '') {
        if (type === 'new') {
          this._initAll()
        }
        let url = `${this.$route.path}/editor-service?type=${type}&id=${id}`
        this.$router.push(url)
      },
      _initAll() {
        for (let i = 0; i < 2; i++) {
          this['list' + i] = this['list' + i].map((item1) => {
            item1.showEdit = false
            return item1
          })
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
          status: this.tabIdx + 1
        }
        ServiceApi.getServiceList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this._setTabNum(res)
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
      ServiceItem,
      Scroll,
      Modal
    },
    computed: {
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
    .header-tab
      position: fixed
      width: 100vw
      height: 45px
      top: 0
      left: 0
      z-index: 60
      background: $color-white
      .tab-box
        width: 100%
        height: 45px
        display: flex
        .tab-item
          flex: 1
          height: 45px
          line-height: 44px
          text-align: center
          font-size: $font-size-16
          color: $color-27273E
          font-family: $font-family-regular
          letter-spacing: 0.8px
        .tab-item.active
          font-family: $font-family-medium
      .underline-box
        height: 3px
        position: absolute
        bottom: 0
        width: 50%
        display: flex
        justify-content: center
        transform: translate(0, 0)
        transition: all 0.3s
        .underline
          width: 30px
          height: 3px
          background: $color-D32F2F
          border-radius: 3px

    .container
      width: 100vw
      height: 100vh
      overflow: hidden
      .big-container
        width: 200vw
        height: 100vh
        display: flex
        transition: all 0.3s
        .container-item
          width: 100vw
          height: 100vh
          box-sizing: border-box
          padding: 45px 0 64px
          background: $color-F6F6F6
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
      z-index: 60
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
</style>
