<template>
  <div class="card-item" @click="choose(dataInfo)">
    <article class="container">
      <section class="left">
        <div class="avatar-wrapper" :style="{backgroundImage: 'url(' + dataInfo.image_url + ')'}"></div>
      </section>
      <ul class="middle">
        <li>{{dataInfo.title}}</li>
        <li class="store">库存：{{dataInfo.stock}}</li>
      </ul>
      <div class="right" :class="dataInfo.isCheck?'active':''"></div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { mapActions } from 'vuex'

  export default {
    props: {
      dataInfo: {
        type: Object,
        default: {}
      },
      idx: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        isCheck: this.dataInfo.isCheck
      }
    },
    methods: {
      choose(item) {
        this.$emit('choose', item, this.idx)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .card-item
    position: relative
    height: 0
    padding-top: 28.98551%
    border-1px($color-E6E6E6, 4px)
    background: $color-white
    .container
      fill-box(absolute)
      layout(row, block, nowrap)
      align-items: center
    .left
      position: relative
      width: 20.29%
      padding: 0 10px
      .avatar-wrapper
        width: 100%
        height: 0
        padding-bottom: 100%
        background: #cccccc
        border-radius: 2px
        position: relative
        background-repeat: no-repeat
        background-position: center center
        background-size: cover
        background-image: url('')
    .right
      margin: 0 15px 0 10px
      width: 20px
      height: @width
      border-radius: 50%
      background: #FFFFFF
      border: 1px solid #9B9B9B
      box-sizing: border-box
      &.active
        icon-image(icon-pitchup)
        border: 0px solid #9B9B9B
    .middle
      flex: 1
      overflow: hidden
      height: 65%
      layout()
      justify-content: space-between
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #4A4657;
      letter-spacing: 0.8px;
      li
        no-wrap()
      .store
        font-size: 14px;
        color: #706B82;
        letter-spacing: 0.6px;
</style>
