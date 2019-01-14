<template>
  <div class="base-sheet">
    <transition name="fade">
      <div v-if="showMenu" class="bg" @click="hide"></div>
    </transition>
    <dl class="box" :class="{'show': showMenu}" @click.stop>
      <template v-for="(item, index) in sheetList">
        <dd :key="index" class="item" :class="itemStyle(index)" @click="selectHandle(item.key, item)">{{item.title}}</dd>
      </template>
      <dt class="item cancel" @click="hide">取消</dt>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_SHEET'

  export default {
    name: COMPONENT_NAME,
    props: {
      sheetList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        showMenu: false
      }
    },
    filters: {
      itemStyle(flag) {
        return flag ? 'border-bottom-1px' : ''
      }
    },
    methods: {
      itemStyle(index) {
        return index !== this.sheetList.length - 1 ? 'border-bottom-1px' : ''
      },
      hide() {
        this.showMenu = false
      },
      show() {
        this.showMenu = true
      },
      selectHandle(key, item) {
        this.$emit('select', key, item)
        this.hide()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-sheet
    z-index: 999
    .bg
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: rgba(0,0,0,0.8)
      z-index :999
    .box
      position: fixed
      bottom: -200px
      left: 0
      font-size: 14px
      font-family: $font-family-regular
      color: $color-27273E
      width: 100%
      height: 175px
      line-height: 55px
      text-align: center
      background: $color-F6F6F6
      transition: all 0.3s
      z-index: 999
      .item
        background: $color-white
      .item:first-child
        border-bottom-1px($color-E6E6E6)
      .cancel
        margin-top: 10px
    .show
      bottom: 0
</style>
