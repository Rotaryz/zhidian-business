<template>
  <div class="git-out">
    <scroll
      bcColor="#fff"
      ref="scroll"
      :data="dataArray"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <div>
        <section class="header">
          <div class="avatar" v-if="image_url" :style="{backgroundImage: 'url(' + image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
          <div class="avatar" v-else></div>
          <div class="name-wrapper">
            <div class="name">{{employee.name}}</div>
            <div class="position">{{employee.role}}</div>
          </div>
          <div class="title">发放金额</div>
          <figure class="input-wrapper">
            <div class="unit">¥</div>
            <input type="number" class="input-content" v-model="getMoney">
          </figure>
          <div class="explain">可发放金额 ¥{{employee.commission}}</div>
          <div class="btn" :class="getMoneyReg?'active':''" @click="saveBtn">确定</div>
        </section>
        <div class="margin-box-10px"></div>
        <section class="give-list">
          <div class="top">
            <div class="title">发放记录</div>
            <div class="line"></div>
          </div>
          <ul class="records-list" v-if="dataArray.length">
            <li class="item-wrapper border-bottom-1px" v-for="(item,index) in dataArray" :key="index">
              <div class="left">{{item.created_at}}</div>
              <div class="right">{{item.total}}</div>
            </li>
          </ul>
          <article class="nothing-box" v-if="isEmpty">
            <img src="./pic-empty_order@2x.png" class="nothing-img">
            <div class="nothing-txt">暂无数据</div>
          </article>
        </section>

      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Property } from 'api'
  import { mapGetters } from 'vuex'

  const LIMIT = 10

  export default {
    components: {
      Scroll
    },
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
        bankInfo: {
          bank: '',
          name: '',
          card: '',
          remaining: '100.00' // todo
        },
        getMoney: '',
        image_url: '',
        id: ''
      }
    },
    created() {
      this.image_url = this.employee.image_url
      this.id = this.$route.query.id
      this._getIssueLog()
      console.log(this.employee)
      this.bankInfo.remaining = this.employee.commission
    },
    methods: {
      _getIssueLog(data = {page: 1, shop_id: this.id}, loading) {
        if (!this.hasMore) return
        Property.getIssueLog({...data, limit: LIMIT}, loading).then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          if (!res.meta || res.meta.current_page === 1) {
            this.dataArray = res.data
            // this.dataArray = [1] // todo
            this.isEmpty = !this.dataArray.length
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          if (res.meta) {
            this.hasMore = res.meta.current_page !== res.meta.last_page
            this.pullUpLoad = !this.hasMore
          } else {
            this.pullUpLoad = false
          }
        })
      },
      _updateIssue() {
        Property.updateIssue({shop_id: this.id, money: this.getMoney}).then(res => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.$toast.show('发送成功')
          this.$emit('refresh')
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        })
      },
      saveBtn() {
        if (!this.getMoneyReg) {
          this.$toast.show('请输入正确的金额')
          return
        }
        this._updateIssue()
      },
      onPullingUp() {
        // 更新数据
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this._getIssueLog({page: ++this.page})
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
      ...mapGetters(['employee']),
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      getMoneyReg() {
        return (typeof +this.getMoney === 'number') && +this.getMoney > 0 && +this.getMoney <= +this.bankInfo.remaining
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  input
    height: 46px
    &::-webkit-input-placeholder
      color: $color-CCCCCC
    &::-ms-input-placeholder
      color: $color-CCCCCC
    &::-moz-placeholder
      color: $color-CCCCCC

  .nothing-box
    display: flex
    flex-direction: column
    align-items: center
    font-size: 0
    padding: 50px 0
    .nothing-img
      width: 100px
      height: 80px
      margin-bottom: 5px
    .nothing-txt
      font-size: $font-size-12
      color: $color-CCCCCC
      font-family: $font-family-regular

  .git-out
    fill-box()
    z-index: 70
    background: $color-F6F6F6
    .header
      background: #fff
      padding: 25px 0
      .avatar
        width: 60px
        height: @width
        border-radius: 50%
        opacity: 0.6
        background: #ccc
        margin: 0 auto 8px
      .name-wrapper
        padding: 8px 10px 40px
        layout(row)
        justify-content: center
        align-items: center
        .name
          font-size: 18px;
          color: #363547;
          letter-spacing: 0.8px;
          margin-right: 2.5px
        .position
          font-size: 12px;
          color: #EF705D;
          line-height: 1
          padding: 2px 3px
          border: 1px solid #EF705D;
          border-radius: 4px;
      .title
        font-size: 14px;
        color: #363547;
        letter-spacing: 0.6px;
        padding-left: 15px
        padding-bottom: 12px
      .input-wrapper
        margin-left: 15px
        layout(row, block, nowrap)
        align-items: center
        height: 58px
        .unit
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #363547;
          position: relative
          bottom: -4px
        .input-content
          flex: 1
          overflow: hidden
          padding: 0 15px 0 3px
          font-family: DINAlternate-Bold;
          font-size: 46px;
          color: #363547;
          letter-spacing: 1.77px;
          line-height: 1
          height: 46px
      .explain
        text-indent: 15px
        font-size: 14px;
        color: #706B82;
        letter-spacing: 0.6px;
        padding: 14px 0 20px
      .btn
        margin: 0 15px 0
        height: 45px
        background: #363547;
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.56px;
        text-align: center
        line-height: @height
        opacity: 0.5
        &.active
          opacity: 1
    .give-list
      padding: 25px 15px
      background: #fff
      .top
        .title
          font-size: 16px;
          color: #363547;
          text-align: center;
        .line
          height: 4px
          width: 29px
          background: #CCCCCC;
          border-radius: 4px;
          margin: 8px auto 12px
      .records-list
        .item-wrapper
          height: 50px
          layout(row, block, nowrap)
          align-items: center
          justify-content: space-between
          font-size: 14px;
          color: #363547;
          letter-spacing: 0.42px;
</style>
