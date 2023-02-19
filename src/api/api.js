import request from '@/api/request'

//获取默认搜索关键字
export const getSearchDefault = () => request.get('/search/default')

//获取热搜列表
export const getHotSearch = () => request.get('/search/hot/detail')

// 获取搜索内容信息
// export const getMusicInfo = (params) => request.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);
export function getMusicInfo(params) {
    return request({
        url: '/cloudsearch',
        method: 'get',
        params: params,
    })
}

//歌曲id获取音乐连接
export function playMusicUrl(params) {
    return request({
        url: '/song/url',
        method: 'get',
        params: params,
    })
}

//歌曲id获取歌曲歌词
export function getSongLyric(params) {
    return request({
        url: '/lyric',
        method: 'get',
        params: params,
    })
}

//通过歌曲id获取歌曲详情
// export const getSongDetails = (params) => request.get(`/song/detail?ids=${params.ids}`);
export function getSongDetails(params) {
    return request({
        url: '/song/detail',
        method: 'get',
        params: params,
    })
}

//通过歌曲id获取歌曲评论
// export const getSongComment = (params) => request.get(`/comment/music?id=${params.id}&limit=${params.limit}&offset=${params.offset}`);
export function getSongComment(params) {
    return request({
        url: '/comment/music',
        method: 'get',
        params: params,
    })
}



// // 获取歌单
// 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

// limit: 取出歌单数量 , 默认为 50

// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export function getPlaylist(params) {
    return request({
        url: '/top/playlist',
        method: 'get',
        params: params,
    })
}

// 获取全部歌单分类
export function getAllPlayList(params) {
    return request({
        url: '/playlist/catlist',
        method: 'get',
        params: params,
    })
}

// 获取热门歌单分类
export function getHotPlayList(params) {
    return request({
        url: '/playlist/hot',
        method: 'get',
        params: params,
    })
}


// 获取推荐歌单
// export const getSuggestPlayList = (params) => request.get(`/personalized?limit=${params.limit}`)
export function getSuggestPlayList(params) {
    return request({
        url: '/personalized',
        method: 'get',
        params: params,
    })
}

//通过歌单id获取歌单详情
// export const getSongList = (params) => request.get(`/playlist/detail?id=${params.id}`);


export function getSongList(params) {
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params: params,
    })
}

export function getPlaylistDetail(params) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        params: params,
    })
}

//通过歌单id获取歌单评论
// export const getPlayListComment = (params) => request.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
export function getPlayListComment(params) {
    return request({
        url: '/comment/playlist',
        method: 'get',
        params: params,
    })
}

//MV播放地址
// export const getMVUrl = (params) => request.get(`mv/url?id=${params.id}`);
export function getMVUrl(params) {
    return request({
        url: 'mv/url',
        method: 'get',
        params: params,
    })
}

//获取最新MV
export function getNewMvList(params) {
    return request({
        url: '/mv/first',
        method: 'get',
        params: params,
    })
}

//获取推荐MV
export function getSuggestMvList(params) {
    return request({
        url: '/personalized/mv',
        method: 'get',
        params: params,
    })
}

//通过MV id获取MV点赞转发评论数数据
export function getMvDetailInfo(params) {
    return request({
        url: '/mv/detail/info',
        method: 'get',
        params: params,
    })
}

//通过MV id获取MV详情
export function getMvDetails(params) {
    return request({
        url: '/mv/detail',
        method: 'get',
        params: params,
    })
}

// 获取MV评论
export function getcommentMV(params) {
    return request({
        url: '/comment/mv',
        method: 'get',
        params: params,
    })
}

//获取推荐视频,需要登录/video/timeline/recommend?offset=10只能传入offset
// export function getSuggestVideoList(params){
//     return request({
//         url:'/video/timeline/recommend',
//         method:'get',
//         params:params,
//     })
// }

//通过视频id获取视频详情
export function getVideoDetails(params) {
    return request({
        url: '/video/detail',
        method: 'get',
        params: params,
    })
}
//获取视频播放地址
export function getVideoUrl(params) {
    return request({
        url: '/video/url',
        method: 'get',
        params: params,
    })
}

//获取视频评论
export function getVideoComment(params) {
    return request({
        url: '/comment/video',
        method: 'get',
        params: params,
    })
}


//获取歌手(传入分类参数)
export function getSingerlist(params) {
    return request({
        url: '/artist/list',
        method: 'get',
        params: params,
    })
}

//获取歌手描述
export function getSingerDesc(params) {
    return request({
        url: '/artists/desc',
        method: 'get',
        params: params,
    })
}
//获取歌手详情
export function getSingerDetail(params) {
    return request({
        url: '/artists/Detail',
        method: 'get',
        params: params,
    })
}
//获取歌手单曲列表
export function getSingerSongList(params) {
    return request({
        url: '/artist/songs',
        method: 'get',
        params: params,
    })
}
//获取歌手MV列表
export function getSingerMvList(params) {
    return request({
        url: '/artist/mv',
        method: 'get',
        params: params,
    })
}
//获取歌手专辑列表,方便传参限制
export function getSingerAlbum(params) {
    return request({
        url: '/artist/album',
        method: 'get',
        params: params,
    })
}
//获取歌手专辑列表
// export const getSingerAlbum = (params) => request.get(`/artist/album?id=id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//获取歌曲下载地址
// export const getDownloadUrl = (params) => request.post(`/song/download/url?id=${params.id}`)
// export const getDownloadUrl = (params) => request.post(`/song/download/url?id=${params.id}`)
export function getDownloadUrl(params) {
    return request({
        url: '/song/url',
        method: 'get',
        params: params,
    })
}

//获取专辑内容
// export const getAlbumContent = (params) => request.get(`/album?id=${params.id}`)
export function getAlbumContent(params) {
    return request({
        url: '/album',
        method: 'get',
        params: params,
    })
}
//获取专辑动态信息（评论，收藏等）
// export const getAlbumDynamicInfo = (params) => request.get(`/album/detail/dynamic?id=${params.id}`)
export function getAlbumDynamicInfo(params) {
    return request({
        url: '/album/detail/dynamic',
        method: 'get',
        params: params,
    })
}

