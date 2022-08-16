// import request from '@/utils/request'

// //获取登录二维码key
// export function getqrKey(params){
// 	return request({
// 		method:'get',
// 		url:'/login/qr/key',
// 		params:params,
// 	})
// }
// //通过二维码key返回生成二维码
// export function getqrImg(params){
// 	return request({
// 		method:'get',
// 		url:'/login/qr/create',
// 		params:params,
// 	})
// }
// //二维码状态
// export function getqrStatus(params){
// 	return request({
// 		method:'post',
// 		url:'/login/qr/check',
// 		data:params,
// 	})
// }
// //登录状态
// export function getloginStatus(params){
// 	return request({
// 		method:'get',
// 		url:'/login/status',
// 		params:params,
// 	})
// }
// //退出登录
// export function loginOut(params){
// 	return request({
// 		method:'post',
// 		url:'/logout',
// 		data:params,
// 	})
// }