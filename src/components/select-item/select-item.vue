<template>
  <div class="service-item" @click="selectGoods(item)">
    <div class="item-content">
      <img class="item-left" :src="item.image_url" />
      <div class="item-right">
        <div class="right-msg">
          <div class="right-title">{{item.title}}</div>
          <div class="right-down">
            <div class="down-left">
              <p class="down-txt" v-if="type !== 'prize'">现价：¥{{item.platform_price}}</p>
              <p class="down-txt second"><span class="first-txt">库存：{{item.stock}}</span></p>
            </div>
          </div>
        </div>
        <div class="right-select">
          <div class="select-circle" v-show="!item.checked"></div>
          <img src="./icon-pitchup@2x.png" class="checked" v-show="item.checked">
        </div>
      </div>
    </div>
    <div class="tag" v-if="type !== 'prize'" :class="{'goods':item.type == 1}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['item', 'type'],
    data() {
      return {
      }
    },
    methods: {
      selectGoods(item) {
        this.$emit('selectSome', item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .service-item
    width: 100%
    padding-top: 29%
    height: 0
    background: $color-white
    border-1px($color-col-line, 2px)
    position: relative
    overflow: hidden
    .item-content
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      box-sizing: border-box
      padding: 15px 0 15px 10px
      display: flex
      align-items: center
      .item-left
        width: 18.666vw
        height: @width
        margin-right: 10px
        border-1px($color-E6E6E6)
        overflow: hidden
        position: relative
        object-fit: cover
        .left-cover
          position: absolute
          width: 100%
          height: 100%
          background: rgba(54,53,71,0.8)
          line-height: 18.666vw
          text-align: center
          color: $color-white
          font-size: $font-size-12
          font-family: $font-family-regular
          transition: all .3s
        .hide.left-cover
          opacity: 0
      .item-right
        flex: 1
        overflow: hidden
        height: 18vw
        display: flex
        .right-msg
          flex: 1
          overflow: hidden
          display: flex
          flex-direction: column
          justify-content: space-between
        .right-select
          width: 44px
          height: 100%
          display: flex
          align-items: center
          justify-content: center
          font-size: 0
          .select-circle
            width: 20px
            height: 20px
            box-sizing: border-box
            border: 1px solid $color-9B9B9B
            border-radius: 50%
          .checked
            width: 20px
            height: 20px
        .right-title
          font-size: $font-size-16
          color: $color-4A4657
          font-family: $font-family-regular
          letter-spacing: 0.8px
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .right-down
          display: flex
          justify-content: space-between
          align-items: flex-end
          .down-left
            flex: 1
            overflow: hidden
            .down-txt
              font-family: $font-family-regular
              color: $color-706B82
              font-size: $font-size-14
              letter-spacing: 0.6px
            .second
              margin-top: 7px
              display: flex
              justify-content: space-between
    .tag
      width: 38px
      height: 38px
      position: absolute
      left: -2px
      top: -2px
      z-index: 1
      icon-image(pic-label_pt)
    .goods
      icon-image(pic-label_kj)
</style>
