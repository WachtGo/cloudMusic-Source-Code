<style lang="less" scoped>
h3 {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.descript {
  display: flex;
  justify-content: space-between;
  color: aliceblue;
  font-weight: bolder;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  background: rgba(95, 158, 160, 0.322);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto;
  padding: 0 20px 10px;
  width: 1120px;
  border-radius: 20px;
  background: rgba(95, 158, 160, 0.322);
  box-sizing: border-box;

  .ul {
    height: 630px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.322);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .playListDetailes {
      display: flex;
      justify-content: space-between;
      margin: 0 auto 10px;
      padding: 10px;
      width: 96%;
      height: 170px;
      // border: 1px solid rgb(97, 226, 183);
      border-radius: 10px;
      background: rgba(221, 239, 243, 0.11);
      box-sizing: border-box;

      .playListImg {
        display: inline-block;
        // width: 180px;
        // height: 180px;
        border-radius: 10px;

        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          transition: 0.2s;

          &:hover {
            transform: scale(1.03);
          }
        }
      }

      .detailsRight {
        position: relative;
        width: 820px;
        height: 150px;
        // background: rgb(181, 209, 152);

        .option {
          position: absolute;
          bottom: 0;

          .flexBetween {
            .inline-block {
              display: inline-block;
              margin-right: 40px;
              transition: 0.2s;
              .musicSize {
                color: rgb(193, 243, 226);
                transition: 0.2s;
                &:hover {
                  color: rgb(109, 247, 201);
                }
              }

              &:hover {
                cursor: pointer;
                // color: rgb(246, 255, 119);
              }
            }
          }
        }
        .songTns {
          width: 100%;
          font-size: 14px;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            display: none;
          }
        }
        .aliasClass {
          position: absolute;
          top: 69px;
        }
        .playListNickName,
        .playListNickName2 {
        }
        .playListNickName {
          display: inline-block;
          margin-right: 20px;
        }

        .musicSize {
          color: rgb(170, 240, 240);
        }
      }
    }

    .music-list {
      display: flex;
      padding: 10px 10px;
      width: 1080px;
      overflow: hidden;
      color: rgba(255, 255, 255, 1);
      font-weight: bolder;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      // background: rgba(95, 158, 160, 0.322);
      transition: 0.2s;

      .music-list-span {
        display: inline-block;
        width: 270px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option {
        display: inline-block;
        width: 250px;
        text-align: center;

        span {
          display: inline-block;
          width: 30px;
          &:hover {
            cursor: pointer;
          }
        }
      }

      &:hover {
        background: rgba(76, 152, 155, 0.527);
      }
    }
  }
  #albumList {
    .liWrap {
      display: flex;
      justify-content: space-around;
      margin: 0 auto 10px;
      padding: 0 10px;
      width: 95%;
      height: 60px;
      border-radius: 12px;
      background-color: rgba(129, 235, 199, 0.068);
      box-sizing: border-box;
      transition: 0.2s;
      &:hover {
        transform: scale(1.01);
      }
      .liWrap-block1 {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        background-color: rgba(178, 244, 151, 1);
        transition: 0.2s;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        &:hover {
          transform: scale(1.05);
          cursor: pointer;
        }
      }
      .liWrap-block2 {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        width: 920px;
        height: 60px;
        font-size: 15px;
        border-radius: 10px;
        line-height: 40px;
        box-sizing: border-box;
        // background-color: rgba(226, 214, 156, 0.075);
        transition: 0.2s;

        span {
          &:hover {
            color: rgba(109, 255, 255, 0.753);
          }
        }
        .div1 {
          display: inline-block;
          width: 520px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          .albumName {
            display: inline-block;
            max-width: 500px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: rgb(196, 255, 250);
            transition: 0.2s;
            span {
              &:hover {
                color: rgba(97, 252, 252, 0.979);
              }
            }
            &:hover {
              color: rgba(97, 252, 252, 0.979);
            }
          }
          &:hover {
            color: rgba(97, 252, 252, 0.979);
          }
        }
        .divOther {
          display: inline-block;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // text-align: left;
          margin-right: 5px;

          span {
            color: rgb(196, 255, 250);
            transition: 0.2s;
            &:hover {
              color: rgba(97, 252, 252, 0.979);
            }
          }
        }
        &:hover {
          // color: rgba(97, 252, 252, 0.979);
          transform: scale(1.01);
          cursor: pointer;
        }
      }
    }
  }
  #singerMvs {
    margin: 0 auto;
    padding: 0px 10px 20px;
    width: 96%;
    height: 420px;
    border-radius: 10px;
    background: rgba(219, 255, 242, 0.151);
    box-sizing: border-box;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .videoPlaywrap {
      display: flex;
      margin: 0 auto;

      justify-content: space-evenly;
      flex-wrap: wrap; //根据宽度限制一行的盒子个数
      margin: 10px 0;
      width: 98%;
      background: transparent;
      // overflow-x: hidden;

      .videoPlayList {
        margin-bottom: 10px;
        width: 220px;
        height: 180px;
        border-radius: 10px;
        box-sizing: border-box;

        .videoImage {
          position: relative;
          margin-bottom: 10px;
          width: 220px;
          height: 132px;
          border-radius: 10px;
          overflow: hidden;
          transition: 0.2s;

          &:hover {
            transform: scale(1.05);
            cursor: pointer;
          }
          .videoImg {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .videoPlayTime {
            position: absolute;
            z-index: 99;
            right: 10px;
            background: transparent;
          }
        }

        p {
          font-size: 15px;
          padding: 0 10px;
          // width: 100%;
          transition: 0.2s;
          overflow: hidden; /*必须结合的属性,当内容溢出元素框时发生的事情*/
          text-overflow: ellipsis; /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
          display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
          -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
          -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
          span {
            &:hover {
              color: rgb(145, 245, 228);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.pagination {
  text-align: center;
  background: none !important;
}
/deep/ .el-pager {
  background: none !important;
}
/deep/ .number,
/deep/ .btn-prev,
/deep/ .btn-quicknext,
/deep/ .btn-next,
/deep/ .el-input__inner,
/deep/ .more {
  color: #f2fff7 !important;
  background: transparent !important;
}
/deep/ .number:hover,
/deep/ .btn-prev:hover,
/deep/ .btn-quicknext:hover,
/deep/ .btn-next:hover,
/deep/ .el-input__inner:hover,
/deep/ .more:hover {
  color: #f7a588 !important;
}
/deep/ .active {
  color: #f7a588 !important;
}
/deep/ .el-input__inner {
  border: none;
}
/deep/ .el-pagination__jump {
  color: #f7dd88 !important;
}
.iconhover {
  transition: 0.2s;
  &:hover {
    color: rgb(247, 243, 45);
  }
}
</style>

<template>
  <div class="list-wrap">
    <h3>歌手详情</h3>
    <div class="descript"></div>
    <div>
      <div class="ul">
        <div class="playListDetailes">
          <div class="playListImg">
            <img :src="singerDesc.img1v1Url"
                 alt="" />
          </div>
          <div class="detailsRight">
            <h3 style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ singerDesc.name }}
            </h3>
            <div style="font-size: 14px">
              <div class="aliasClass">
                <span class="playListNickName"
                      v-if="singerDesc.alias[0]">{{
                  singerDesc.alias[0]
                }}</span>
                <span class="playListNickName"
                      v-if="singerDesc.alias[1]">-</span><span class="playListNickName2">{{ singerDesc.alias[1] }}</span><span><br />
                  <span style="color: antiquewhite"></span></span>
              </div>

              <div class="option">
                <div class="flexBetween">
                  <span class="inline-block"
                        @click="getSingerSongList('songSwitch')">歌曲：<span class="musicSize">{{
                      singerDesc.musicSize
                    }}</span></span>
                  <span class="inline-block"
                        @click="getSingerAlbum('albumSwitch')">专辑：<span class="musicSize">{{
                      singerDesc.albumSize
                    }}</span>
                  </span>
                  <span class="inline-block"
                        @click="getSingerMvList('mvSwitch')">MV：<span class="musicSize">{{ singerDesc.mvSize }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="singerDetail"
             v-if="tagSwitch.detailSwitch">
          <h3 style="font-size: 15px">简介：</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ singerDesc.briefDesc }}
          </p>
        </div>
        <div id="singleSongs"
             v-if="tagSwitch.songSwitch">
          <h3>
            歌曲：{{ songList.length }}&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size：10px;">(受接口限制-这里最多获取50首歌手热门歌曲-建议直接搜)</span>
          </h3>
          <div class="SingsList"
               v-for="(item, index) in songList"
               :key="index">
            <span class="song-list"
                  style="width: 20px">{{ index + 1 }}.</span>
            <div @dblclick="goSongDetails(item.id)">
              <span class="song-list"
                    style="width: 350px">
                {{ item.name }}
              </span>
              <span class="song-list"
                    style="width: 250px; text-align: center">
                {{ item.ar[0].name }}
              </span>
              <span class="song-list"
                    style="width: 230px">
                {{ item.dt }}
              </span>
              <span class="song-list"
                    style="width: 150px"> </span>
            </div>
            <span class="song-list song-list-option">
              <span @click.stop="listenMusic(item.id, item.fee, index)"><i class="el-icon-headset iconhover"></i></span>
              <!-- 添加到播放列表 -->
              <span v-if="item.fee == 0 || item.fee == 8"
                    @click.stop="playMusic(item.id, item.fee, index)"><i class="el-icon-folder-add iconhover"></i>
              </span>
              <span v-if="Boolean(item.mv)"
                    @click.stop="playMV(item.mv, item.name)"><i class="el-icon-video-camera iconhover"></i></span>
              <span v-if="item.fee == 0"
                    @click.stop="getDownloadUrl(item.id, item.name)"><i class="el-icon-download iconhover"></i></span>
            </span>
          </div>
        </div>
        <div id="albumList"
             v-if="tagSwitch.albumSwitch">
          <li class="liWrap"
              v-for="(item, index) in albumList"
              :key="index"
              @click.stop="goAlbumDetail(item.id)">
            <div class="liWrap-block1">
              <img :src="item.blurPicUrl"
                   alt="" />
            </div>
            <div class="liWrap-block2">
              <div class="div1">
                <span class="albumName">{{ item.name }}
                  <span v-if="item.alias[0]"
                        class="albumName2">{{
                    item.alias[0]
                  }}</span></span>
              </div>
              <div>
                <div class="divOther">
                  <!-- 作者：<span>{{ item.artist.name }}</span> -->
                </div>
                <span class="inline-block"
                      style="display: inline-block; width: 50px"></span>
                <div class="divOther"
                     style="width: 100px">
                  歌曲：<span>{{ item.size }}</span>
                </div>
              </div>
            </div>
          </li>
        </div>
        <div id="singerMvs"
             v-if="tagSwitch.mvSwitch">
          <h3 style="margin: 0 auto">
            MV：{{ mvList.length }}&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size：10px;">(受接口限制-这里最多获取10个-建议直接搜)</span>
          </h3>

          <ul class="videoPlaywrap">
            <li class="videoPlayList"
                v-for="(item, index) in mvList"
                :key="index">
              <div class="videoImage">
                <img class="videoImg"
                     style="
                    position: absolute;
                    width: 240px;
                    height: 155px;
                    border-radius: 10px;
                  "
                     :src="item.imgurl16v9"
                     alt=""
                     title=""
                     @click="goMv(item.id)" />
                <span class="videoPlayTime"><i class="el-icon-video-play"
                     style="margin-right: 1px"></i>{{ item.playCount }}</span>
                <span class="videoPlayTime"
                      style="bottom: 0">{{
                  item.duration
                }}</span>
              </div>

              <p class="List-title"
                 style="font-size: 10px">
                <span style="
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "><span v-if="!item.type"
                        style="color: red">MV&nbsp;</span>{{ item.name }}</span><br />
                <span style="color: rgb(199, 199, 199)"><span>by&nbsp;</span>
                  <span>{{ item.artistName }}</span></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="false">
      <aplayer :autoplay="true"
               :fixed="true"
               :audio="listen"
               :liric-type="1"></aplayer>
    </div>
  </div>
</template>

<script>
import {
  getDownloadUrl,
  getSingerDesc,
  getSingerSongList,
  getSingerMvList,
  playMusicUrl,
  getSongLyric,
  getSongDetails,
  getSingerAlbum,
} from "@/api/api";
import { download } from "@/api/download";
export default {
  data () {
    return {
      //试听音乐
      listen: [],
      //歌手信息
      singerDesc: {},
      songList: [],
      albumList: [],
      mvList: [],
      tagSwitch: {
        detailSwitch: true,
        songSwitch: false,
        albumSwitch: false,
        mvSwitch: false,
      },
    };
  },
  created () {
    this.getSingerDesc();
  },
  methods: {
    //显示歌手单曲、专辑、mv列表开关
    switchChange (tag) {
      var that = this;
      for (let key in that.tagSwitch) {
        if (key != tag) {
          that.tagSwitch[key] = false;
        }
      }
      that.tagSwitch[tag] = true;
    },

    //获取歌手单曲列表(只有热门50首)
    getSingerSongList (tag) {
      var that = this;
      that.detailShow = false;
      let params = {
        id: that.$route.query.id,
      };
      getSingerSongList(params).then((res) => {
        // console.log("歌手单曲列表：", res.data.hotSongs);
        that.songList = res.data.hotSongs;
        //给每首曲子添加防抖
        for (let item of that.songList) {
          that.$set(item, "timer", true);
        }
        //转换时间
        let dt = "dt";
        that.transMusicTime(that.songList, dt);
      });
      that.switchChange(tag);
    },
    //获取歌手专辑列表
    getSingerAlbum (tag) {
      var that = this;
      that.detailShow = false;
      let params = {
        id: that.$route.query.id,
        limit: 999,
      };
      getSingerAlbum(params).then((res) => {
        // console.log("歌手专辑列表", res.data.hotAlbums);
        that.albumList = res.data.hotAlbums;
      });

      that.switchChange(tag);
    },
    //获取歌手mv
    getSingerMvList (tag) {
      var that = this;
      let params = {
        id: that.$route.query.id,
      };
      getSingerMvList(params).then((res) => {
        // console.log("获取到的歌手MV：", res.data.mvs);
        that.mvList = res.data.mvs;
        let dt = "duration"; //将时长字段赋值，方便传参
        that.transMusicTime(that.mvList, dt);
        for (let i = 0; i < that.mvList.length; i++) {
          if (
            String(that.mvList[i].playCount).length > 5 &&
            String(that.mvList[i].playCount).length < 9
          ) {
            that.mvList[i].playCount =
              String(that.mvList[i].playCount).substr(
                0,
                String(that.mvList[i].playCount).length - 4
              ) + "万";
          } else if (String(that.mvList[i].playCount).length == 5) {
            that.mvList[i].playCount =
              String(that.mvList[i].playCount).substr(0, 1) +
              "." +
              String(that.mvList[i].playCount).substr(1, 2) +
              "万";
          } else if (String(that.mvList[i].playCount).length == 9) {
            that.mvList[i].playCount =
              String(that.mvList[i].playCount).substr(0, 1) +
              "." +
              String(that.mvList[i].playCount).substr(1, 2) +
              "亿";
          } else if (String(that.mvList[i].playCount).length > 9) {
            that.mvList[i].playCount =
              String(that.mvList[i].playCount).substr(
                0,
                String(that.mvList[i].playCount).length - 8
              ) + "亿";
          }
        }
      });
      that.switchChange(tag);
    },
    //获取歌手描述
    getSingerDesc () {
      var that = this;
      let params = {
        id: that.$route.query.id,
      };
      getSingerDesc(params).then((res) => {
        // console.log("歌手描述", res.data);
        that.singerDesc = res.data.artist;
      });
    },
    //将时长转化成分秒
    transMusicTime (arr, dt) {
      for (let i = 0; i < arr.length; i++) {
        let min = parseInt(arr[i][dt] / 1000 / 60);
        let sec = parseInt((arr[i][dt] / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        arr[i][dt] = min + ":" + sec;
      }
    },
    listenMusic (id, fee, index) {
      //获取播放音乐链接
      var that = this;
      if (that.songList[index].timer) {
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
            that.songUrlAdd = res.data.data[0].url;
          } else {
            that.$message({
              message: "不好意思这首歌暂无版权",
              type: "error",
            });
            that.songList[index].timer = false;
            setTimeout(() => {
              that.songList[index].timer = true;
            }, 3000);
            return;
          }
        }),
          // 获取歌词
          getSongLyric({
            id: id,
          }).then((res) => {
            that.songlrc = res.data.lrc.lyric;
          }),
          // 获取歌曲信息
          getSongDetails({
            ids: id,
          }).then((res) => {
            if (that.songUrlAdd != null) {
              that.listen = [];
              that.listen.push({
                name: res.data.songs[0].name, //歌曲名
                artist: res.data.songs[0].ar[0].name, //作者
                url: that.songUrlAdd,
                cover: res.data.songs[0].al.picUrl,
                lrc: that.songlrc,
              });
              // console.log(that.listen);
              that.songUrlAdd = null;
              that.songlrc = "";
            }
          });
      }
    },
    //将歌曲添加到播放列表或者播放
    playMusic (id, fee, index) {
      //获取播放音乐链接
      var that = this;
      if (that.songList[index].timer) {
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
            that.songUrlAdd = res.data.data[0].url;
          } else {
            that.$message({
              message: "不好意思这首歌暂无版权",
              type: "error",
            });
            that.songList[index].timer = false;
            setTimeout(() => {
              that.songList[index].timer = true;
            }, 3000);
            return;
          }
        }),
          // 获取歌词
          getSongLyric({
            id: id,
          }).then((res) => {
            that.songlrc = res.data.lrc.lyric;
          }),
          // 获取歌曲信息
          getSongDetails({
            ids: id,
          }).then((res) => {
            // console.log("获取歌曲信息，添加到播放器：", res.data.songs);
            if (that.songUrlAdd != null) {
              that.$store.commit("addSONG", {
                name: res.data.songs[0].name, //歌曲名
                artist: res.data.songs[0].ar[0].name, //作者
                url: that.songUrlAdd,
                cover: res.data.songs[0].al.picUrl,
                lrc: that.songlrc,
                // theme: that.randomColor(),
              });
              // console.log(
              //   that.$store.state.audio,
              //   "添加歌曲后的歌曲播放列表-----"
              // );
              that.songUrlAdd = null;
              that.songlrc = "";
              that.songList[index].timer = false;
              setTimeout(() => {
                that.songList[index].timer = true;
              }, 3000);
            }
          });
      }
    },
    //跳转到歌曲详情
    goSongDetails (ids) {
      this.$router.push({
        name: "songDetails",
        query: {
          songId: ids,
        },
      });
    },
    //跳转到专辑详情
    goAlbumDetail (albumId) {
      this.$router.push({
        name: "albumDetail",
        query: {
          id: albumId,
        },
      });
    },
    //跳转到播放MV页面
    playMV (mvId, mvName) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        query: { mvId: mvId, mvName: mvName },
      });
    },
    goMv (mvId) {
      this.$router.push({
        name: "mvPlay",
        query: {
          mvId: mvId,
        },
      });
    },
    //获取歌曲下载地址
    getDownloadUrl (songId, songName) {
      var that = this;
      let params = {
        id: songId,
      };
      getDownloadUrl(params).then((res) => {
        // console.log("歌曲下载地址：", res.data.data.url);
        download(res.data.data.url, songName);
        that.$message({
          type: "success",
          message: "开始下载了",
        });
      });
    },
    //根据主题更换播放器颜色
    randomColor () {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    },
  },
};
</script>