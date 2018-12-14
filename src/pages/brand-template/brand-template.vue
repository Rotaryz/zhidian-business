<template>
  <div class="brand-template">
    <div class="template-list" v-for="item in list">
      <div class="left">
        <p class="title">{{item.title}}</p>
        <p class="time">{{item.updated_at}}</p>
      </div>
      <div class="right" v-if="+branch === 1"  @click="showConfirm('in', item)">一键导入</div>
      <div class="right" v-else @click="showConfirm('update', item)">更新</div>
    </div>
    <div class="null" v-if="+branch === 0 && nothing">
      <p class="txt">你还没有保存模板信息</p>
      <div class="btn" @click="makeTemplate">一键生成模板</div>
    </div>
    <div class="nothing-box" v-if="nothing">
      <img src="./pic-empty_order@2x.png" class="nothing-img">
      <div class="nothing-txt">暂无数据</div>
    </div>
    <confirm ref="confirm" @confirm="confirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Confirm from 'components/confirm-msg/confirm-msg'
  import { Template, Mine } from 'api'
  export default {
    name: 'templet',
    data() {
      return {
        list: [],
        tempItem: {},
        status: '',
        nothing: false
      }
    },
    created() {
      this._getTemplateList()
      // 本地info信息如未更新，从新更新一次
      if (!this.$storage.get('info').store) {
        this._getUserInfo()
      }
    },
    methods: {
      _getUserInfo() {
        Mine.getUserInfo()
          .then(res => {
            this.$storage.set('info', res.data)
          })
      },
      _getTemplateList() { // 获取模板列表
        this.$loading.hide()
        Template.getTemplateList()
          .then(res => {
            this.$loading.hide()
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.list = res.data
            this.nothing = (+this.branch === 1 && res.data.length === 0)
          })
      },
      _leadingIn() { // 导入模板
        Template.leadingIn(this.tempItem.id)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.$toast.show('导入成功')
            this._getTemplateList()
          })
      },
      _makeTemplate(id) { // 一键生成模板/更新模板
        Template.makeTemplate({id})
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.$toast.show(id ? '更新模版成功' : '生成模板成功')
          })
      },
      makeTemplate() {
        this._makeTemplate()
      },
      showConfirm(type, item) {
        if (type === 'in') {
          this.status = 'in'
          this.tempItem = item
          this.$refs.confirm.show({msg: '确定一键导入？'})
        } else {
          this.status = 'update'
          this.tempItem = item
          this.$refs.confirm.show({msg: '确定更新模板？'})
        }
      },
      confirm() {
        if (this.status === 'in') {
          this._leadingIn()
        } else {
          this._makeTemplate(this.tempItem.id)
        }
      }
    },
    components: {
      Confirm
    },
    computed: {
      // 1分店，0总店
      branch() {
        return this.$storage.get('info').store && this.$storage.get('info').store.is_branch
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .brand-template
    fill-box()
    z-index: 20
    background: $color-F6F6F6
    .template-list
      margin: 15px 15px
      background: $color-white
      border-radius: 4px
      height: 80px
      box-sizing: border-box
      padding: 18px 15px
      display: flex
      align-items: center
      justify-content: space-between
      .title
        font-size: $font-size-16
        color: #4A4657
      .time
        color: #9B9B9B
        font-size: 14px
        margin-top: 13px
      .right
        width: 72px
        height: 28px
        font-size: $font-size-14
        line-height: 28px
        text-align: center
        color: $color-D32F2F
        border-1px($color-D32F2F, 30px)
        border-radius: 30px
    .null
      margin-top: 40px
      font-size: $font-size-16
      color: #4A4657
      text-align: center
      .btn
        width: 110px
        height: 28px
        font-size: $font-size-14
        line-height: 28px
        text-align: center
        color: $color-D32F2F
        border-1px($color-D32F2F, 30px)
        border-radius: 30px
        margin: 18px auto
    .nothing-box
      display: flex
      flex-direction: column
      align-items: center
      font-size: 0
      padding-top: 100px
      .nothing-img
        width: 100px
        height: 80px
        margin-bottom: 5px
      .nothing-txt
        font-size: $font-size-12
        color: $color-CCCCCC
        font-family: $font-family-regular
</style>
