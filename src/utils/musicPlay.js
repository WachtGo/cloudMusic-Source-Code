import {
  playMusicUrl,
  getSongLyric,
  getSongDetails,
} from "@/api/api";

 //添加歌曲到播放列表
 export async function  playMusic (id, fee, index , list , that){
	//获取播放音乐链接
	// console.log(that,'----')

	let songUrlAdd = null	//音乐地址
	let songlrc = '' //歌词 
	if (that[list][index].timer) {
		if (fee == 1) {
			that.$message({
				message: "VIP歌曲 - 只能试听30s",
				type: "warning",
			});
		}
		playMusicUrl({
			id: id,
		}).then((res) => {
			// console.log("播放音乐链接", res.data.data[0].url);
			if (res.data.data[0].url) {
				songUrlAdd = res.data.data[0].url;
			} else {
				that.$message({
					message: "这首歌暂无版权",
					type: "error",
				});
				that[list][index].timer = false;
				setTimeout(() => {
					that[list][index].timer = true;
				}, 3000);
				return;
			}
		}),
			// 获取歌词
			getSongLyric({
				id: id,
			}).then((res) => {
				songlrc = res.data.lrc.lyric;
			}),
			// 获取歌曲信息
			getSongDetails({
				ids: id,
			}).then((res) => {
					that.$store.commit("addSONG", {
						name: res.data.songs[0].name, //歌曲名
						artist: res.data.songs[0].ar[0].name, //作者
						url: songUrlAdd,
						cover: res.data.songs[0].al.picUrl,
						lrc: that.songlrc,
						id: id,
					});
					that[list][index].timer = false;
					setTimeout(() => {
						that[list][index].timer = true;
					}, 3000);
			});
	}
}
	
//播放试听音乐
export function  listenMusic (id, fee, index, list, that) {
	let songUrlAdd = null
	let songlrc = ''
	if (that[list][index].timer) {
	 if (fee == 1) {
			that.$message({
				message: "VIP歌曲 - 只能试听30s",
				type: "warning",
			});
		}
		playMusicUrl({
			id: id,
		}).then((res) => {
			// console.log("播放音乐链接", res.data.data[0].url);
			if (res.data.data[0].url) {
				songUrlAdd = res.data.data[0].url;
			} else {
				that.$message({
					message: "这首歌暂无版权",
					type: "error",
				});
				that[list][index].timer = false;
				setTimeout(() => {
					that[list][index].timer = true;
				}, 3000);
				return;
			}
		}),
			// 获取歌词
			getSongLyric({
				id: id,
			}).then((res) => {
			 	songlrc = res.data.lrc.lyric;
			}),
			// 获取歌曲信息
			getSongDetails({
				ids: id,
			}).then((res) => {
				if (songUrlAdd != null) {
					that.$store.commit('addAUDITION',{
						name: res.data.songs[0].name, //歌曲名
						artist: res.data.songs[0].ar[0].name, //作者
						url: songUrlAdd,
						cover: res.data.songs[0].al.picUrl,
						lrc: songlrc,
						id: id,
						timer:true//试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
					});}
					that[list][index].timer = false;
					setTimeout(() => {
						that[list][index].timer = true;
					}, 3000);
			});
		}
}