<template>
  <div class="exchange-record">
    <section class="header">
      <div class="left">
        <div class="name">券名</div>
        <div class="id">券ID</div>
        <div class="user-id">用户ID</div>
      </div>
      <div class="right">核销时间</div>
    </section>
    <div class="scroll-container">
      <scorll>
        <ul class="content">
          <li class="item" v-for="(item,index) in dataArray" :key="index">
            <figure class="left">
              <div class="name">{{item.name}}</div>
              <div class="id">{{item.id}}</div>
              <div class="user-id">{{item.userId}}</div>
            </figure>
            <div class="right">
              <div class="time">{{item.time}}</div>
              <div class="now">{{item.now}}</div>
            </div>
          </li>
        </ul>
      </scorll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  const dataArray = [
    {
      name: '养发护发优,养发护发优养发护发优养发护发优,养发护发优养发护发优养发护发优养发护发优养发护发优养发护发优',
      id: 128392,
      userId: 3272378,
      time: '2017-01-01',
      now: '13:08'
    },
    {
      name: '养发护发优…',
      id: 128392,
      userId: 3272378,
      time: '2017-01-01',
      now: '13:08'
    },
    {
      name: '养发护发优…',
      id: 1,
      userId: 1,
      time: '2017-01-01',
      now: '13:08'
    }
  ]
  export default {
    components: {
      Scroll
    },
    data() {
      return {
        dataArray
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .exchange-record
    fill-box()
    z-index: 50
    background: $color-F6F6F6
    padding: 0 15px
    .header
      height: 50px
      layout(row, block, nowrap)
      background: #F6F6F6
      align-items: center
      flex: 1
      .left
        flex: 1
        layout(row, block, nowrap)
        .name
          width :28.26vw
          no-wrap()
        .id
          flex: 1
        .user-id
          flex: 1
      .right
        width: 75.38px
    .scroll-container
      position: absolute
      top: 50px
      bottom: 0
      left: 0
      right: 0
      .content
        .item
          padding: 0 15px
          height: 50px
          layout(row, block, nowrap)
          background: #fff
          align-items: center
          justify-content: space-between
          font-family: PingFangSC-Regular
          font-size: 14px
          color: #363547
          &:nth-child(2n)
            background: #F6F6F6
          .left
            flex: 1
            layout(row, block, nowrap)
            .name
              width :28.26vw
              no-wrap()
            .id
              flex: 1
            .user-id
              flex: 1
          .right
            width: 75.38px
            layout()
            align-items: flex-end
            .time
              font-size: 14px
              margin: 13px 0 3px
            .now
              font-size: 12px
</style>
