import request from '@/api/request'

//收藏/取消歌单（1收藏2取消）
export function collectPlaylist(params) {
	return request({
		url: '/playlist/subscribe',
		method: 'post',
		data: params,
	})
}