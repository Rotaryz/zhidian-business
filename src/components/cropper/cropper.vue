<template>
  <div class="img-cut" v-show="visible">
    <vueCropper
      :viewMode="1"
      class="img-big"
      :guides="false"
      ref="cropper"
      :img="imageBig"
      :rotatable="true"
      :background="status"
      :cropBoxResizable="status"
      :aspectRatio="1"
      :autoCropArea="0.8"
      :dragMode="'move'"
      :checkCrossOrigin="false"
      :cropBoxMovable="false"
    >
    </vueCropper>
    <div class="img-btn">
      <div class="btn-item" @click="cropImage">确定</div>
      <div class="btn-item" @click="cropImageCosle">取消</div>
    </div>
    <!--<img class="loading" src="./loading.gif" alt="" width="30" height="30" v-show="loading">-->
  </div>
</template>

<script type="text/ecmascript-6">
  import VueCropper from 'vue-cropperjs'

  export default {
    components: {
      VueCropper
    },
    data() {
      return {
        imageBig: '',
        visible: false,
        status: false,
        cropImg: '',
        loading: false,
        presonImg: '',
        chooseType: '',
        robotImg: '',
        robotId: 0,
        note: '',
        inputValue: '',
        upRobotId: true,
        imgSc: true,
        imgAllSc: true,
        showPla: true,
        wechatStatus: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
