<template>
  <div class="activity-item" :class="{'small-item' : !item.start_at_timestamp}">
    <div class="item-container">
      <div class="service-content">
        <div class="item-left" :style="{backgroundImage: 'url(' + item.image_url + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}">
          <!--<div class="left-cover" :class="tabIdx == 2 ? '' : 'hide'">已下架</div>-->
        </div>
        <div class="item-right">
          <div class="right-title">{{item.goods_title}}</div>
          <div class="right-down">
            <div class="down-left">
              <p class="down-txt"><span class="first-txt">库存{{item.stock}}</span></p>
              <p class="down-txt second"><span class="first-txt"><i class="small">¥</i>{{item.platform_price}}</span><del class="original-price">{{item.original_price}}</del></p>
            </div>
            <div class="down-right">
              <div class="down-right-icon" :class="showEdit ? 'active' : ''" @click.stop="showEditCover(item)"></div>
            </div>
          </div>
        </div>
        <div class="editor-box" :class="showEdit ? '' : 'hide'">
          <div class="editor-container">
            <div class="editor-content">
              <div class="editor-item" @click.stop="itemEditor(item)">
                <div class="item-icon edit"></div>
                <div class="item-txt">编辑</div>
              </div>
              <div class="editor-item" v-if="tabIdx != 1" @click.stop="itemDown(item)">
                <div class="item-icon down"></div>
                <div class="item-txt">下架</div>
              </div>
              <div class="editor-item" v-if="tabIdx == 1" @click.stop="itemDelete(item)">
                <div class="item-icon del"></div>
                <div class="item-txt">删除</div>
              </div>
            </div>
            <div class="editor-arrow"></div>
          </div>
        </div>
      </div>
      <p class="activity-type" :class="{'group' : item.rule_id * 1 === 1}"></p>
      <div class="item-header border-top-1px" v-if="item.start_at_timestamp">
        <p class="activity-time">距开始
          <span v-if="endTime && endTime.day && endTime.day>0" class="date">{{endTime.day}}</span><span v-if="endTime && endTime.day>0">:</span>
          <span v-if="endTime && endTime.hour" class="date">{{endTime.hour}}</span>:
          <span v-if="endTime && endTime.minute" class="date">{{endTime.minute}}</span>:
          <span v-if="endTime && endTime.second" class="date">{{endTime.second}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['tabIdx', 'item', 'showEdit'],
    data() {
      return {
        endTime: {},
        current_timestamp: 0
      }
    },
    created() {
      this._timeRun()
    },
    methods: {
      _timeRun() {
        clearInterval(this.timer)
        this.current_timestamp = this.item.current_timestamp
        this.current_timestamp++
        this.endTime = this._timeCheckout(this.item.start_at_timestamp, this.current_timestamp)
        this.timer = setInterval(() => {
          this.current_timestamp++
          this.endTime = this._timeCheckout(this.item.start_at_timestamp, this.current_timestamp)
        }, 1000)
      },
      _timeCheckout(time, nowTime) {
        let nowSecond = new Date(nowTime)
        let differ = time * 1 - nowSecond
        let day = Math.floor(differ / (60 * 60 * 24))
        day = day >= 10 ? day : '0' + day
        let hour = Math.floor(differ / (60 * 60)) - (day * 24)
        hour = hour >= 10 ? hour : '0' + hour
        let minute = Math.floor(differ / 60) - (day * 24 * 60) - (hour * 60)
        minute = minute >= 10 ? minute : '0' + minute
        let second = Math.floor(differ) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
        second = second >= 10 ? second : '0' + second
        let times
        if (differ > 0) {
          times = {
            day,
            hour,
            minute,
            second
          }
        } else {
          times = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        }
        return times
      },
      showEditCover(item) {
        this.$emit('showEdit', item)
      },
      itemEditor(item) {
        this.$emit('itemEditor', item)
      },
      itemDown(item) {
        this.$emit('itemDown', item)
      },
      itemDelete(item) {
        this.$emit('itemDelete', item)
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .activity-item
    width: 100%
    padding-top: 42%
    height: 0
    background: $color-white
    border-1px($color-col-line, 2px)
    position: relative
    .item-container
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      box-sizing: border-box
      padding: 0 10px

    .item-header
      width: 100%
      height: 31%
      display: flex
      align-items: center
      justify-content: space-between
      .activity-time
        font-size: 14px
        display: flex
        align-items: center
        color: $color-20202E
        .date
          width: 18px
          height: 18px
          line-height: 18px
          text-align: center
          background: $color-20202E
          border-radius: 2px
          margin: 0 2px
          font-size: $font-size-10
          color: $color-white
          &:first-child
            margin-left: 4px
    .activity-type
      bg-image(pic-label_kj)
      width: 10vw
      height: 10vw
      background-size: 100% 100%
      position: absolute
      left: -2px
      top: -1px
    .group
      bg-image(pic-label_pt)
      background-size: 100% 100%
    .service-content
      width: 100%
      height: 69%
      box-sizing: border-box
      padding: 15px 0
      display: flex
      align-items: center
      position: relative
      .item-left
        width: 18.666vw
        height: @width
        margin-right: 10px
        border-1px($color-E6E6E6)
        overflow: hidden
        position: relative
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
        flex-direction: column
        justify-content: space-between
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
              color: #706b82
              font-size: $font-size-14
              letter-spacing: 0.6px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              .small
                font-style: normal
                font-size: 14px
              .original-price
                color: $color-706B82
                font-size: $font-size-12
                margin-left: 4px
            .second
              margin-top: 8px
              color: #181700
              font-size: $font-size-18
              display: flex
              align-items: baseline
          .down-right
            width: 10.6vw
            height: 5.3vw
            margin-left: 6vw
            position: relative
            .down-right-icon
              width: 10.6vw
              height: 5.3vw
              icon-image('./icon-function')
            .down-right-icon.active
              icon-image('./icon-function_click')
    .editor-box
      position: absolute
      height: 60px
      right: 14.6vw
      bottom: 5px
      width: 110px
      overflow: hidden
      transition: all 0.3s
      .editor-container
        display: flex
        align-items: flex-end
        height: 55px
        position: absolute
        right: 0
        top: 0
        transition: all 0.3s
        .editor-content
          background: rgba(0, 0, 0, 0.8)
          box-shadow: 0 1px 5px 0 rgba(54,53,71,0.50)
          border-radius: 2px
          height: 100%
          padding: 0 10px
          display: flex
          .editor-item
            width: 40px
            height: 100%
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            .item-icon
              width: 17px
              height: 17px
              margin-bottom: 9px
              &.edit
                icon-image('./icon-compile_kj')
              &.del
                icon-image('./icon-delete')
              &.down
                icon-image('./icon-offline')
            .item-txt
              font-size: $font-size-10
              font-family: $font-family-regular
              color: $color-white
        .editor-arrow
          width: 0
          height: 0
          border-width: 5px 0 5px 5px
          border-style: solid
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.8)/*透明 灰 透明 透明 */
          margin-bottom: 12px

      .hide.editor-container
        right: -100%
    .editor-box.hide
      width: 0
  .small-item
    padding-top: 30%
    .service-content
      height: 100%
</style>
