import req from './request'

//获取默认搜索关键字
export const getSearchDefault = () => req.get('/search/default')
//获取热搜列表
export const getHotSearch = () => req.get('/search/hot/detail')
// 获取搜索内容信息
export const getMusicInfo = (params) => req.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);


//歌曲id获取音乐连接
export const playMusicUrl = (params) => req.get(`song/url?id=${params.id}`);
//歌曲id获取歌曲歌词
export const getSongLyric = (params) => req.get(`lyric?id=${params.id}`);
//通过歌曲id获取歌曲详情
export const getSongDetails = (params) => req.get(`/song/detail?ids=${params.ids}`);
//通过歌曲id获取歌曲评论
export const getSongComment = (params) => req.get(`/comment/music?id=${params.id}&limit=${params.limit}&offset=${params.offset}`);

// 获取推荐歌单
export const getSuggestPlayList = (params) => req.get(`/personalized?limit=${params.limit}`)
//通过歌单id获取歌单详情
export const getSongList = (params) => req.get(`/playlist/detail?id=${params.id}`);

//通过歌单id获取歌单评论
export const getPlayListComment = (params) => req.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//MV播放地址
export const getMVUrl = (params) => req.get(`mv/url?id=${params.id}`);

//获取最新MV
export const getNewMvList = (params) => req.get(`/mv/first?limit=${params.limit}`)

//通过MV id获取MV点赞转发评论数数据
export const getMvDetailInfo = (params) => req.get(`/mv/detail/info?mvid=${params.id}`)

//通过MV id获取MV详情
export const getMvDetails = (params) => req.get(`/mv/detail/?mvid=${params.id}`)

// 获取MV评论
export const getcommentMV = (params) => req.get(`/comment/mv?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//通过视频id获取视频详情
export const getVideoDetails = (params) => req.get(`/video/detail?id=${params.id}`)
//获取视频播放地址
export const getVideoUrl = (params) => req.get(`/video/url?id=${params.id}`)
//获取视频评论
export const getVideoComment = (params) => req.get(`/comment/video?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)


//获取歌手描述
export const getSingerDesc = (params) => req.get(`/artists/desc?id=${params.id}`)
//获取歌手详情
export const getSingerDetail = (params) => req.get(`/artists/Detail?id=${params.id}`)
//获取歌手单曲列表
export const getSingerSongList = (params) => req.get(`/artists?id=${params.id}`)
//获取歌手MV列表
export const getSingerMvList = (params) => req.get(`/artist/mv?id=${params.id}`)
//获取歌手专辑列表,方便传参限制
export function getSingerAlbum(params) {
    return req({
        url: '/artist/album',
        method: 'get',
        params: params,
    })
}
//获取歌手专辑列表
// export const getSingerAlbum = (params) => req.get(`/artist/album?id=id=${params.id}&limit=${params.limit}&offset=${params.offset}`)

//获取歌曲下载地址
// export const getDownloadUrl = (params) => req.post(`/song/download/url?id=${params.id}`)
export const getDownloadUrl = (params) => req.post(`/song/download/url?id=${params.id}`)



//获取专辑内容
export const getAlbumContent = (params) => req.get(`/album?id=${params.id}`)
//获取专辑动态信息（评论，收藏等）
export const getAlbumDynamicInfo = (params) => req.get(`/album/detail/dynamic?id=${params.id}`)