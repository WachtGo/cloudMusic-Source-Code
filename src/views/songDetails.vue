<template>
  <div class="list-wrap">
    <div class="pageName">歌曲详情</div>
    <div class="descript"></div>
    <div>
      <ul>
        <div id="like_detail" class="details">
          <div class="details-img">
            <img :src="songDetails.al.picUrl" alt="" />
          </div>
          <div class="detailsRight">
            <div style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ songDetails.name }}
              <div style="display: inline-block">
                <button
                  class="my-button"
                  @click="likeMusic(songDetails.id, true)"
                >
                  喜欢<i class="iFont el-icon-star-on iconhover"></i></button
                ><button
                  class="my-button"
                  @click="likeMusic(songDetails.id, false)"
                >
                  不喜欢了<i class="iFont el-icon-star-off iconhover"></i>
                </button>
              </div>
            </div>
            <div style="margin: 10px 0 10px 0; height: 30px; font-size: 14px">
              <span
                class="playListNickName"
                @click="goSingerDetail(songDetails.ar[0].id)"
                >{{ songDetails.ar[0].name }}</span
              ><span
                ><br />
                时长&nbsp;&nbsp;-&nbsp;&nbsp;<span
                  style="color: antiquewhite"
                  >{{ songDetails.dt }}</span
                ></span
              >
              <div class="option">
                <div class="flexBetween">
                  <!-- 试听 -->
                  <span
                    class="inline-block"
                    style="margin-right: 5px"
                    @click="listenMusic(songDetails)"
                    ><i class="el-icon-headset iconhover"></i
                  ></span>
                  <!-- 添加到播放列表 -->
                  <span
                    class="inline-block"
                    style="margin-right: 5px"
                    v-if="songDetails.fee === 0 || songDetails.fee === 8"
                    @click.stop="playMusic(songDetails)"
                    ><i class="el-icon-folder-add iconhover"></i>
                  </span>
                  <span
                    class="inline-block"
                    style=""
                    v-if="Boolean(songDetails.mv)"
                    @click="playMV(songDetails.mv)"
                    ><i class="el-icon-video-camera iconhover"></i>&nbsp;
                  </span>

                  <span
                    class="inline-block"
                    style="margin-right: 5px"
                    v-if="songDetails.fee === 0 || songDetails.fee === 8"
                    @click="getDownloadUrl(songDetails.id, songDetails.name)"
                    ><i class="el-icon-download iconhover"></i>&nbsp;</span
                  ><span v-if="songDetails.fee !== 0">&nbsp;&nbsp;&nbsp; </span>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px; font-size: 14px">
              <span>{{ songDetails.alia[0] }}</span>
            </div>
            <br />
          </div>
        </div>

        <div style="padding: 0px 50px">
          <div class="countLine">
            <span v-if="commentCount">评论({{ commentCount }}条)</span>
          </div>
          <div
            class="hoverBackColor"
            v-for="item in songComment"
            :key="item.id"
          >
            <img
              :src="item.user.avatarUrl"
              style="width: 50px; border-radius: 25px"
            />
            <span
              style="display: inline-block; margin-left: 10px; font-size: 15px"
              >{{ item.user.nickname }}&nbsp;&nbsp;:&nbsp;&nbsp;</span
            >
            <span style="margin-left: 20px; width: 750px">
              {{ item.content }}
            </span>
            <div style="height: 30px">
              <span style="float: right; width: 130px"
                >&nbsp;&nbsp;时间：{{ item.timeStr }}</span
              ><span style="float: right"
                >{{ item.likedCount }} 赞&nbsp;&nbsp;&nbsp;</span
              >
            </div>
          </div>

          <div class="pagination">
            <el-pagination
              v-if="commentCount !== 0"
              @current-change="songhandleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="7"
              layout="prev, pager, next, jumper"
              :total="commentCount"
              :background="true"
            >
            </el-pagination>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDownloadUrl, getSongDetails, getSongComment } from "@/api/api";
