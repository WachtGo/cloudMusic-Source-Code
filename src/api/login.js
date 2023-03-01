import { cloudMusic } from '@/api/request'

//获取登录二维码key
export function getqrKey(params) {
    return cloudMusic({
        method: 'get',
        url: '/login/qr/key',
        params: params,
    })
}
//通过二维码key返回生成二维码
export function getqrImg(params) {
    return cloudMusic({
        method: 'get',
        url: '/login/qr/create',
        params: params,
    })
}
//二维码状态
export function getqrStatus(params) {
    return cloudMusic({
        method: 'post',
        url: '/login/qr/check',
        data: params,
    })
}
/* //登录状态
res.data.profile为null时，表示此时未登录

 */
export function getloginStatus(params) {
    return cloudMusic({
        method: 'get',
        url: '/login/status',
        params: params,
    })
}
//账号信息,用来检测是否登录比另一个专门检测的api快
// export function getloginStatus(params) {//传入uid
//     return cloudMusic({
//         method: 'get',
//         url: '/user/account',
//         params: params,
//     })
// }
//退出登录
export function loginOut(params) {
    return cloudMusic({
        method: 'post',
        url: '/logout',
        data: params,
    })
}