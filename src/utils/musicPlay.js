import { playMusicUrl, getSongLyric } from "@/api/api";

//添加歌曲到播放列表
export async function playMusic(songDetals, that) {
  //获取播放音乐链接
  // console.log(songDetals, "歌曲信息----");
  let songlrc = ""; //歌词
  if (songDetals.timer) {
    if (songDetals.noCopyrightRcmd) {
      that.$message({
        message: "这首歌暂无版权",
        type: "error",
      });
      songDetals.timer = false;
      setTimeout(() => {
        songDetals.timer = true;
      }, 3000);
      return;
    }
    if (songDetals.fee == 1) {
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
      name: songDetals.name, //歌曲名
      artist: songDetals.ar[0].name, //作者
      // url: songUrlAdd,
      url: `https://music.163.com/song/media/outer/url?id=${songDetals.id}.mp3`,
      cover: songDetals.al.picUrl,
      //   lrc: songlrc,
      id: songDetals.id,
    });
    songDetals.timer = false;
    setTimeout(() => {
      songDetals.timer = true;
    }, 3000);
  }
}

//播放试听音乐
export async function listenMusic(songDetals, that) {
  // console.log(songDetals, "歌曲信息----");
  let songUrlAdd = null;
  let songlrc = "";
  if (songDetals.timer) {
    if (songDetals.noCopyrightRcmd) {
      that.$message({
        message: "这首歌暂无版权",
        type: "error",
      });
      songDetals.timer = false;
      setTimeout(() => {
        songDetals.timer = true;
      }, 3000);
      return;
    }
    if (songDetals.fee == 1) {
      that.$message({
        message: "VIP歌曲 - 只能试听30s",
        type: "warning",
      });
      await playMusicUrl({
        id: songDetals.id,
      }).then((res) => {
        // console.log("播放音乐链接", res.data.data[0].url);
        if (res.data.data[0].url) {
          songUrlAdd = res.data.data[0].url;
          if (songUrlAdd != null) {
            that.$store.commit("aplayer/addAUDITION", {
              name: songDetals.name, //歌曲名
              artist: songDetals.ar[0].name, //作者
              url: songUrlAdd,
              cover: songDetals.al.picUrl,
              // lrc: songlrc,
              id: songDetals.id,
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
    } else if (songDetals.fee == 0 || songDetals.fee == 8) {
      that.$store.commit("aplayer/addAUDITION", {
        name: songDetals.name, //歌曲名
        artist: songDetals.ar[0].name, //作者
        // url: songUrlAdd,
        url: `https://music.163.com/song/media/outer/url?id=${songDetals.id}.mp3`,
        cover: songDetals.al.picUrl,
        // lrc: songlrc,
        id: songDetals.id,
        timer: true, //试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
      });
    }
    songDetals.timer = false;
    setTimeout(() => {
      songDetals.timer = true;
    }, 3000);
  }
}
