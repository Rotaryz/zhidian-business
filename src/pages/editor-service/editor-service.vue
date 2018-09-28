<template>
  <div class="editor-service">
    123
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        type: 'new',
        id: ''
      }
    },
    created() {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .editor-service
    fill-box()
    z-index: 70
    background: $color-white

</style>
