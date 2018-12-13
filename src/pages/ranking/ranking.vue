<template>
  <article class="ranking">
    <section class="tool-bar-box">
      <ul class="tab-one">
        <li :class="['tab-one-item',tabOneIndex===index?'active':'']"
            v-for="(item,index) in tabOne"
            @click="changeTabOne(index)"
            :key="index"
        >
          {{item}}
        </li>
      </ul>
      <div class="tab-two-container">
        <div class="tab-two-box">
          <!--客户-->
          <ul class="tab-two" v-if="tabOneIndex===0">
            <li class="tab-two-item"
                v-for="(item,index) in tabCustomer.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div v-if="index===1">{{tabTwoLastLabel}}{{item}}</div>
              <div v-else>{{item}}</div>
              <img v-if="index===1" class="icon-down" src="./icon-down@3x.png" alt="">
            </li>
          </ul>
          <!--互动-->
          <ul class="tab-two" v-if="tabOneIndex===1">
            <li class="tab-two-item"
                v-for="(item,index) in tabActive.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div>{{item}}</div>
            </li>
          </ul>
          <!--成交率-->
          <ul class="tab-two" v-if="tabOneIndex===2">
            <li class="tab-two-item"
                v-for="(item,index) in tabTurnover.data"
                :key="index"
                @click="changeTabTwo(index)"
            >
              <div>{{item}}</div>
            </li>
          </ul>
          <dl class="tab-line-wrap" :style="tabTwoStyle">
            <dt class="tab-line"></dt>
          </dl>
        </div>
      </div>
    </section>
    <section class="content">
      <scroll ref="scroll"
              v-if="dataArray.length"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <div class="user-card-box"
             v-if="dataArray.length" v-for="(item,index) in dataArray"
             :key="index"
             @click="toCustomerList(item)"
        >
          <user-card :cardInfo="item" :idx="index" useType="ranking"></user-card>
        </div>
      </scroll>
      <section class="exception-box" v-if="isEmpty">
        <exception errType="nodata"></exception>
      </section>
    </section>
    <action-sheet ref="sheet" :dataArray="groupList" @changeGroup="changeGroup"></action-sheet>
    <router-view @refresh="refresh"></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Rank} from 'api'
  import ActionSheet from 'components/action-sheet/action-sheet'
  import Exception from 'components/exception/exception'

  const LIMIT = 10
  const tabOne = ['按客户数', '按互动数', '按成交率']
  const tabCustomer = {data: ['客户总数', '新增客户'], idx: 0}
  const tabActive = {data: ['跟进客户数', '咨询客户数'], idx: 0}
  const tabTurnover = {data: ['0-50%', '51-80%', '81-99%', '100%'], idx: 0}
  const groupList = {data: ['昨天', '近7天', '近30天'], idx: 0}
  const tabTwo = [tabCustomer, tabActive, tabTurnover]
  export default {
    name: 'Ranking',
    data() {
      return {
        groupList,
        dataArray: [],
        isEmpty: false,
        page: 1,
        limit: LIMIT,
        tabOne,
        tabOneIndex: 0,
        tabCustomer,
        tabActive,
        tabTurnover,
        transitionTime: 0,
        startY: 0,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        isAll: false // 是否加载完了
      }
    },
    created() {
      this.$emit('tabChange', 2)
      this._rqGetStaffList()
    },
    methods: {
      refresh() {
        this.resetReqParams()
        this._rqGetStaffList()
      },
      _rqGetMoreStaffList() {
        if (!this.pullUpLoad) return
        if (this.isAll) return this.$refs.scroll.forceUpdate()
        const _data = this._formatData()
        let page = ++this.page
        let limit = this.limit
        const data = {
          page,
          limit,
          ..._data
        }
        Rank.getStaffList(data).then(res => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            if (res.data && res.data.length) {
              let newArr = this.dataArray.concat(res.data)
              this.dataArray = newArr
            } else {
              this.isAll = true
              this.$refs.scroll.forceUpdate()
            }
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _rqGetStaffList() {
        // tab类型 1：按客户数，2：跟进客户数，3：咨询客户数，4：按成交率 - 1
        // 事件类型： all yesterday week month - all
        // 成功率类型 1： 0~50% 2：51%~80% 3：81~99%，4：100% - 0
        const _data = this._formatData()
        const data = {
          page: 1,
          limit: LIMIT,
          ..._data
        }
        Rank.getStaffList(data).then(res => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.dataArray = res.data
            this.isEmpty = !this.dataArray.length
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      // 配置请求的参数
      _formatData() {
        const data = {}
        switch (this.tabOneIndex) {
          case 0 : {
            data.type = 1
            data.rate_type = 0 // 默认值
            if (this.tabCustomer.idx) {
              switch (groupList.idx) {
                case 0 : {
                  data.time = 'yesterday'
                  break
                }
                case 1: {
                  data.time = 'week'
                  break
                }
                case 2: {
                  data.time = 'month'
                  break
                }
                default :
                  break
              }
            } else {
              data.time = 'all'
            }
            break
          }
          case 1 : {
            data.type = this.tabActive.idx ? 3 : 2
            data.rate_type = 0 // 默认值
            data.time = 'all' // 默认值
            break
          }
          case 2 : {
            data.type = 4 // 默认值
            data.time = 'all' // 默认值
            data.rate_type = this.tabTurnover.idx + 1
          }
        }
        return data
      },
      changeTabOne(index) {
        this.transitionTime = 0
        this.tabOneIndex = index
        this.resetReqParams()
        this._rqGetStaffList()
        this.scrollTop()
      },
      changeTabTwo(index) {
        this.transitionTime = 0.3
        if (this.tabOneIndex === 0 && index === 1 && tabTwo[this.tabOneIndex].idx === index) {
          this.$refs.sheet.show()
          return
        }
        tabTwo[this.tabOneIndex].idx = index
        this.resetReqParams()
        this._rqGetStaffList()
        this.scrollTop()
      },
      changeGroup() {
        this._rqGetStaffList()
        this.scrollTop()
      },
      scrollTop() {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0)
      },
      toCustomerList(item) {
        // todo
        // const id = item.id
        // const pageUrl = `/ranking/customer-list`
        // const useType = 'rank-customer-list' // 排行客户列表
        // const progress = 100
        // this.$router.push({path: pageUrl, query: {id, pageUrl, useType, progress}})
      },
      resetReqParams() {
        this.page = 1
        this.limit = LIMIT
        this.isAll = false
      },
      onPullingUp() {
        // 更新数据
        console.info('pulling up and load data')
        // if (this.isAll) return this.$refs.scroll.forceUpdate()
        this._rqGetMoreStaffList()
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
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
    computed: {
      tabTwoStyle() {
        return `
        width:${100 / tabTwo[this.tabOneIndex].data.length}%;
        transform:translate3d(${tabTwo[this.tabOneIndex].idx * 100}%, 0, 0);
        transition: all ${this.transitionTime}s
        `
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      tabTwoLastLabel() {
        let arr = this.groupList.data
        let idx = this.groupList.idx
        return arr[idx]
      }
    },
    components: {
      UserCard,
      Scroll,
      ActionSheet,
      Exception
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .exception-box
    padding-top: 70px

  .ranking
    position: absolute
    top: 62px
    bottom: 0px
    left: 0
    right: 0
    layout(column, block, nowrap)
    background-color: $color-white
    .tool-bar-box
      .tab-one
        width: 270px
        height: 30px
        margin: 25px auto 28px
        layout(row)
        justify-content: center
        align-items: center
        .tab-one-item
          flex: 1
          height: 100%
          font-family: $font-family-medium
          font-size: $font-size-14
          color: $color-20202E
          letter-spacing: 0.3px
          layout()
          justify-content: center
          align-items: center
          border: 0.5px solid rgba(32, 32, 46, 0.10)
          border-radius: 1px
          transition: all .6s
          background-color: $color-white
          &.active
            color: $color-white
            background-color: $color-27273E
      .tab-two-container
        border-bottom: 0.5px solid $color-col-line
        .tab-two-box
          position: relative
          margin: 0 15px
          .tab-two
            position: relative
            height: 30px
            layout(row, block, nowrap)
            .tab-two-item
              flex: 1
              layout(row)
              justify-content: center
              align-items: flex-start
              font-family: $font-family-regular
              font-size: $font-size-14
              color: $color-20202E
              .icon-down
                margin: 3px 0 0 3px
                width: 10px
                height: 5px
          .tab-line-wrap
            position: absolute
            bottom: 0
            left: 0
            width: 50%
            layout()
            align-items: center
            transition: all .3s
            transform: translate3d(0, 0, 0)
            .tab-line
              height: 3px
              width: 30px
              background-color: $color-D32F2F
    .content
      position: absolute
      top: 113px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .user-card-box
        height: 75px
        padding-left: 15px
</style>
