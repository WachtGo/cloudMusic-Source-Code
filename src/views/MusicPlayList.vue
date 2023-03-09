<template>
  <div class="list-wrap">
    <div class="tagWrap">
      <span @click="tagSelect('songSwitch')" v-if="!tagSwitch.songSwitch"
        >单曲</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.songSwitch"
        >单曲</span
      >
      <span @click="tagSelect('albumSwitch')" v-if="!tagSwitch.albumSwitch"
        >专辑</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.albumSwitch"
        >专辑</span
      >
      <span @click="tagSelect('singerSwitch')" v-if="!tagSwitch.singerSwitch"
        >歌手</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.singerSwitch"
        >歌手</span
      >
      <span
        @click="tagSelect('playListSwitch')"
        v-if="!tagSwitch.playListSwitch"
        >歌单</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.playListSwitch"
        >歌单</span
      ><span @click="tagSelect('videoSwitch')" v-if="!tagSwitch.videoSwitch"
        >视频</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.videoSwitch"
        >视频</span
      ><span @click="tagSelect('mvSwitch')" v-if="!tagSwitch.mvSwitch">MV</span
      ><span style="color: rgb(80, 180, 220)" v-if="tagSwitch.mvSwitch"
        >MV</span
      >
    </div>
    <div class="descript"></div>
    <div>
      <ul>
        <!-- 单曲列表 -->
        <div v-show="tagSwitch.songSwitch">
          <div class="loading" v-show="musicList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <songlist :songlist="musicList"></songlist>
        </div>
        <!-- 专辑列表 -->
        <div class="albumListClass" v-show="tagSwitch.albumSwitch">
          <div class="loading" v-show="albumList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <li
            class="liWrap"
            v-for="(item, index) in albumList"
            :key="index"
            @click.stop="goAlbumDetail(item.id)"
          >
            <div class="liWrap-block1">
              <img :src="item.blurPicUrl" alt="" />
            </div>
            <div class="liWrap-block2">
              <div class="div1">
                <span class="albumName"
                  >{{ item.name }}
                  <span v-if="item.alias[0]" class="albumName2">{{
                    item.alias[0]
                  }}</span></span
                >
              </div>
              <div>
                <div class="divOther">
                  作者：<span>{{ item.artist.name }}</span>
                </div>
                <span
                  class="inline-block"
                  style="display: inline-block; width: 50px"
                ></span>
                <div class="divOther" style="width: 100px">
                  歌曲：<span>{{ item.size }}</span>
                </div>
              </div>
            </div>
          </li>
        </div>
        <!-- 歌手列表 -->
        <div class="singerListClass" v-show="tagSwitch.singerSwitch">
          <div class="loading" v-show="artists.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <li
            class="liWrap"
            v-for="(item, index) in artists"
            :key="index"
            @click.stop="goSingerDetail(item)"
          >
            <div class="liWrap-block1">
              <img :src="item.img1v1Url" alt="" />
            </div>
            <div class="liWrap-block2">
              <div class="div1">
                歌手：<span>{{ item.name }}</span>
              </div>
              <div>
                <div class="divOther">
                  专辑：<span>{{ item.albumSize }}</span>
                </div>

                <div class="divOther">
                  MV：<span>{{ item.mvSize }}</span>
                </div>
              </div>
            </div>
          </li>
        </div>
        <div v-show="tagSwitch.albumSwitch"></div>
        <!-- 歌单列表 -->
        <div class="playListClass" v-show="tagSwitch.playListSwitch">
          <div class="loading" v-show="playListTable.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div class="recPlay">
            <ul class="playListWrap">
              <li
                class="playListTable"
                v-for="(item, index) in playListTable"
                :key="index"
              >
                <div class="image">
                  <img
                    :src="item.coverImgUrl"
                    alt=""
                    title=""
                    @click="goSongList(item)"
                  />
                  <span class="playCount"
                    ><i class="el-icon-video-play" style="margin-right: 1px"></i
                    >{{ item.playCount }}</span
                  >
                </div>
                <p class="List-title" @click="goSongList(item)">
                  <span>{{ item.name }} </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 视频列表 -->
        <div class="videoListClass" v-show="tagSwitch.videoSwitch">
          <div class="loading" v-show="videoList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div class="videoPlay">
            <ul class="videoPlaywrap">
              <li
                class="videoPlayList"
                v-for="(item, index) in videoList"
                :key="index"
              >
                <div class="videoImage">
                  <img
                    class="videoImg"
                    style="
                      position: absolute;
                      width: 240px;
                      height: 155px;
                      border-radius: 10px;
                    "
                    :src="item.coverUrl"
                    alt=""
                    title=""
                    @click="goVideo(item.vid, item.type)"
                  />
                  <span class="videoPlayTime"
                    ><i class="el-icon-video-play" style="margin-right: 1px"></i
                    >{{ item.playTime }}</span
                  >
                  <span class="videoPlayTime" style="bottom: 0">{{
                    item.durationms
                  }}</span>
                </div>

                <p
                  class="List-title"
                  style="font-size: 10px"
                  @click="goVideo(item.vid, item.type)"
                >
                  <span
                    style="
                      display: inline-block;
                      width: 100%;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                    ><span v-if="!item.type" style="color: red">MV&nbsp;</span
                    >{{ item.title }}</span
                  ><br />
                  <span style="color: rgb(199, 199, 199)"
                    ><span v-if="item.markTypes">by&nbsp;</span>
                    <span>{{ item.creator[0].userName }}</span></span
                  >
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- MV列表 -->
        <div class="videoListClass" v-show="tagSwitch.mvSwitch">
          <div class="loading" v-show="mvList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div class="videoPlay">
            <ul class="videoPlaywrap">
              <li
                class="videoPlayList"
                v-for="(item, index) in mvList"
                :key="index"
              >
                <div class="videoImage">
                  <img
                    class="videoImg"
                    style="
                      position: absolute;
                      width: 240px;
                      height: 155px;
                      border-radius: 10px;
                    "
                    :src="item.cover"
                    alt=""
                    title=""
                    @click="goVideo(item.id, item.mark)"
                  />
                  <span class="videoPlayTime"
                    ><i class="el-icon-video-play" style="margin-right: 1px"></i
                    >{{ item.playCount }}</span
                  >
                  <span class="videoPlayTime" style="bottom: 0">{{
                    item.duration
                  }}</span>
                </div>

                <p
                  class="List-title"
                  style="font-size: 10px"
                  @click="goVideo(item.id, item.mark)"
                >
                  <span
                    style="
                      display: inline-block;
                      width: 100%;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                    ><span v-if="!item.type" style="color: red">MV&nbsp;</span
                    >{{ item.name }}</span
                  ><br />
                  <span style="color: rgb(199, 199, 199)"
                    ><span>by&nbsp;</span>
                    <span>{{ item.artistName }}</span></span
                  >
                </p>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>

    <div class="pagination">
      <el-pagination
        v-show="count != 0"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="15"
        layout="prev, pager, next, jumper"
        :total="count"
        :background="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMusicInfo } from "@/api/api";
