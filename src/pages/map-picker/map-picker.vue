<template>
  <div class="map-picker">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0
            src="https://apis.map.qq.com/tools/locpicker?policy=1&search=1&type=1&key=2N7BZ-WZK3Q-XUO5Y-GHVQ3-YDNDV-NSFER&referer=myapp">
    </iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      if (!window.messageEvent) {
        window.messageEvent = window.addEventListener('message', this._handle, false)
      }
    },
    beforeDestroy() {
      window.removeEventListener('message', this._handle)
      window.messageEvent = null
    },
    methods: {
      _handle(event) {
        event.preventDefault()
        let self = this
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        let loc = event.data
        if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          self.$router.back()
          self.$emit('refresh', loc)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .map-picker
    position fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 499
</style>
