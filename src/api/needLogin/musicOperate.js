import { cloudMusic } from '@/api/request'

//收藏/取消歌单（1收藏2取消）
export function collectPlaylist(params) {
	return cloudMusic({
		url: '/playlist/subscribe',
		method: 'post',
		data: params,
	})
}
/*
 喜欢音乐必选参数 : id: 歌曲 id
可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
*/
export function likeMusic(params) {
	return cloudMusic({
		url: '/like',
		method: 'post',
		data: params,
	})
}

/* 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单

必选参数 : uid : 用户 id

可选参数 :

limit : 返回数量 , 默认为 30

offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

接口地址 : /user/playlist

调用例子 : /user/playlist?uid=32953014 */
export function getMyPlayList(params) {
	return cloudMusic({
		url: '/user/playlist',
		method: 'get',
		params: params,
	})
}

/* 
删除歌单
必选参数 : id : 歌单 id,可多个,用逗号隔开

接口地址 : /playlist/delete

调用例子 : /playlist/delete?id=2947311456 , /playlist/delete?id=5013464397,5013427772 */

export function deletePlayList(params) {
	return cloudMusic({
		url: '/playlist/delete',
		method: 'get',
		params: params,
	})
}
/* 
更新用户歌单
必选参数 :

id:歌单id

name:歌单名字

desc:歌单描述

tags:歌单tag ,多个用 `;` 隔开,只能用官方规定标签
接口地址 : /playlist/update

调用例子 : /playlist/update?id=24381616&name=新歌单&desc=描述&tags=欧美 */
export function updatePlayList(params) {
	return cloudMusic({
		url: '/playlist/update',
		method: 'get',
		params: params,
	})
}
