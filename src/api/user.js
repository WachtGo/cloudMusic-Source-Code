import { cloudMusic } from '@/api/request'

//获取用户详情
export function getuserDetail(params) {//传入uid
	return cloudMusic({
		method: 'get',
		url: '/user/detail',
		params: params,
	})
}
//账号信息,用来检测是否登录比另一个专门检测的api快
export function getAccount(params) {//
	return cloudMusic({
		method: 'get',
		url: '/user/account',
		params: params,
	})
}
