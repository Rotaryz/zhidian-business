<template>
  <div class="discount-coupon-editor">
    discount-coupon-editor
    <div @click="_showSheet">12222222222222</div>
    <base-sheet ref="sheet" :sheetList="SHEET_LIST" @select="selectHandle"></base-sheet>
    <router-view-common @refresh="refresh"></router-view-common>
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'DISCOUNT_COUPON_EDITOR'
  const SHEET_LIST = [
    {title: '满减券', key: '1'},
    {title: '折扣券', key: '2'}
  ]
  export default {
    name: PAGE_NAME,
    data() {
      return {
        SHEET_LIST: SHEET_LIST
      }
    },
    methods: {
      refresh() {
        // todo
      },
      _showSheet() {
        this.$refs.sheet && this.$refs.sheet.show()
      },
      selectHandle(key) {
        console.log(key)
        this.$router.push(this.$route.path + '/discount-coupon-select?key=' + key)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .discount-coupon-editor
    fill-box(fixed)
    z-index :80
    background: $color-F6F6F6
</style>