import { transMusicTime, transPlayCount } from "@/utils/commonApi";
import songlist from "@/components/songlist.vue";
export default {
  components: {
    songlist,
  },
  data() {
    return {
      //试听音乐
      listen: [],
      //单曲，专辑，歌手，歌单开关
      tagSwitch: {},
      //MV列表
      videoList: [],
      //歌单列表
      playListTable: [],
      // 歌曲列表
      musicList: [],
      // 专辑列表
      albumList: [],
      //歌手列表
      artists: [],
      //MV列表
      mvList: [],
      //音乐下载地址
      downLoadUrl: "",
      //标签切换
      activeName: "first",
      //搜索内容总数（歌曲，歌单，mv,等）
      count: 0,
      //初始页
      currentPage: 1,
    };
  },
  created() {
    // console.log(this);
    var that = this;
    that.tagSwitch = that.$store.state.musicPlayList.tagSwitch;
    that.search();
  },
  methods: {
    //标签切换
    tagSelect(tag) {
      var that = this;
      that.$store.commit("musicPlayList/tagSelect", tag);
      that.$nextTick(() => {
        that.search();
      });
    },
    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      var that = this;
      if (that.tagSwitch.songSwitch) {
        that.getSingleMuscic();
      } else if (that.tagSwitch.playListSwitch) {
        that.getMusicList();
      } else if (that.tagSwitch.videoSwitch) {
        that.getVideoList();
      } else if (that.tagSwitch.mvSwitch) {
        that.getMVList();
      } else if (that.tagSwitch.singerSwitch) {
        that.getSingerList();
      } else if (that.tagSwitch.albumSwitch) {
        that.getSingerList();
      }
    },
    search() {
      var that = this;
      if (that.tagSwitch.songSwitch) {
        that.getSingleMuscic();
      } else if (that.tagSwitch.playListSwitch) {
        that.getMusicList();
      } else if (that.tagSwitch.videoSwitch) {
        that.getVideoList();
      } else if (that.tagSwitch.mvSwitch) {
        that.getMVList();
      } else if (that.tagSwitch.singerSwitch) {
        that.getSingerList();
      } else if (that.tagSwitch.albumSwitch) {
        that.getAlbumList();
      }
    },

    //获取专辑详情
    goAlbumDetail(id) {
      this.$router.push({
        name: "albumDetail",
        params: {
          albumId: id,
        },
      });
    },
    //进入歌手详情页面
    goSingerDetail(singerDetail) {
      // console.log(item)
      let params = {
        id: singerDetail.id,
        img1v1Url: singerDetail.img1v1Url,
        name: singerDetail.name,
        alias: singerDetail.alias,
        musicSize: singerDetail.musicSize,
        albumSize: singerDetail.albumSize,
        mvSize: singerDetail.mvSize,
        briefDesc: "",
      };
      this.$router.push({
        name: "singerDetail",
        params: {
          artist: params,
        },
      });
    },
    //进入歌单详情
    goSongList(playListDetail) {
      // console.log(playListDetail);
      let params = {
        id: playListDetail.id,
        name: playListDetail.name,
        coverImgUrl: playListDetail.picUrl,
        trackCount: playListDetail.trackCount,
        creator: {
          avatarUrl: "",
          nickname: playListDetail.creator.nickname,
          signature: "",
        },
        tags: [],
        description: "",
      };
      //传入歌单id进入歌单详情
      this.$router.push({
        name: "playListDetails",
        params: { playListDetail: params },
      });
    },

    //通过搜索关键词获取单曲（歌曲）
    getSingleMuscic() {
      var that = this;
      if (that.$route.query.reload) {
        // console.log("this.$route:---", that.$route);
      }
      //获取歌曲列表
      let params = {
        keywords: that.$route.query.keywords,
        limit: 30,
        offset: (that.currentPage - 1) * 30,
        type: 1, //代表获取单曲
      };
      that.musicList = [];
      getMusicInfo(params).then(async (res) => {
        that.musicList = await res.data.result.songs;
        // console.log(that.musicList)
        that.count = await res.data.result.songCount;
        transMusicTime(that.musicList, "dt");
        // console.log("音乐列表：", res.data.result);
        //给每个列表添加一个防抖
        for (let item of that.musicList) {
          that.$set(item, "timer", true);
        }
      });
    },
    // 通过搜索关键词获取专辑
    getAlbumList() {
      var that = this;
      //获取歌曲列表
      let params = {
        keywords: that.$route.query.keywords,
        limit: 30,
        offset: (that.currentPage - 1) * 30,
        type: 10, //代表获取专辑
      };
      that.albumList = [];
      getMusicInfo(params).then((res) => {
        that.albumList = res.data.result.albums;
        that.count = res.data.result.albumCount;
        // console.log("专辑列表：", res.data.result);
      });
    },
    //通过搜索关键词获取歌手列表
    getSingerList() {
      var that = this;
      let params = {
        keywords: that.$route.query.keywords,
        limit: 15,
        offset: (that.currentPage - 1) * 15,
        type: 100, //代表获取歌手
      };
      that.artists = [];
      getMusicInfo(params).then((res) => {
        // console.log("获取歌手列表----", res.data.result);
        that.artists = res.data.result.artists;
        that.count = res.data.result.artistCount;
      });
    },
    //通过搜索关键词获取歌单
    getMusicList() {
      var that = this;
      let params = {
        keywords: that.$route.query.keywords,
        limit: 15,
        offset: (that.currentPage - 1) * 15,
        type: 1000, //代表获取歌单
      };
      that.playListTable = [];
      getMusicInfo(params).then(async (res) => {
        // console.log('获取歌单列表----', res.data.result)
        that.playListTable = await res.data.result.playlists;
        that.count = await res.data.result.playlistCount;
        transPlayCount(that.playListTable, "playCount");
      });
    },
    //通过搜索关键词获取对应视频列表
    getVideoList() {
      var that = this;
      let params = {
        keywords: that.$route.query.keywords,
        limit: 12,
        offset: (that.currentPage - 1) * 12,
        type: 1014, //代表获取视频
      };
      that.videoList = [];
      getMusicInfo(params).then(async (res) => {
        // console.log("获取视频列表----", res.data.result);
        that.videoList = await res.data.result.videos;
        // console.log("视频列表：", that.videoList);
        that.count = await res.data.result.videoCount;
        //转换歌曲时长单位为分秒
        transMusicTime(that.videoList, "durationms");
        //将播放量转换成亿万单位
        transPlayCount(that.videoList, "playTime");
      });
    },
    //通过搜索关键词获取对应MV列表
    getMVList() {
      var that = this;
      let params = {
        keywords: that.$route.query.keywords,
        limit: 12,
        offset: (that.currentPage - 1) * 12,
        type: 1004, //代表获取MV
      };
      that.mvList = [];
      getMusicInfo(params).then(async (res) => {
        // console.log("获取MV列表----", res.data.result);
        that.mvList = await res.data.result.mvs;
        // console.log("MV列表：", that.mvList);
        that.count = await res.data.result.mvCount;
        //转换歌曲时间为分秒单位
        transMusicTime(that.mvList, "duration");
        // 转换播放量单位为万
        transPlayCount(that.mvList, "playCount");
      });
    },

    goVideo(vid, type) {
      if (type === 0) {
        this.$router.push({
          name: "mvPlay",
          params: {
            mvId: vid,
          },
        });
      } else {
        this.$router.push({
          name: "videoPlay",
          params: {
            videoId: vid,
          },
        });
      }
    },
    randomColor() {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    },
  },
};
</script>

