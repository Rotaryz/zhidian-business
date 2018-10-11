<template>
  <transition name="fade">
    <div class="employee-item">
      <div class="item-box border-bottom-1px">
        <div class="item-box-left">
          <div class="item-left" v-if="item.avatar" :style="{backgroundImage: 'url(' + item.avatar + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
          <img class="item-left" src="./pic-default_people@2x.png" v-else />
          <div class="item-left-name">{{item.name}}</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 0">未知</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 1">店长</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 2">店员</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 3">财务</div>
        </div>
        <div class="item-box-right" v-if="item.role_id * 1 !== 1 && item.status * 1 === 0" @click="navTo(item)">
          <div class="send-text">发送邀请</div>
          <img src="./icon-press_right@2x.png" class="arrow-icon">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'employee-item',
    props: ['item'],
    data() {
      return {}
    },
    methods: {
      navTo(item) {
        this.$router.push(this.$route.path + '/invitation')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .employee-item
    background: $color-white
    padding-left: 15px
  .item-box
    layout(row)
    height: 75px
    align-items: center
    flex: 1
    overflow :hidden
    justify-content: space-between
    padding-right: 15px
    .item-box-left
      layout(row)
      align-items: center
      .item-left
        width: 10.666vw
        height: @width
        background: #ddd
        margin-right: 10px
        border-radius: 50px
        position: relative
      .item-left-name
        font-family: $font-family-regular
        color: $color-363547
        font-size: $font-size-16
        margin-right: 10px
        max-width: 40vw
        no-wrap()
      .item-left-icon
        font-family: $font-family-regular
        color: $color-EF705D
        font-size: $font-size-12
        border: 1px solid $color-EF705D
        padding: 1px 4px 2px
        border-radius: 2px
    .item-box-right
      layout(row)
      align-items: center
      .send-text
        font-family: $font-family-regular
        color: $color-9B9B9B
        font-size: $font-size-14
      .arrow-icon
        width: 7.5px
        margin-left: 10px
        height: 12.5px
        display: block
        padding-top: 1px
</style>
