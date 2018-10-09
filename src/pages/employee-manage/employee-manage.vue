<template>
  <div class="employee-box">
    <scroll
      bcColor="#f6f6f6"
      ref="scroll"
      :data="dataArray"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <div class="employee-title">账号数量:{{dataArray.length}}</div>
      <ul class="employee-list border-bottom-1px">
        <li v-for="(item, index) in dataArray" :key="index">
          <employee-item :item="item"></employee-item>
        </li>
      </ul>
    </scroll>
    <div class="footer-box" @click="jumpNew">
      <div class="footer-btn">新建店员</div>
    </div>
    <router-view-common></router-view-common>
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
        hasMore: true
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList(data = {page: 1}) {
        Employee.getEmployeeList({...data, limit: LIMIT}).then((res) => {
          if (!this.hasMore) return
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$toast.show(res.message)
            return
          }
          if (res.meta.current_page === 1) {
            this.dataArray = res.data
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          this.hasMore = res.meta.current_page !== res.meta.last_page
          this.pullUpLoad = !this.hasMore
        })
      },
      jumpNew() {
        let path = `employee-manage/new-employee`
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
  .employee-box
    fill-box()
    z-index: 51
    background: $color-F6F6F6

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
    padding-left: 15px
    font-family: $font-family-regular
    color: $color-363547
    font-size: $font-size-16
</style>
