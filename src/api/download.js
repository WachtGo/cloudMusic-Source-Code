
import axios from 'axios'
export const download = function (src, filename) {
    if (!src) {
        return
    }
    let fileName = filename || '' // 文件名
    axios({
        method: 'get',
        url: src,
        responseType: 'blob',
        headers: { 'content-type': 'audio/mpeg' },
    }).then((res) => {
        let blobType = 'application/force-download' // 设置blob请求头
        let blob = new Blob([res.data], { type: res.data.type }) // 创建blob 设置blob文件类型 data 设置为后端返回的文件(例如mp3,jpeg) type:这里设置后端返回的类型 为 mp3
        let downa = document.createElement('a') // 创建A标签
        let href = window.URL.createObjectURL(blob) // 创建下载的链接
        downa.href = href // 下载地址
        downa.download = fileName // 下载文件名
        document.body.appendChild(downa)
        downa.click() // 模拟点击A标签
        document.body.removeChild(downa) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放blob对象
    }).catch(function (error) {
        // console.log(error)
    })
}


// import axios from 'axios'
// export const download = function (src, filename,id) {
//     if (!src) {
//         return
//     }
//     let fileName = filename || '' // 文件名
//     axios({
//         method: 'get',
//         url: `https://autumnfish.cn/song/download/url?id=${id}`,
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
//         console.log(error)
//     })
// }