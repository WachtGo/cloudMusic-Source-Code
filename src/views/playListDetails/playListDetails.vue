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

  ul {
    height: 680px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.322);
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
      background: rgba(34, 173, 197, 0.055);
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

        .playListIntro {
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
          color: antiquewhite;
        }
      }
    }

    .music-list {
      position: relative;
      display: flex;
      margin: 5px auto;
      padding: 0 10px;
      width: 96%;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      color: rgba(255, 255, 255, 1);
      font-weight: bolder;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      border-radius: 5px;
      background: rgba(59, 165, 168, 0.048);
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
        position: absolute;
        padding-left: 150px;
        width: 240px;
        right: 10px;
        box-sizing: border-box;

        span {
          display: inline-block;
          width: 30px;
          &:hover {
            cursor: pointer;
          }
        }
      }

      &:hover {
        color: aquamarine;
        transform: scale(1.01);
        // background: rgba(146, 240, 243, 0.247);
      }
    }
  }
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
//   btn-quickprev el-icon-more
.iconhover {
  transition: 0.2s;
  &:hover {
    color: rgb(247, 243, 45);
  }
}
</style>

<template>
  <div class="list-wrap">
    <h3>歌单详情</h3>
    <div class="descript"></div>
    <div>
      <ul>
        <div class="playListDetailes">
          <div class="playListImg">
            <img :src="playListDetail.coverImgUrl"
                 alt="" />
          </div>
          <div class="detailsRight">
            <h3 style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ playListDetail.name }}
            </h3>
            <div style="margin: 10px 0 10px 0; height: 30px; font-size: 14px">
              <img :src="playListDetail.creator.avatarUrl"
                   alt=""
                   style="width: 30px; height: 30px; border-radius: 15px" />
              <span class="playListNickName">&nbsp;&nbsp;&nbsp;&nbsp;{{
                  playListDetail.creator.nickname
                }}&nbsp;&nbsp;</span><span v-if="playListDetail.creator.signature">&nbsp;&nbsp;-&nbsp;&nbsp;{{
                  playListDetail.creator.signature
                }}</span>
            </div>
            <div style="margin: 10px 0 10px 0; height: 18px; font-size: 14px">
              <span>标签:&nbsp;&nbsp;</span><span v-for="(tag, index) in playListDetail.tags"
                    :key="index">{{ tag }}&nbsp;</span>
            </div>
            <div class="playListIntro"
                 style="">
              <span style="display: inline-block; margin-left: 0px">
                {{ playListDetail.description }}
              </span>
            </div>
          </div>
        </div>

        <li class="music-list"
            v-for="(item, index) in musicList"
            :key="item.id">
          <span style="display: inline-block; width: 20px">{{ index + 1 }}.</span>
          <div @dblclick.self="goSongDetails(item.id)">
            <span class="music-list-span">{{ item.name }}</span>
            <span class="music-list-span">{{ item.ar[0].name }}</span>
            <span class="music-list-span">{{ item.dt }}</span>
          </div>
          <div class="option">
            <span @click="listenMusic(item.id, item.fee, index)"><i class="el-icon-headset iconhover"></i></span>
            <!-- 添加到播放列表 -->
            <span v-if="item.fee == 0 || item.fee == 8"
                  @click.stop="playMusic(item.id, item.fee, index)"><i class="el-icon-folder-add iconhover"></i>
            </span>
            <span v-if="Boolean(item.mv)"
                  @click="playMV(item.mv)"><i class="el-icon-video-camera iconhover"></i>
            </span>
            <!-- <span v-if="!Boolean(item.mv)">&nbsp;&nbsp;&nbsp; </span> -->
            <span v-if="item.fee == 0"
                  @click.stop="getDownloadUrl(item.id, item.name)"><i class="el-icon-download iconhover"></i></span><span v-if="item.fee != 0"> </span>
          </div>
        </li>
        <div style="padding: 0px 50px">
          <h3 style="margin: 5px 0 10px 0">评论({{ commentCount }}条)</h3>
          <div class="hoverBackColor"
               v-for="item in playListComment"
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

          <div style="text-align: center">
            <el-pagination v-if="commentCount != 0"
                           @current-change="playListHandleCurrentChange"
                           :current-page.sync="currentPage"
                           :page-size="7"
                           layout="prev, pager, next, jumper"
                           :total="commentCount"
                           :background="true">
            </el-pagination>
          </div>
        </div>
      </ul>
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
  playMusicUrl,
  getSongLyric,
  getSongDetails,
  getSongList,
  getPlayListComment,
} from "@/api/api";
import { download } from "@/api/download";
import { transMusicTime } from '@/api/commonApi.js'
export default {
  // props: ['songListId'],
  data () {
    return {
      //试听音乐
      listen: [],
      //歌单id
      songListId: '',
      //评论分页
      currentPage: 1,
      // 歌曲数组
      musicList: [],
      //下载音乐的地址
      DownloadSongUrl: "",
      //mv地址
      mvUrl: "",
      //搜索歌曲总数
      count: "",
      playListComment: [],
      commentCount: "",
      //音乐地址
      songUrlAdd: null,
      //歌词
      songlrc: "",
      //MV
      songMV: [],
      //歌单详情
      playListDetail: {},
    };
  },
  mounted () {
    //缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌单id
    if (this.$route.params.songListId) { localStorage.setItem('songListId', this.$route.params.songListId) }
    // 判断是否使用缓存
    this.$route.params.songListId ? this.songListId = this.$route.params.songListId : this.songListId = localStorage.getItem('songListId')
    this.getSongList();
    this.getPlayListComment();
  },
  methods: {
    //切换歌单评论
    playListHandleCurrentChange (currentPage) {
      var that = this;
      that.currentPage = currentPage;
      that.getPlayListComment();
    },
    //获取歌单评论
    getPlayListComment () {
      var that = this;
      let params = {
        id: that.songListId,
        limit: 7,
        offset: (that.currentPage - 1) * 7,
      };
      getPlayListComment(params).then((res) => {
        // console.log("歌单评论：", res.data);
        this.playListComment = res.data.comments;
        that.commentCount = res.data.total;
        // console.log("歌曲评论：", res.data);
      });
    },

    //获取歌曲详情,进入详情页面
    goSongDetails (ids) {
      this.$router.push({
        name: "songDetails",
        params: {
          songId: ids,
        },
      });
    },
    // 播放MV
    playMV (mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    listenMusic (id, fee, index) {
      //获取播放音乐链接
      var that = this;
      if (that.musicList[index].timer) {
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
            that.musicList[index].timer = false;
            setTimeout(() => {
              that.musicList[index].timer = true;
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
    //播放音乐
    playMusic (id, fee, index) {
      //获取播放音乐链接
      var that = this;
      // console.log(that.musicList[index]);
      if (that.musicList[index].timer) {
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
            that.musicList[index].timer = false;
            setTimeout(() => {
              that.musicList[index].timer = true;
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
              that.musicList[index].timer = false;
              setTimeout(() => {
                that.musicList[index].timer = true;
              }, 3000);
            }
          });
      }
    },

    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      var that = this;
      that.getSongList(currentPage);
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
    getSongList () {
      //传入歌单id获取歌曲id和歌单详情
      var that = this;
      let params = {
        id: that.songListId,
      };
      getSongList(params).then((res) => {
        // console.log("----------------:", res.data.privileges); //歌单歌曲
        // console.log("--歌单详情-------:", res.data.playlist); //歌单歌曲
        that.playListDetail = res.data.playlist;
        that.musicList = that.playListDetail.tracks;

        //给每个列表添加一个防抖
        for (let item of that.musicList) {
          that.$set(item, "timer", true);
        }
        transMusicTime(that.musicList, 'dt');
      });
    },

  },
};
</script>

