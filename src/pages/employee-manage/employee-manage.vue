<template>
  <div class="employee-box">
    <div class="scroll-wrapper">
      <scroll
        v-if="dataArray.length"
        bcColor="#f6f6f6"
        ref="scroll"
        :data="dataArray"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="onPullingUp"
      >
        <div class="employee-title border-bottom-1px">
          <span class="count">店员帐号({{hasUseNum}}/{{allNum}})</span>
          <span class="title-right" @click="navTo()"><span>邀请店员</span><img src="./icon-press_right@2x.png" class="arrow-icon"></span>
        </div>
        <ul class="employee-list border-bottom-1px">
          <li v-for="(item, index) in dataArray" :key="index" class="employee-li">
            <employee-item :item="item" @editEmployee="editEmployee"></employee-item>
          </li>
        </ul>
      </scroll>
      <div class="nothing-box" v-if="isEmpty">
        <img src="./pic-empty_order@2x.png" class="nothing-img">
        <div class="nothing-txt">暂无数据</div>
      </div>
    </div>
    <div class="footer-box" @click="jumpNew('')">
      <div class="footer-btn">新建店员</div>
    </div>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import EmployeeItem from 'components/employee-item/employee-item'
  import { Employee } from 'api'

  const LIMIT = 10
  export default {
    name: 'employee-manage',
    data() {
      return {
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        hasMore: true,
        isEmpty: false,
        allNum: 0,
        hasUseNum: 0,
        delItem: ''
      }
    },
    created() {
      this._getList()
    },
    methods: {
      refresh() {
        this.page = 1
        this.hasMore = true
        this._getList()
      },
      navTo(item) {
        // this.$router.push(`${this.$route.path}/invitation`)
        this.$router.push(`/invitation`)
        if (this.ios) {
          setTimeout(() => {
            location.reload()
            location.reload()
          }, 300)
        }
      },
      editEmployee(item) {
        this.jumpNew(item.employee.shop_id)
      },
      _getList(data = {page: 1}) {
        if (!this.hasMore) return
        Employee.getShopList({...data, limit: LIMIT}).then((res) => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$toast.show(res.message)
            return
          }
          this.allNum = res.usabled_shops || 0
          this.hasUseNum = res.used_shops || 0
          if (!res.meta || res.meta.current_page === 1) {
            this.dataArray = res.data
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          if (res.meta) {
            this.hasMore = (res.meta.current_page !== res.meta.last_page)
            this.pullUpLoad = this.hasMore
          } else {
            this.pullUpLoad = false
          }
        })
      },
      jumpNew(id) {
        let path = `employee-manage/new-employee?id=${id}`
        this.$router.push(path)
      },
      onPullingUp() {
        // 更新数据
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this._getList({page: ++this.page})
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return // 防止下拉报错
          this.rebuildScroll()
        },
        deep: true
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
    components: {
      Scroll,
      EmployeeItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

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
  .employee-li
    padding: 0 15px
    margin-bottom: 10px
    &:first-child
      margin-top: 15px

  .employee-box
    fill-box()
    z-index: 51
    background: $color-F6F6F6

  .scroll-wrapper
    position :fixed
    top:0
    left:0
    right :0
    bottom :64px

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
      background: $color-363537
      border-radius: 2px
      line-height: 44px
      text-align: center
      font-family: $font-family-regular
      color: $color-white
      font-size: $font-size-16
      letter-spacing: 0.8px

  .employee-title
    height: 45px
    line-height: 45px
    padding: 0 15px
    font-family: $font-family-regular
    color: $color-363547
    font-size: $font-size-16
    background: $color-white
    display: flex
    justify-content: space-between
    align-items: center
    .title-right
      font-size: $font-size-14
      display: flex
      align-items: center
    .arrow-icon
      width: 7.5px
      height: 12.5px
      margin-left: 5px
</style>
