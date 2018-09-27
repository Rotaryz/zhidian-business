<template>
  <div class="home" @touchmove.prevent>
    <router-view/>
    <tab></tab>
  </div>
</template>
<script>
  import Tab from 'components/tab/tab'

  const COMPONENT_NAME = 'home'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {}
    },
    created() {
    },
    methods: {
    },
    components: {
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
</style>
