<template>
  <div id="app">
    <router-view class="root-view" @$hideTab="hideTab" @$showTab="showTab"></router-view>
    <tab ref="tab"></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    components: {
      Tab
    },
    methods: {
      hideTab() {
        this.$refs.tab && this.$refs.tab.hide()
      },
      showTab() {
        this.$refs.tab && this.$refs.tab.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"

  #app
    height :100vh
    display :flex
    flex-direction: column
    flex-wrap: nowrap
    background :$color-background
    .root-view
      flex: 1
      overflow:hidden
</style>
