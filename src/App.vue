<template>
  <div id="app">
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    components: {
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"

  #app
    background :$color-background
</style>
