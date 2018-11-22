<template>
  <transition name="fade">
    <div class="employee-item" @click="toDetail(item)">
      <div class="item-box border-bottom-1px">
        <div class="item-box-left">
          <div class="left-box">
            <div class="item-left" v-if="item.employee.avatar" :style="{backgroundImage: 'url(' + item.employee.avatar + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
            <img class="item-left" src="./pic-default_people@2x.png" v-else />
            <div class="item-left-icon" v-if="item.employee.role_id * 1 === 0">未知</div>
            <div class="item-left-icon" v-if="item.employee.role_id * 1 === 1">店长</div>
            <div class="item-left-icon" v-if="item.employee.role_id * 1 === 2">店员</div>
            <div class="item-left-icon" v-if="item.employee.role_id * 1 === 3">财务</div>
          </div>
          <div class="center-box">
            <div class="item-left-name">{{item.employee.name ? item.employee.name : item.employee.nickname}}</div>
            <div class="item-left-name" :class="{'gray' : !item.employee.openid || item.employee.deleted}">{{(!item.employee.openid || item.employee.deleted) ? '未绑定' : item.employee.mobile}}</div>
          </div>
        </div>
        <!--<div class="item-box-right" v-if="item.role_id * 1 !== 1 && item.status * 1 === 0" @click="navTo(item)">-->
          <!--<div class="send-text">发送邀请</div>-->
          <!--<img src="./icon-press_right@2x.png" class="arrow-icon">-->
        <!--</div>-->
        <div class="item-box-right">
          <div class="status-txt" :class="{'red-text' : item.switch}">{{+item.switch ? '已开启' : '已关闭'}}</div>
          <img src="./icon-press_right@2x.png" class="arrow">
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
      toDetail(item) {
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
  .item-box
    layout(row)
    height: 70px
    align-items: center
    flex: 1
    overflow :hidden
    justify-content: space-between
    .item-box-left
      layout(row)
      align-items: center
      .left-box
        position: relative
      .item-left
        width: 10.666vw
        height: @width
        background: #ddd
        margin: 0 10px
        position: relative
      .center-box
        height: 10.666vw
        display: flex
        flex-direction: column
        justify-content: space-between
        .item-left-name
          font-family: $font-family-regular
          color: $color-363547
          font-size: $font-size-16
          margin-right: 10px
          max-width: 40vw
          no-wrap()
          &.gray
            color: #9c9c9c
      .item-left-icon
        font-family: $font-family-regular
        color: $color-white
        font-size: $font-size-10
        width: 10.666vw
        height: 14px
        position: absolute
        left: 10px
        bottom: 0
        background: rgba(54,53,71,0.7)
        line-height: 14px
        text-align: center
    .item-box-right
      layout(row)
      align-items: center
      .status-txt
        font-size: $font-size-14
        color: $color-1AC521
        font-family: $font-family-regular
        &.red-text
          color: $color-EF705D
      .arrow
        width: 7px
        height: 12px
        margin-right: 15px
        margin-left: 7px

</style>
