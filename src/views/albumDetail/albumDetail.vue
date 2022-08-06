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
        .artistPic {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 15px;
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
    <h3>专辑详情</h3>
    <div class="descript"></div>
    <div>
      <div class="ul">
        <div class="playListDetailes">
          <div class="playListImg">
            <img :src="albumDesc.blurPicUrl"
                 alt="" />
          </div>
          <div class="detailsRight">
            <h3 style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ albumDesc.name }}
            </h3>
            <div style="font-size: 14px">
              <div class="aliasClass">
                <img class="artistPic"
                     :src="albumDesc.artist.img1v1Url"
                     alt="" />-
                <span class="playListNickName">{{
                  albumDesc.artist.name
                }}</span>
              </div>

              <!-- <div class="option">
                <div class="flexBetween">
                  <span
                    class="inline-block"
                    @click="getSingerSongList('songSwitch')"
                    >收藏：<span class="musicSize">{{
                      albumDesc.musicSize
                    }}</span></span
                  >
                  <span class="inline-block"
                    >专辑：<span class="musicSize">{{
                      albumDesc.albumSize
                    }}</span>
                  </span>
                  <span
                    class="inline-block"
                    @click="getSingerMvList('mvSwitch')"
                    >MV：<span class="musicSize">{{ albumDesc.mvSize }}</span>
                  </span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <!-- <div class="singerDetail" v-if="tagSwitch.detailSwitch">
          <h3 style="font-size: 15px">简介：</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ albumDesc.briefDesc }}
          </p>
        </div> -->
        <div id="singleSongs">
          <h3>专辑歌曲：{{ albumSongs.length }}首</h3>
          <div class="SingsList"
               v-for="(item, index) in albumSongs"
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
                    style="width: 150px">
              </span>
            </div>
            <span class="song-list song-list-option">
              <span @click.stop="listenMusic(item.id, item.fee, index)"><i class="el-icon-headset iconhover"></i></span>
              <!-- 添加到播放列表 -->
              <span v-if="item.fee == 0 || item.fee == 8"
                    @click.stop="playMusic(item.id, item.fee, index)"><i class="el-icon-folder-add iconhover"></i>
              </span>
              <span v-if="Boolean(item.mv)"
                    @click.stop="playMV(item.mv)"><i class="el-icon-video-camera iconhover"></i>
              </span>
              <span v-if="item.fee == 0"
                    @click.stop="getDownloadUrl(item.id, item.name)"><i class="el-icon-download iconhover"></i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="false">
      <aplayer :autoplay="true"
               :fixed="true"
               :audio="listen"
               :liric-type="1">
      </aplayer>
    </div>
  </div>
</template>

<script>
import {
  getAlbumContent,
  getDownloadUrl,
  playMusicUrl,
  getSongLyric,
  getSongDetails,
} from '@/api/api';
import { download } from '@/api/download';
import { transMusicTime } from '@/api/commonApi.js'

export default {
  // props: ['albumId'],
  data () {
    return {
      listen: [],
      albumId: '',
      albumSongs: [],
      albumDesc: {},
    };
  },
  mounted () {
    //缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌单id
    if (this.$route.params.albumId) { localStorage.setItem('albumId', this.$route.params.albumId) }
    // 判断是否使用缓存
    this.$route.params.albumId ? this.albumId = this.$route.params.albumId : this.albumId = localStorage.getItem('albumId')
    this.getAlbumContent();
  },
  methods: {

    getAlbumContent () {
      var that = this;
      let params = {
        id: that.albumId,
      };
      getAlbumContent(params).then((res) => {
        // console.log("专辑信息---：", res.data.album);
        // console.log("专辑歌曲---：", res.data.songs);
        that.albumDesc = res.data.album;
        that.albumSongs = res.data.songs;
        //给每个列表添加一个防抖
        for (let item of that.albumSongs) {
          that.$set(item, "timer", true);
        }
        let dt = "dt";
        transMusicTime(that.albumSongs, dt);
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
    listenMusic (id, fee, index) {
      //获取播放音乐链接
      var that = this;
      if (that.albumSongs[index].timer) {
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
            that.albumSongs[index].timer = false;
            setTimeout(() => {
              that.albumSongs[index].timer = true;
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
      if (that.albumSongs[index].timer) {
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
              message: "抱歉，这首歌暂无版权",
              type: "error",
            });
            that.albumSongs[index].timer = false;
            setTimeout(() => {
              that.albumSongs[index].timer = true;
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
              that.albumSongs[index].timer = false;
              setTimeout(() => {
                that.albumSongs[index].timer = true;
              }, 3000);
            }
          });
      }
    },
    //跳转到歌曲详情
    goSongDetails (ids) {
      this.$router.push({
        name: "songDetails",
        params: {
          songId: ids,
        },
      });
    },
    //跳转到播放MV页面
    playMV (mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    goMv (mvId) {
      this.$router.push({
        name: "mvPlay",
        params: {
          mvId: mvId,
        },
      });
    },
    //根据主题更换播放器颜色
    randomColor () {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    },
  },
};
</script>