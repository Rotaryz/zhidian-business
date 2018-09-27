<template>
  <transition :name="entryAnimation">
    <keep-alive v-if="keepAlive">
      <router-view @refresh="refresh"></router-view>
    </keep-alive>
    <router-view v-else @refresh="refresh"></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
  const DEFAULT_TITLE = '商家助手'
  const HOME_ROUTE = '/home'
  const DEFAULT_ROUTE = '/login'
  export default {
    data() {
      return {
        keepAlive: false,
        routerArr: [],
        entryAnimation: 'slide',
        index: 0,
        currentRoute: ''
      }
    },
    created() {
    },
    methods: {
      refresh() {
        // todo
        console.log('refresh')
      },
      _checkAuthorize() {
        const hasToken = this.$storage.has('token')
        if (!hasToken) {
          this.$router.replace({path: DEFAULT_ROUTE})
        }
      },
      _backNull(to) {
        if (to.path === HOME_ROUTE || to.path === DEFAULT_ROUTE) {
          this.routerArr = []
          this.entryAnimation = 'out'
          return true
        }
        return false
      },
      _changeAnimation(to) {
        let path = to.path
        let flag = this.routerArr.some(val => val === path)
        if (flag) {
          this.routerArr.pop()
          this.entryAnimation = 'out'
        } else {
          this.routerArr.push(path)
          this.entryAnimation = 'slide'
        }
      }
    },
    watch: {
      '$route'(to, from) {
        document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
        this.keepAlive = to.meta.keepAlive
        // window.scrollTo(0, 0)
        this._checkAuthorize()
        if (this._backNull(to)) return
        this._changeAnimation(to)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/animation.styl"
</style>
