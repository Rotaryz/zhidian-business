<template>
  <article class="ai-analyse">
    <div class="ai-analyse-box">
      <scroll ref="scroll"
              v-if="dataArray.length"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <div class="user-card-box" v-for="(item,index) in dataArray" :key="index" @click="toCapacityModel(item)">
          <user-card :cardInfo="item" :idx="index" useType="ai"></user-card>
        </div>
      </scroll>
    </div>
    <section class="exception-box" v-if="isEmpty">
      <exception errType="nodata"></exception>
    </section>
    <router-view @refresh="refresh"></router-view>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from 'components/user-card/user-card'
  import Scroll from 'components/scroll/scroll'
  import {Analyse} from 'api'
  import Toast from 'components/toast/toast'
  import {ERR_OK} from 'common/js/config'
  import Exception from 'components/exception/exception'
  import storage from 'storage-controller'

  const LIMIT = 10
  export default {
    name: 'AI',
    data() {
      return {
        dataArray: [],
        isEmpty: false,
        page: 1,
        limit: LIMIT,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        isAll: false
      }
    },
    created() {
      this.$emit('tabChange', 3)
      this._rqGetStaffSellList()
    },
    methods: {
      refresh() {
        this.resetReqParams()
        this._rqGetStaffSellList()
      },
      resetReqParams() {
        this.page = 1
        this.limit = LIMIT
        this.isAll = false
      },
      toCapacityModel(item) {
        const id = item.employee_id
        const pageUrl = `/capacity-model`
        console.log(pageUrl)
        this.$router.push({path: pageUrl, query: {id, pageUrl}})
      },
      _rqGetStaffSellList() {
        const data = {page: 1, limit: LIMIT, merchant_id: this.userInfo.merchant_id}
        Analyse.getStaffSellList(data).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray = res.data
            this.isEmpty = !this.dataArray.length
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      onPullingUp() {
        // 更新数据 todo
        if (!this.pullUpLoad) return
        if (this.isAll) return this.$refs.scroll.forceUpdate()
        console.info('pulling up and load data')
        let page = ++this.page
        let limit = this.limit
        const data = {page, limit, merchant_id: this.userInfo.merchant_id}
        Analyse.getStaffSellList(data).then(res => {
          if (res.error === ERR_OK) {
            if (res.data && res.data.length) {
              let newArr = this.dataArray.concat(res.data)
              this.dataArray = newArr
            } else {
              this.$refs.scroll.forceUpdate()
              this.isAll = true
            }
          } else {
            this.$refs.toast.show(res.message)
          }
        })
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
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      userInfo() {
        return storage.get('info')
      }
    },
    components: {
      UserCard,
      Scroll,
      Toast,
      Exception
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .exception-box
    padding-top: 137px

  .ai-analyse
    fill-box()
    overflow: hidden
    bottom: 0
    .ai-analyse-box
      fill-box()
      overflow: hidden
      top: 62px
      bottom: 0
      background-color: $color-white-fff
    .user-card-box
      height: 75px
      padding-left: 15px
</style>
