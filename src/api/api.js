import request from './request'

//获取默认搜索关键字
export const getSearchDefault = () => request.get('/search/default')
//获取热搜列表
export const getHotSearch = () => request.get('/search/hot/detail')
// 获取搜索内容信息
export const getMusicInfo = (params) => request.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);


//歌曲id获取音乐连接
export const playMusicUrl = (params) => request.get(`song/url?id=${params.id}`);
//歌曲id获取歌曲歌词
export const getSongLyric = (params) => request.get(`lyric?id=${params.id}`);
//通过歌曲id获取歌曲详情
export const getSongDetails = (params) => request.get(`/song/detail?ids=${params.ids}`);
//通过歌曲id获取歌曲评论
export const getSongComment = (params) => request.get(`/comment/music?id=${params.id}&limit=${params.limit}&offset=${params.offset}`);

// 获取推荐歌单
export const getSuggestPlayList = (params) => request.get(`/personalized?limit=${params.limit}`)
//通过歌单id获取歌单详情
export const getSongList = (params) => request.get(`/playlist/detail?id=${params.id}`);
//通过歌单id获取歌单评论
export const getPlayListComment = (params) => request.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//MV播放地址
export const getMVUrl = (params) => request.get(`mv/url?id=${params.id}`);
//获取最新MV
export const getNewMvList = (params) => request.get(`/mv/first?limit=${params.limit}`)
//通过MV id获取MV点赞转发评论数数据
export const getMvDetailInfo = (params) => request.get(`/mv/detail/info?mvid=${params.id}`)
//通过MV id获取MV详情
export const getMvDetails = (params) => request.get(`/mv/detail/?mvid=${params.id}`)
// 获取MV评论
export const getcommentMV = (params) => request.get(`/comment/mv?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//通过视频id获取视频详情
export const getVideoDetails = (params) => request.get(`/video/detail?id=${params.id}`)
//获取视频播放地址
export const getVideoUrl = (params) => request.get(`/video/url?id=${params.id}`)
//获取视频评论
export const getVideoComment = (params) => request.get(`/comment/video?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)


//获取歌手描述
export const getSingerDesc = (params) => request.get(`/artists/desc?id=${params.id}`)
//获取歌手详情
export const getSingerDetail = (params) => request.get(`/artists/Detail?id=${params.id}`)
//获取歌手单曲列表
export const getSingerSongList = (params) => request.get(`/artists?id=${params.id}`)
//获取歌手MV列表
export const getSingerMvList = (params) => request.get(`/artist/mv?id=${params.id}`)
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
export const getDownloadUrl = (params) => request.post(`/song/download/url?id=${params.id}`)



//获取专辑内容
export const getAlbumContent = (params) => request.get(`/album?id=${params.id}`)
//获取专辑动态信息（评论，收藏等）
export const getAlbumDynamicInfo = (params) => request.get(`/album/detail/dynamic?id=${params.id}`)