<style lang="less" scoped>
//视频列表页面样式
.videoListClass {
  .videoPlay {
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }

    .videoPlaywrap {
      display: flex;
      margin: 0 auto;
      padding: 10px;
      justify-content: space-evenly;
      flex-wrap: wrap; //根据宽度限制一行的盒子个数
      margin: 10px 0;
      width: 98%;
      background: transparent;
      // overflow-x: hidden;

      .videoPlayList {
        margin-bottom: 10px;
        width: 240px;
        height: 155px;
        border-radius: 10px;
        box-sizing: border-box;

        .videoImage {
          position: relative;
          margin-bottom: 10px;
          width: 240px;
          height: 155px;
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
// 歌单列表样式
.playListClass {
  .recPlay {
    margin: auto;
    max-height: 630px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    .playListWrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap; //根据宽度限制一行的盒子个数
      margin: 10px 0;
      width: 100%;
      background: transparent;
      // overflow-x: hidden;

      .playListTable {
        margin-bottom: 10px;
        width: 205px;
        height: 230px;
        box-sizing: border-box;

        .image {
          position: relative;
          margin: 10px auto;
          width: 190px;
          height: 190px;
          border-radius: 10px;
          overflow: hidden;
          transition: 0.2s;

          &:hover {
            transform: scale(1.06);
            cursor: pointer;
            // height: 210px;
          }
          img {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .playCount {
            position: absolute;
            z-index: 99;
            right: 10px;
            background: transparent;
          }
        }
        .List-title {
          margin: 0 auto;
          font-size: 15px;
          // padding: 0 10px;
          width: 180px;
          transition: 0.2s;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden; /*必须结合的属性,当内容溢出元素框时发生的事情*/
          text-overflow: ellipsis; /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
          white-space: nowrap;
          display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
          -webkit-line-clamp: 1; /*用来限制在一个块元素显示的文本的行数。*/
          -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
          span {
            display: inline-block;
            width: 180px;
            // text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

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
//歌手列表样式
.singerListClass {
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
      background-color: rgba(152, 158, 149, 0);
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: no;
      border-radius: 10px;
      line-height: 40px;
      box-sizing: border-box;
      // background-color: rgba(226, 214, 156, 0.075);
      transition: 0.2s;

      span {
        &:hover {
          color: rgba(136, 240, 240, 0.719);
        }
      }
      .div1 {
        display: inline-block;
        // width: 200px;

        span {
          color: bisque;
          transition: 0.2s;
          &:hover {
            color: rgba(252, 214, 167, 0.979);
          }
        }
      }
      .divOther {
        display: inline-block;
        width: 100px;
        margin-right: 5px;

        span {
          color: bisque;
          transition: 0.2s;
          &:hover {
            color: rgba(255, 198, 129, 0.979);
          }
        }
      }
      &:hover {
        transform: scale(1.01);
        cursor: pointer;
      }
    }
  }
}
//专辑列表页面样式
.albumListClass {
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
      // color: aqua;
      transform: scale(1.01);
    }
    .liWrap-block1 {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      background-color: rgba(177, 244, 151, 0);
      transition: 0.2s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      &:hover {
        // color: aqua;
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

.descript {
  display: flex;
  justify-content: space-between;
  color: aliceblue;
  font-weight: bolder;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  background: rgba(95, 158, 160, 0.05);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto 0;
  padding: 0 20px 10px;
  width: 1120px;
  // height: 730px;
  border-radius: 20px;
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .tagWrap {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin: 0 auto;
    width: 50%;

    span {
      font-size: 18px;
      padding: 0 10px;
      transition: 0.2s;

      &:hover {
        color: rgb(101, 195, 233);
        cursor: pointer;
      }
    }
  }

  ul {
    height: 650px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.05);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    .music-list {
      position: relative;
      display: flex;
      margin: 5px auto 5px;
      padding: 0 10px;
      width: 96%;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      color: rgba(255, 255, 255, 1);
      font-weight: bolder;
      border-radius: 5px;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      // background: rgba(172, 233, 236, 0.055);
      transition: 0.2s;

      .music-list-span {
        display: inline-block;
        width: 270px;
        // font-size:13px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option {
        position: absolute;
        padding-left: 120px;
        width: 240px;
        right: 0px;
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
        color: rgb(88, 255, 241);
        transform: scale(1.01);
        // background: rgba(141, 251, 255, 0.192);
      }
    }
  }
}
.pagination {
  text-align: center;
  background: none !important;

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
    transition: 0.2s;
    background: transparent !important;
  }
  /deep/ .number:hover,
  /deep/ .btn-prev:hover,
  /deep/ .btn-quicknext:hover,
  /deep/ .btn-next:hover,
  /deep/ .el-input__inner:hover,
  /deep/ .more:hover {
    transform: scale(1.02);
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
  /deep/.el-pagination {
    height: 100%;
  }
  .iconhover {
    transition: 0.2s;
    &:hover {
      color: rgb(247, 243, 45);
    }
  }
}
</style>

