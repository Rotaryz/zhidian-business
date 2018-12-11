<template>
  <div class="home" @touchmove.prevent>
    <router-view class="home-view" @showExpire="showExpire"/>
    <expire-modal ref="expireModal"></expire-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import ExpireModal from 'components/expire-modal/expire-modal'

  const COMPONENT_NAME = 'home'

  export default {
    name: COMPONENT_NAME,
    components: {
      ExpireModal
    },
    created() {
      this.$storage.set('hasShowExpire', false)
    },
    methods: {
      showExpire() {
        this.$refs.expireModal.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"
  .home
    .home-view
      z-index: 10
</style>