import { likeMusic } from "@/api/needLogin/musicOperate";
import { download, transMusicTime } from "@/utils/commonApi";
export default {
  // props: ['songId'],
  data() {
    return {
      //评论分页
      currentPage: 1,
      songUrlAdd: null,
      // songId: '', //接收的歌曲id
      songDetails: { al: { picUrl: "" }, ar: [{ name: "" }], alia: [], fee: 0 }, //歌曲详情
      songComment: [],
      commentCount: 0,
      //搜索歌曲总数
      count: 0,
    };
  },
  created() {
    //路由中含有歌曲详细信息时，直接使用
    if (this.$route.params.songDetails) {
      this.songDetails = this.$route.params.songDetails;
      localStorage.setItem(
        "songDetails",
        JSON.stringify(this.$route.params.songDetails)
      );
      this.getSongComment(this.songDetails.id);
    } else {
      //路由只设置了歌曲id时，便发起请求获取歌曲信息。反之若都没有，代表只是刷新了页面，直接使用缓存获取路由信息
      if (this.$route.params.id) {
        this.getSongDetails();
        this.getSongComment(this.$route.params.id);
      } else {
        this.songDetails = JSON.parse(localStorage.getItem("songDetails"));
        this.getSongComment(this.songDetails.id);
      }
    }
  },
  methods: {
    // 分页
    songhandleCurrentChange(currentPage) {
      var that = this;
      that.currentPage = currentPage;
      that.getSongComment();
    },
    // 获取歌曲详情
    getSongDetails() {
      var that = this;
      let params = {
        ids: this.$route.params.id,
      };
      getSongDetails(params).then(async (res) => {
        that.songDetails = await res.data.songs[0];
        that.$set(that.songDetails, "timer", true);
        transMusicTime(that.songDetails, "dt");
        localStorage.setItem("songDetails", JSON.stringify(that.songDetails));
        // console.log("歌曲详情", res.data.songs[0]);
      });
    },
    //获取歌曲评论
    getSongComment(id) {
      var that = this;
      let params = {
        id: id,
        limit: 7,
        offset: (that.currentPage - 1) * 7,
      };
      getSongComment(params).then((res) => {
        that.songComment = res.data.comments;
        that.commentCount = res.data.total;
        // console.log("歌曲评论：", res.data);
      });
    },
    //喜欢/取消喜欢音乐
    likeMusic(id, like) {
      const loading = this.$loading({
        target: "#like_detail",
        background: "rgba(255,255,255,0.1)",
      });
      likeMusic({ id: id, like: like })
        .then((res) => {
          this.$nextTick(() => {
            loading.close();
          });
          if (res.data.code === 200) {
            if (like) {
              this.$message.success("已添加入我的喜欢-可进入网易云音乐查看");
              return;
            }
            this.$message.success("已从我的喜欢列表删除");
          }
        })
        .catch((error) => {
          this.$nextTick(() => {
            loading.close();
          });
        });
    },
    //试听音乐
    listenMusic(songDetails) {
      // console.log('歌曲信息---：',songDetails)
      if (songDetails.timer) {
        //获取播放音乐链接
        if (songDetails.noCopyrightRcmd) {
          this.$message.error("这首歌暂无版权");
          songDetails.timer = false;
          setTimeout(() => {
            songDetails.timer = true;
          }, 3000);
          return;
        }
        if (songDetails.fee == 1) {
          this.$message({
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
        this.$store.commit("aplayer/addAUDITION", {
          name: songDetails.name, //歌曲名
          artist: songDetails.ar[0].name, //作者
          // url: songUrlAdd,
          url: `https://music.163.com/song/media/outer/url?id=${songDetails.id}.mp3`,
          cover: songDetails.al.picUrl,
          //   lrc: songlrc,
          id: songDetails.id,
        });
        songDetails.timer = false;
        setTimeout(() => {
          songDetails.timer = true;
        }, 3000);
      }
    },
    //添加歌曲到播放列表
    playMusic(songDetails) {
      if (songDetails.timer) {
        //获取播放音乐链接
        if (songDetails.noCopyrightRcmd) {
          this.$message.error("这首歌暂无版权");
          songDetails.timer = false;
          setTimeout(() => {
            songDetails.timer = true;
          }, 3000);
          return;
        }
        if (songDetails.fee == 1) {
          this.$message.warning("VIP歌曲 - 只能试听30s");
        }
        // 获取歌词
        // getSongLyric({
        //   id: id,
        // }).then((res) => {
        //   songlrc = res.data.lrc.lyric;
        // }),
        this.$store.commit("aplayer/addSONG", {
          name: songDetails.name, //歌曲名
          artist: songDetails.ar[0].name, //作者
          // url: songUrlAdd,
          url: `https://music.163.com/song/media/outer/url?id=${songDetails.id}.mp3`,
          cover: songDetails.al.picUrl,
          //   lrc: songlrc,
          id: songDetails.id,
        });
        songDetails.timer = false;
        setTimeout(() => {
          songDetails.timer = true;
        }, 3000);
      }
    },
    playMV(mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    //获取歌曲下载地址
    async getDownloadUrl(songId, songName) {
      var that = this;
      that.$message.warning("正在尝试下载");
      let params = {
        id: songId,
      };
      await getDownloadUrl(params).then(async (res) => {
        // console.log('歌曲下载地址：', res.data)
        // console.log("歌曲下载地址：", res.data.data.url);
        // download(res.data.data.url, songName)
        await download(res.data.data[0].url, songName);
        that.$message.success("可以开始下载了");
      });
    },
    //进入歌手页面
    goSingerDetail(id) {
      // let routerInfo = {
      //   name: "singerDetail",
      //   params: {
      //     id: id,
      //   },
      // };
      // this.$router.push({
      //   name: "emptyPage",
      //   params: routerInfo,
      // });
      this.$router.push({
        name: "singerDetail",
        params: { id: id },
      });
    },
    // 进入mv详情页面
    playMV(mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    //根据主题更换播放器颜色
    // randomColor() {
    //   return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    // },
  },
};
</script>

<style lang="less" scoped>
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
  margin: 10px auto 0;
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

    .details {
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

      .details-img {
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
          transition: 0.2s;

          &:hover {
            cursor: pointer;
            color: #d6a897;
          }
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
