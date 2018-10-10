import Upload from './api-upload'
// import Vod from './lib'

export let getSignature = function (callback) {
  Upload.getUploadSign().then((res) => {
    // let obj = {Authorization: res.data.sign}
    console.log(res)
    callback && callback(res)
  }).catch((err) => {
    console.error(err)
    // if (err) {
    //   throw _handleException(SIGN_ERROR)
    // }
  })
}

// console.log(Vod)
