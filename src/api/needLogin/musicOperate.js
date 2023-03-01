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