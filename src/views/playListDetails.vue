<template>
  <div class="list-wrap">
    <div class="pageName">歌单详情</div>
    <div class="descript"></div>
    <div>
      <div class="wrap2">
        <!-- 歌单信息 -->
        <div class="details" id="list_detail">
          <div class="details-img">
            <img v-if="playListDetail.coverImgUrl === ''" src="../static/img/playlistpic.png" alt=" " />
            <img v-else :src="playListDetail.coverImgUrl" alt=" " />
          </div>
          <div class="detailsRight">
            
            <h3 v-if="playListDetail.name === ''" style="margin-left: 0px; text-align: left; font-size: 20px">
              慢慢的加载，就像音乐舒缓地流淌。
            </h3>
            <h3 v-else style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ playListDetail.name }}
            </h3>

            <div class="playListCreator">
              <img v-if="playListDetail.creator.avatarUrl === ''" src="../static/img/musicpic2.png" alt=" " />
              <img v-else :src="playListDetail.creator.avatarUrl" alt=" " />
              <span class="playListNickName"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{
                  playListDetail.creator.nickname
                }}&nbsp;&nbsp;</span
              ><span v-if="playListDetail.creator.signature"
                >&nbsp;&nbsp;-&nbsp;&nbsp;{{
                  playListDetail.creator.signature
                }}</span
              >
            </div>
            <div class="playListTag" v-if="playListDetail.tags.length !== 0">
              <span>标签:&nbsp;&nbsp;</span
              ><span v-for="(tag, index) in playListDetail.tags" :key="index"
                >{{ tag }}&nbsp;</span
              >
            </div>
            <p class="playListIntro">
              {{ playListDetail.description }}
            </p>

            <!-- <i class="iFont el-icon-star-off" @click="collectPlaylist"></i> -->
          </div>
        </div>
        <!-- 歌单歌曲列表 -->
        <div class="countLine">
          歌曲：
          <!-- <span v-if="musicList.length === 0"
            ><i class="el-icon-loading"></i
          ></span> -->
          <!-- <span v-else>{{ musicList.length }}</span> -->
          <span>{{ playListDetail.trackCount }}</span>
        </div>
        <!-- 歌单歌曲列表 -->
        <ul class="wrap-center">
          <div v-if="musicList.length === 0" class="loading">
            <i class="el-icon-loading"></i>
          </div>
          <songlist :songlist="musicList"></songlist>
        </ul>
        <!-- 歌单评论 -->
        <!-- <div style="padding: 0px 50px">
          <div class="countLine">评论({{ commentCount }}条)</div>
          <div
            class="hoverBackColor"
            v-for="item in playListComment"
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

          <div style="text-align: center">
            <el-pagination
              v-if="commentCount != 0"
              @current-change="playListHandleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="7"
              layout="prev, pager, next, jumper"
              :total="commentCount"
              :background="true"
            >
            </el-pagination>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongList, getPlayListComment } from "@/api/api";
