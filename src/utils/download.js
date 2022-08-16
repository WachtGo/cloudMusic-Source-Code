
// import axios from 'axios'
// export const download = function (src, filename) {//由于跨域错误，无法使用此方法
//     if (!src) {
//         return
//     }
//     let fileName = filename || '' // 文件名
//     axios({
//         method: 'get',
//         url: src,
//         // url:'http://m801.music.126.net/20220813020238/8403f4526c560a895665412526b59f0b/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096449361/f27f/e401/b306/a332340ae5e8b65cab146de71e0aef56.mp3',
//         responseType: 'blob',
//         headers: { 'content-type': 'audio/mpeg' },
//     }).then((res) => {
//         let blobType = 'application/force-download' // 设置blob请求头
//         let blob = new Blob([res.data], { type: res.data.type }) // 创建blob 设置blob文件类型 data 设置为后端返回的文件(例如mp3,jpeg) type:这里设置后端返回的类型 为 mp3
//         let downa = document.createElement('a') // 创建A标签
//         let href = window.URL.createObjectURL(blob) // 创建下载的链接
//         downa.href = href // 下载地址
//         downa.download = fileName // 下载文件名
//         document.body.appendChild(downa)
//         downa.click() // 模拟点击A标签
//         document.body.removeChild(downa) // 下载完成移除元素
//         window.URL.revokeObjectURL(href) // 释放blob对象
//     }).catch(function (error) {
//         // console.log(error)
//     })
// }
