<template>
  <transition name="fade">
    <div class="employee-item">
      <div class="item-box border-bottom-1px">
        <div class="item-box-left">
          <div class="item-left" v-if="item.avatar" :style="{backgroundImage: 'url(' + item.avatar + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
          <img class="item-left" src="./pic-default_people@2x.png" v-else />
          <div class="item-left-name">{{item.name ? item.name : item.nickname}}</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 0">未知</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 1">店长</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 2">店员</div>
          <div class="item-left-icon" v-if="item.role_id * 1 === 3">财务</div>
        </div>
        <!--<div class="item-box-right" v-if="item.role_id * 1 !== 1 && item.status * 1 === 0" @click="navTo(item)">-->
          <!--<div class="send-text">发送邀请</div>-->
          <!--<img src="./icon-press_right@2x.png" class="arrow-icon">-->
        <!--</div>-->
        <div class="item-box-right">
          <div class="edit" @click="editEmployee(item)"></div>
          <div class="del" :class="{'not-del': (item.role_id * 1 === 1 || item.status * 1 !== 0)}" @click="delEmployee(item)"></div>
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
      delEmployee(item) {
        this.$emit('delEmployee', item)
      },
      editEmployee(item) {
        this.$emit('editEmployee', item)
      }
    },
    computed: {
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
    padding-right: 30px
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
        line-height: $font-size-24
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
      .edit
        width: 18px
        height: 18px
        bg-image(icon-compile_dy)
        background-size: 100% 100%
        margin-right: 40px
      .del
        width: 18px
        height: 18px
        bg-image(icon-delete2_dy)
        background-size: 100% 100%
      .not-del
        bg-image(icon-delete_dy)
        background-size: 100% 100%
</style>
