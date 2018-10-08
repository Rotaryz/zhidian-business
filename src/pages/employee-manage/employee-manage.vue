<template>
  <div class="employee-box">
    <scroll ref="scroll0"
            :data="list0"
            bcColor="#f6f6f6"
            :pullUpLoad="pullUpLoadObj0"
            @pullingUp="onPullingUp"
            :showNoMore="showNoMore0">
      <div class="employee-title">账号数量:{{list0.length}}</div>
      <ul class="employee-list border-bottom-1px">
        <li v-for="(item, index) in list0" v-bind:key="index">
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
  import {ease} from 'common/js/ease'
  export default {
    name: 'employee-manage',
    data() {
      return {
        list0: [],
        tabIdx: 0,
        pullUpLoad0: true,
        pullUpLoadThreshold0: 0,
        showNoMore0: false,
        page0: 1,
        nothing0: false,
        scrollToEasing: 'bounce'
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList(loading = true) {
        let data = {
          page: this[`page${this.tabIdx}`]
        }
        Employee.getEmployeeList(data, loading).then((res) => {
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
      jumpNew() {
        let path = `employee-manage/new-employee`
        this.$router.push(path)
      },
      onPullingUp() {
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs['scroll' + this.tabIdx].destroy()
          this.$refs['scroll' + this.tabIdx].initScroll()
        })
      }
    },
    computed: {
      pullUpLoadObj0: function () {
        return this.pullUpLoad0 ? {
          threshold: parseInt(this.pullUpLoadThreshold0),
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
    bottom: 64px
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
