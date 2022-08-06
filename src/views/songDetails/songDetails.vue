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
  background: rgba(221, 239, 243, 0.05);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto;
  padding: 0 20px 10px;
  width: 1120px;
  height: 730px;
  border-radius: 20px;
  background: rgba(221, 239, 243, 0.05);
  box-sizing: border-box;

  ul {
    height: 630px;
    border-radius: 0 0 10px 10px;
    background: rgba(221, 239, 243, 0.05);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .playListDetailes {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      padding: 10px;
      width: 98%;
      height: 200px;
      // border: 1px solid rgb(97, 226, 183);
      border-radius: 10px;
      // background: rgba(109, 109, 109, 0);
      box-sizing: border-box;

      .playListImg {
        display: inline-block;
        // width: 180px;
        // height: 180px;
        border-radius: 10px;

        img {
          width: 180px;
          height: 180px;
          border-radius: 10px;
          transition: 0.2s;

          &:hover {
            transform: scale(1.03);
          }
        }
      }

      .detailsRight {
        width: 820px;
        height: 180px;
        // background: rgb(181, 209, 152);

        .option {
          display: inline-block;

          margin-left: 50px;

          .flexBetween {
            .inline-block {
              display: inline-block;
              transition: 0.2s;

              &:hover {
                cursor: pointer;
                color: rgb(246, 255, 119);
              }
            }
          }
        }
        .songTns {
          margin: 10px 0 10px 0;
          width: 100%;
          max-height: 75px;
          font-size: 14px;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            display: none;
          }
        }
        .playListNickName {
          display: inline-block;
          margin-bottom: 10px;
          color: antiquewhite;
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
      background: rgba(221, 239, 243, 0.11);
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
}
.pagination {
  text-align: center;
  background: none !important;
}
/deep/ .el-pager {
  height: 30px !important;
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
/deep/ .el-pagination {
  height: 30px !important;
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
    <h3>歌曲详情</h3>
    <div class="descript"></div>
    <div>
      <ul>
        <div class="playListDetailes"
             v-if="songId">
          <div class="playListImg">
            <img :src="songDetails.al.picUrl"
                 alt="" />
          </div>
          <div class="detailsRight">
            <h3 style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ songDetails.name }}
            </h3>
            <div style="margin: 10px 0 10px 0; height: 30px; font-size: 14px">
              <span class="playListNickName">{{ songDetails.ar[0].name }}</span><span><br />
                时长&nbsp;&nbsp;-&nbsp;&nbsp;<span style="color: antiquewhite">{{ songDetails.dt }}</span></span>
              <div class="option">
                <div class="flexBetween">
                  <span class="inline-block"
                        style="margin-right: 5px"
                        @click="listenMusic(songDetails.id, songDetails.fee)"><i class="el-icon-headset iconhover"></i></span>
                  <!-- 添加到播放列表 -->
                  <span class="inline-block"
                        style="margin-right: 5px"
                        v-if="songDetails.fee == 0 || songDetails.fee == 8"
                        @click.stop="playMusic(songDetails.id, songDetails.fee)"><i class="el-icon-folder-add iconhover"></i>
                  </span>
                  <span class="inline-block"
                        style=""
                        v-if="Boolean(songDetails.mv)"
                        @click="playMV(songDetails.mv)"><i class="el-icon-video-camera iconhover"></i>&nbsp;
                  </span>

                  <span class="inline-block"
                        style="margin-right: 5px"
                        v-if="songDetails.fee == 0"
                        @click="getDownloadUrl(songDetails.id, songDetails.name)"><i class="el-icon-download iconhover"></i>&nbsp;</span><span v-if="songDetails.fee != 0">&nbsp;&nbsp;&nbsp; </span>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px; font-size: 14px">
              <span>{{ songDetails.alia[0] }}</span>
            </div>
            <br />
          </div>
        </div>

        <div style="padding: 0px 50px ;">
          <h3 style="margin: 5px 0 10px 0">
            <span v-if="commentCount">评论({{ commentCount }}条)</span>
          </h3>
          <div class="hoverBackColor"
               v-for="item in songComment"
               :key="item.id">
            <img :src="item.user.avatarUrl"
                 style="width: 50px; border-radius: 25px" />
            <span style="display: inline-block; margin-left: 10px; font-size: 15px">{{ item.user.nickname }}&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <span style="margin-left: 20px; width: 750px">
              {{ item.content }}
            </span>
            <div style="height: 30px">
              <span style="float: right; width: 130px">&nbsp;&nbsp;时间：{{ item.timeStr }}</span><span style="float: right">{{ item.likedCount }} 赞&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <div class="pagination">
            <el-pagination v-if="commentCount != 0"
                           @current-change="songhandleCurrentChange"
                           :current-page.sync="currentPage"
                           :page-size="7"
                           layout="prev, pager, next, jumper"
                           :total="commentCount"
                           :background="true">
            </el-pagination>
          </div>
        </div>
        <div v-show="false">
          <aplayer :autoplay="true"
                   :fixed="true"
                   :audio="listen"
                   :liric-type="1"></aplayer>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getDownloadUrl,
  playMusicUrl,
  getSongLyric,
  getSongDetails,
  getSongComment,
} from "@/api/api";
import { download } from "@/api/download";
export default {
  // props: ['songId'],
  data () {
    return {
      listen: [],
      //评论分页
      currentPage: 1,
      songUrlAdd: null,
      songId: "", //接收的歌曲id
      songDetails: {}, //歌曲详情
      songComment: [],
      commentCount: "",
      //搜索歌曲总数
      count: "",
      //音乐地址
      songurladd: null,
      //歌词
      songlrc: "",
    };
  },
  mounted () {
    ////缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌手id
    if (this.$route.params.songId) { localStorage.setItem('songId', this.$route.params.songId) }
    //判断是否使用缓存
    this.$route.params.songId ? this.songId = this.$route.params.songId : this.songId = localStorage.getItem('songId')
    this.getSongDetails();
    this.getSongComment();

  },
  methods: {
    // 分页
    songhandleCurrentChange (currentPage) {
      var that = this;
      that.currentPage = currentPage;
      that.getSongComment();
    },
    //获取歌曲详情
    getSongDetails () {
      var that = this;
      let params = {
        ids: that.songId,
      };
      getSongDetails(params).then((res) => {
        that.songDetails = res.data.songs[0];
        that.$set(that.songDetails, "timer", true);
        let min = parseInt(that.songDetails.dt / 1000 / 60);
        let sec = parseInt((that.songDetails.dt / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        that.songDetails.dt = min + ":" + sec;
        // console.log("歌曲详情", res.data.songs[0]);
      });
    },
    //获取歌曲评论
    getSongComment () {
      var that = this;
      let params = {
        id: that.songId,
        limit: 7,
        offset: (that.currentPage - 1) * 7,
      };
      getSongComment(params).then((res) => {
        this.songComment = res.data.comments;
        that.commentCount = res.data.total;
        // console.log("歌曲评论：", res.data);
      });
    },
    //获取播放音乐链接
    listenMusic (id, fee) {
      var that = this;
      if (that.songDetails.timer) {
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
            that.songDetails.timer = false;
            setTimeout(() => {
              that.songDetails.timer = true;
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
            // console.log("获取歌曲信息：", res.data.songs);
            if (that.songUrlAdd != null) {
              that.listen = [];
              that.listen.push({
                name: res.data.songs[0].name, //歌曲名
                artist: res.data.songs[0].ar[0].name, //作者
                url: that.songUrlAdd,
                cover: res.data.songs[0].al.picUrl,
                lrc: that.songlrc,
              });
              that.songUrlAdd = null;
              that.songlrc = "";
              that.songDetails.timer = false;
              setTimeout(() => {
                that.songDetails.timer = true;
              }, 3000);
            }
          });
      }
    },
    //添加到播放列表
    playMusic (id, fee) {
      //获取播放音乐链接
      var that = this;
      if (that.songDetails.timer) {
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
            that.songDetails.timer = false;
            setTimeout(() => {
              that.songDetails.timer = true;
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
              that.songDetails.timer = false;
              setTimeout(() => {
                that.songDetails.timer = true;
              }, 3000);
            }
          });
      }
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
    playMV (mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    //根据主题更换播放器颜色
    randomColor () {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    },
  },
};
</script>