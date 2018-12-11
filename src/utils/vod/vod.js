import Upload from './api-upload'

const time = 1 * 1000

/*eslint-disable*/

function getSignature(callback) {
  Upload.getUploadSign().then((res) => {
    callback && callback(res.data.signature)
  }).catch((err) => {
    console.error(err)
    throw new Error('获取签名失败')
  })
}

export function uploadFiles(file, callback) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type) {
      reject()
      return
    }
    if (!/mp4/.test(file.type.toLowerCase())) {
      let res = {error: 10, message: '请上传mp4格式的视频' }
      resolve(res)
      return
    }
    qcVideo.ugcUploader.start({
      videoFile: file, // 视频，类型为 File
      getSignature: getSignature, // 前文中所述的获取上传签名的函数
      error: reject,
      finish: (res => {
        setTimeout(() => {
          Upload.saveFile({file_id: res.fileId}).then(resolve)
        }, time)
      }),
      progress(result) {
        let curr = result.curr * 100
        curr = Math.min(99, Math.floor(curr))
        callback && callback(curr, result)
      }
    })
  })
}

export function cancelUpload(reuslt) {
  qcVideo.ugcUploader.cancel(reuslt)
}
