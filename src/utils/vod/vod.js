import Upload from './api-upload'

/*eslint-disable*/

function getSignature(callback) {
  Upload.getUploadSign().then((res) => {
    callback && callback(res.data.signature)
  }).catch((err) => {
    console.error(err)
    throw new Error('获取签名失败')
  })
}

export function uploadFiles(file) {
  return new Promise((resolve,reject)=>{
    qcVideo.ugcUploader.start({
      videoFile: file, // 视频，类型为 File
      getSignature: getSignature, // 前文中所述的获取上传签名的函数
      error: reject,
      finish: resolve
      // error: function (result) { // 上传失败时的回调函数
      //   console.log('上传失败的原因：' + result.msg)
      // },
      // finish: function (result) { // 上传成功时的回调函数
      //   console.log('上传结果的fileId：' + result.fileId)
      //   console.log('上传结果的视频名称：' + result.videoName)
      //   console.log('上传结果的视频地址：' + result.videoUrl)
      // }
    })
  })

}
