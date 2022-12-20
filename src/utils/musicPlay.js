import { playMusicUrl, getSongLyric } from "@/api/api";

//添加歌曲到播放列表
export async function playMusic(id, fee, index, list, that, noCopyrightRcmd) {
  //获取播放音乐链接
  console.log(that[list][index], "歌曲信息----");
  let songlrc = ""; //歌词
  if (that[list][index].timer) {
    if (noCopyrightRcmd) {
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
    if (fee == 1) {
      that.$message({
        message: "VIP歌曲 - 只能试听30s",
        type: "warning",
      });
    }
    // 获取歌词
    // getSongLyric({
    //   id: id,
    // }).then((res) => {
    //   songlrc = res.data.lrc.lyric;
    // }),
    that.$store.commit("aplayer/addSONG", {
      name: that[list][index].name, //歌曲名
      artist: that[list][index].ar[0].name, //作者
      // url: songUrlAdd,
      url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
      cover: that[list][index].al.picUrl,
      //   lrc: songlrc,
      id: id,
    });
    that[list][index].timer = false;
    setTimeout(() => {
      that[list][index].timer = true;
    }, 3000);
  }
}

//播放试听音乐
export async function listenMusic(id, fee, index, list, that, noCopyrightRcmd) {
  console.log(that[list][index], "歌曲信息----");
  let songUrlAdd = null;
  let songlrc = "";
  if (that[list][index].timer) {
    if (noCopyrightRcmd) {
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
    if (fee == 1) {
      that.$message({
        message: "VIP歌曲 - 只能试听30s",
        type: "warning",
      });
      await playMusicUrl({
        id: id,
      }).then((res) => {
        // console.log("播放音乐链接", res.data.data[0].url);
        if (res.data.data[0].url) {
          songUrlAdd = res.data.data[0].url;
          if (songUrlAdd != null) {
            that.$store.commit("aplayer/addAUDITION", {
              name: that[list][index].name, //歌曲名
              artist: that[list][index].ar[0].name, //作者
              url: songUrlAdd,
              cover: that[list][index].al.picUrl,
              // lrc: songlrc,
              id: id,
              timer: true, //试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
            });
          }
        }
      });
      // 获取歌词
      //   getSongLyric({
      //     id: id,
      //   }).then((res) => {
      //     songlrc = res.data.lrc.lyric;
      //   });
    } else if (fee == 0 || fee == 8) {
      that.$store.commit("aplayer/addAUDITION", {
        name: that[list][index].name, //歌曲名
        artist: that[list][index].ar[0].name, //作者
        // url: songUrlAdd,
        url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
        cover: that[list][index].al.picUrl,
        // lrc: songlrc,
        id: id,
        timer: true, //试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
      });
    }
    that[list][index].timer = false;
    setTimeout(() => {
      that[list][index].timer = true;
    }, 3000);
  }
}
