<template>
  <div class="brand-templet">
        <div class="container-item">
          <scroll ref="scroll"
                  :data="list"
                  bcColor="#f6f6f6"
                  :pullUpLoad="pullUpLoadObj"
                  @pullingUp="onPullingUp"
                  :showNoMore="showNoMore">
            <div class="list-container">

            </div>
          </scroll>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  export default {
    data() {
      return {
        tabIdx: 0,
        list: [],
        numObj: {},
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        showNoMore: false,
        page: 1,
        nothing: false,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了'
      }
    },
    created() {
    },
    methods: {
      _getList(loading = true) {
      },
      onPullingUp() {
        if (this.showNoMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.page++
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 20)
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    components: {
      Scroll
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .brand-templet
    fill-box()
    z-index: 20
    background: $color-F6F6F6

</style>
