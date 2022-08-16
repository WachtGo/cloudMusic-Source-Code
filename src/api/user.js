import request from '@/utils/request'

//获取用户详情
export function getuserDetail(params){//传入uid
	return request({
		method:'get',
		url:'/user/subcount',
		params:params,
	})
}