import { collectPlaylist, deletePlayList } from "@/api/needLogin/musicOperate";
import { transMusicTime } from "@/utils/commonApi";
import songlist from "@/components/songlist.vue";
export default {
  components: {
    songlist,
  },
  data() {
    return {
      //歌单id
      songListId: "",
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
      // playListComment: [
      //   {
      //     user: {
      //       avatarUrl: "",
      //     },
      //   },
      // ],
      // commentCount: "",
      //MV
      songMV: [],
      //歌单详情
      playListDetail: {
        name: "",
        coverImgUrl: "",
        trackCount: "",
        creator: { avatarUrl: '', nickname: "", signature: "" },
        tags: [],
        description: "",
      },
      // userId: "", //用户id，用于鉴别歌单是否由用户自己创建的
    };
  },
  created() {
    // if (this.$store.state.token) {
    //   this.userId = this.$store.state.user.userId;
    // }
  },
  mounted() {
    //缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌单id
    if (this.$route.params.playListDetail) {
      localStorage.setItem(
        "playListDetail",
        JSON.stringify(this.$route.params.playListDetail)
      ); //存储对象类型需要转换成字符串
    }
    // 判断是否使用缓存
    this.$route.params.playListDetail
      ? (this.playListDetail = this.$route.params.playListDetail)
      : (this.playListDetail = JSON.parse(
          localStorage.getItem("playListDetail")
        )); //将字符串转成对象
    this.getSongList();
    this.getPlaylistDetail();
    // this.getPlayListComment();
  },
  methods: {
    /* //切换歌单评论
    playListHandleCurrentChange(currentPage) {
      var that = this;
      that.currentPage = currentPage;
      that.getPlayListComment();
    }, */
    /* //获取歌单评论
    getPlayListComment() {
      var that = this;
      let params = {
        id: that.playListDetail.id,
        limit: 7,
        offset: (that.currentPage - 1) * 7,
      };
      getPlayListComment(params).then(async (res) => {
        // console.log("歌单评论：", res.data);
        this.playListComment = await res.data.comments;
        that.commentCount = await res.data.total;
        // console.log("歌曲评论：", res.data);
      });
    }, */

    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      var that = this;
      that.getPlaylistDetail(currentPage);
    },

    getPlaylistDetail() {
      //传入歌单id获取歌曲id和歌单详情
      var that = this;
      let params = {
        id: that.playListDetail.id,
      };
      getPlaylistDetail(params).then(async (res) => {
        // console.log("----------------:", res.data.privileges); //歌单歌曲
        // console.log("--歌单详情-------:", res.data.playlist); //歌单歌曲
        that.playListDetail = await res.data.playlist;
        // that.musicList = that.playListDetail.tracks;
      });
    },
    getSongList() {
      //获取歌单所有歌曲
      var that = this;
      let params = {
        id: that.playListDetail.id,
      };
      getSongList(params).then(async (res) => {
        that.musicList = await res.data.songs;
        //给每个列表添加一个防抖
        for (let item of that.musicList) {
          that.$set(item, "timer", true);
        }
        transMusicTime(that.musicList, "dt");
      });
    },
 /*    //收藏/取消收藏歌单
    collectPlaylist(t) {
      const loading = this.$loading({
        target: "#list_detail",
        background: "rgba(255,255,255,0.1)",
      });
      let params = {
        t: t,
        id: this.playListDetail.id,
      };
      collectPlaylist(params)
        .then((res) => {
          this.$nextTick(() => {
            loading.close();
          });

          // console.log(res, "收藏返回");
          if (res.data.code === 200) {
            if (t === "1") {
              this.$message({
                type: "success",
                message: "收藏成功-可在网易云音乐中查看",
              });
              return;
            } else if (t === "2") {
              this.$message({
                type: "success",
                message: "已取消收藏",
              });
            }
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            loading.close();
          });
          //如果不写catch,请求拦截器拦截后这里会报错
        });
    },
    //删除歌单（自己的）
    deletePlayList(id) {
      const loading = this.$loading({
        target: "#list_detail",
        background: "rgba(255,255,255,0.1)",
      });
      deletePlayList({ id: id })
        .then((res) => {
          this.$nextTick(() => {
            loading.close();
          });
          if (res.data.code === 200) {
            this.$message.success("已从我的歌单删除");
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            loading.close();
          });
        });
    }, */
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
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;
}

.list-wrap {
  margin: 10px auto 0;
  padding: 0 20px 10px;
  width: 1120px;
  border-radius: 20px;
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .wrap2 {
    height: 680px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.11);
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
      background: rgba(34, 173, 197, 0.055);
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
        position: relative;
        width: 820px;
        height: 180px;

        // background: rgb(181, 209, 152);
        .playListCreator {
          padding: 5px 0;
          height: 30px;
          font-size: 14px;
          overflow: hidden;

          img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
          }
        }

        .playListTag {
          padding: 5px 0;
          height: 20px;
          overflow: hidden;
        }

        .playListIntro {
          padding: 5px 0;
          width: 100%;
          max-height: 65px;
          font-size: 14px;
          overflow-x: hidden;
          text-indent: 1.5em;
          &::-webkit-scrollbar {
            display: none;
          }
        }

        .playListNickName {
          color: antiquewhite;
        }
      }
    }

    .wrap-center {
      max-height: 500px;
      overflow-x: hidden;
      // border-top: 1px exclusion chocolate;

      &::-webkit-scrollbar {
        display: none;
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

//   btn-quickprev el-icon-more
.iconhover {
  transition: 0.2s;

  &:hover {
    color: rgb(247, 243, 45);
  }
}

// .iFont {
//   position: absolute;
//   top: 0;
//   right: 5px;
//   font-size: 25px;
//   &:hover {
//     cursor: pointer;
//     color: rgb(215, 233, 57);
//   }
// }
</style>
