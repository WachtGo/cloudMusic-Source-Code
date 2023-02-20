
<template>
  <div class="list-wrap">
    <div class="pageName">歌手详情</div>
    <div class="descript"></div>
    <div>
      <div class="ul">
        <div class="details">
          <div class="details-img">
            <img :src="artist.img1v1Url" alt="" />
          </div>
          <div class="detailsRight">
            <div style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ artist.name }}
            </div>
            <div style="font-size: 14px">
              <div class="aliasClass">
                <span class="playListNickName" v-if="artist.alias[0]">{{
                  artist.alias[0]
                }}</span>
                <span class="playListNickName" v-if="artist.alias[1]"
                  >-</span
                ><span class="playListNickName2">{{ artist.alias[1] }}</span
                ><span
                  ><br />
                  <span style="color: antiquewhite"></span
                ></span>
              </div>

              <div class="option">
                <div class="flexBetween">
                  <span
                    class="inline-block"
                    @click="getSingerSongList('songSwitch')"
                    >歌曲：<span class="musicSize">{{
                      artist.musicSize
                    }}</span></span
                  >
                  <span
                    class="inline-block"
                    @click="getSingerAlbum('albumSwitch')"
                    >专辑：<span class="musicSize">{{
                      artist.albumSize
                    }}</span>
                  </span>
                  <span
                    class="inline-block"
                    @click="getSingerMvList('mvSwitch')"
                    >MV：<span class="musicSize">{{ artist.mvSize }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="singerDetail" v-if="tagSwitch.detailSwitch">
          <div style="font-size: 15px">简介：</div>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ artist.briefDesc }}
          </p>
        </div>
        <div id="singleSongs" v-if="tagSwitch.songSwitch">
          <!-- <h3>
            歌曲：{{ songCount }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size：10px;"></span>
          </h3> -->
          <div class="loading" v-show="songList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="songList.length !== 0">
            <ul class="song-album-wrap">
              <songlist :songlist="songList"></songlist>
            </ul>
            <div class="pagination">
              <el-pagination
                v-show="artist.musicSize > 30"
                @current-change="songHandleCurrentChange"
                :current-page.sync="songcurrentPage"
                :page-size="30"
                layout="prev, pager, next, jumper"
                :total="artist.musicSize"
                :background="true"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div id="albumList" v-if="tagSwitch.albumSwitch">
          <div class="loading" v-show="albumList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="albumList.length !== 0">
            <ul class="song-album-wrap">
              <li
                class="liWrap"
                v-for="(item, index) in albumList"
                :key="index"
                @click="goAlbumDetail(item.id)"
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
                      <!-- 作者：<span>{{ item.artist.name }}</span> -->
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
            </ul>
            <div class="pagination">
              <el-pagination
                v-show="artist.albumSize > 6"
                @current-change="albumHandleCurrentChange"
                :current-page.sync="albumcurrentPage"
                :page-size="6"
                layout="prev, pager, next, jumper"
                :total="artist.albumSize"
                :background="true"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <div id="singerMvs" v-if="tagSwitch.mvSwitch">
          <!-- <h3 style="margin: 0 auto">
            MV：{{ mvList.length }}&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size：10px;"></span>
          </h3> -->
          <div class="loading" v-show="mvList.length === 0">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="mvList.length !== 0">
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
                    :src="item.imgurl16v9"
                    alt=""
                    title=""
                    @click="playMV(item.id)"
                  />
                  <span class="videoPlayTime"
                    ><i class="el-icon-video-play" style="margin-right: 1px"></i
                    >{{ item.playCount }}</span
                  >
                  <span class="videoPlayTime" style="bottom: 0">{{
                    item.duration
                  }}</span>
                </div>

                <p class="List-title" style="font-size: 10px">
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
            <div class="pagination">
              <el-pagination
                v-show="artist.mvSize > 8"
                @current-change="mvHandleCurrentChange"
                :current-page.sync="mvcurrentPage"
                :page-size="8"
                layout="prev, pager, next, jumper"
                :total="artist.mvSize"
                :background="true"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDownloadUrl,
  getSingerDesc,
  getSingerSongList,
  getSingerMvList,
  getSingerAlbum,
} from "@/api/api";
import { transMusicTime, transPlayCount, download } from "@/utils/commonApi";
import songlist from "@/components/songlist.vue";
export default {
  components: {
    songlist,
  },
  // props: ['artist.id'],
  data() {
    return {
      //歌手信息
      artist: {
        alias: [],
        musicSize: "",
      },
      songList: [],
      albumList: [],
      mvList: [],
      tagSwitch: {
        detailSwitch: true,
        songSwitch: false,
        albumSwitch: false,
        mvSwitch: false,
      },

      songcurrentPage: 1,
      albumcurrentPage: 1,
      mvcurrentPage: 1,
    };
  },
  mounted() {
    ////缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌手id
    if (this.$route.params.artist) {
      localStorage.setItem("artist", JSON.stringify(this.$route.params.artist));
    }
    //判断是否使用缓存
    this.$route.params.artist
      ? (this.artist = this.$route.params.artist)
      : (this.artist = JSON.parse(localStorage.getItem("artist")));
    this.getSingerDesc();
  },
  methods: {
    //显示歌手单曲、专辑、mv列表开关
    switchChange(tag) {
      var that = this;
      for (let key in that.tagSwitch) {
        if (key != tag) {
          that.tagSwitch[key] = false;
        }
      }
      that.tagSwitch[tag] = true;
    },

    //获取歌手单曲列表
    getSingerSongList(tag) {
      var that = this;
      let params = {
        id: that.artist.id,
        limit: 30,
        offset: (that.songcurrentPage - 1) * 30,
      };
      that.detailShow = false;
      that.songList = [];
      getSingerSongList(params).then((res) => {
        // console.log('歌手单曲列表：', res.data)
        that.songList = res.data.songs;
        // that.songCount = res.data.total
        //给每首曲子添加防抖
        for (let item of that.songList) {
          that.$set(item, "timer", true);
        }
        //转换时间
        let dt = "dt";
        transMusicTime(that.songList, dt);
      });
      that.switchChange(tag);
    },
    //获取歌手专辑列表
    getSingerAlbum(tag) {
      var that = this;

      let params = {
        id: that.artist.id,
        limit: 6,
        offset: (that.albumcurrentPage - 1) * 6,
      };
      that.detailShow = false;
      that.albumList = [];
      getSingerAlbum(params).then((res) => {
        // console.log("歌手专辑列表", res.data.hotAlbums);
        that.albumList = res.data.hotAlbums;
      });

      that.switchChange(tag);
    },
    //获取歌手mv
    getSingerMvList(tag) {
      var that = this;
      let params = {
        id: that.artist.id,
        limit: 8,
        offset: (that.mvcurrentPage - 1) * 8,
      };
      that.mvList = [];
      getSingerMvList(params).then((res) => {
        // console.log("获取到的歌手MV：", res.data.mvs);
        that.mvList = res.data.mvs;
        // 转换时间单位
        transMusicTime(that.mvList, "duration");
        //转换播放量单位
        transPlayCount(that.mvList, "playCount");
      });
      that.switchChange(tag);
    },
    //获取歌手描述
    getSingerDesc() {
      // console.log(Boolean(this.artist))
      var that = this;
      let params = {
        id: that.artist.id,
      };
      getSingerDesc(params).then((res) => {
        // console.log("歌手描述", res.data);
        that.artist = res.data.artist;
      });
    },

    //跳转到专辑详情
    goAlbumDetail(albumId) {
      this.$router.push({
        name: "albumDetail",
        params: {
          albumId: albumId,
        },
      });
    },
    //跳转到播放MV页面
    playMV(mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },

    //歌手歌曲分页
    songHandleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      var that = this;
      that.songcurrentPage = currentPage;
      that.getSingerSongList("songSwitch");
    },
    //歌手专辑分页
    albumHandleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      var that = this;
      that.albumcurrentPage = currentPage;
      that.getSingerAlbum("albumSwitch");
    },
    // 歌手mv分页
    mvHandleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      var that = this;
      that.mvcurrentPage = currentPage;
      that.getSingerMvList("mvSwitch");
    },
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
  height: 720px;
  border-radius: 20px;
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .ul {
    height: 650px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.11);
    // overflow-x: hidden;

    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .details {
      display: flex;
      justify-content: space-between;
      margin: 0 auto 10px;
      padding: 10px;
      width: 96%;
      height: 170px;
      // border: 1px solid rgb(97, 226, 183);
      border-radius: 10px;
      background: rgba(95, 158, 160, 0.11);
      box-sizing: border-box;

      .details-img {
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
    // width: 96%;
    margin: 10 auto;
    padding: 10px 20px;
    width: 98%;
    height: 460px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.11);
    box-sizing: border-box;
    overflow: hidden;

    // overflow-x: hidden;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .liWrap {
      display: flex;
      justify-content: space-around;
      margin: 0 auto 10px;
      padding: 0 10px;
      // width: 95%;
      height: 60px;
      border-radius: 12px;
      background: rgba(95, 158, 160, 0.11);
      box-sizing: border-box;
      transition: 0.2s;

      &:hover {
        transform: scale(1.01);
      }

      .liWrap-block1 {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        // background-color: rgba(178, 244, 151, 1);
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

  .singerDetail {
    margin: 0 auto;
    padding: 10px;
    width: 96%;
    height: 420px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.11);
    box-sizing: border-box;
  }

  #singleSongs {
    margin: 0 auto;
    padding: 0px 10px 20px;
    width: 96%;
    height: 460px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.05);
    box-sizing: border-box;
    overflow: hidden;
    // overflow-x: hidden;

    // &::-webkit-scrollbar {
    //   display: none;
    // }

    .SingsList {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin: 5px auto;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: rgba(99, 187, 162, 0.144);
      border-radius: 15px;
      box-sizing: border-box;
      line-height: 30px;
      transition: 0.2s;

      .song-list {
        display: inline-block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .song-list-option {
        position: absolute;
        width: 130px;
        right: 10px;

        span {
          display: inline-block;
          margin: 0 5px;
          transition: 0.2s;

          &:hover {
            color: bisque;
            cursor: pointer;
          }
        }
      }

      &:hover {
        color: aqua;
        transform: scale(1.01);
      }
    }
  }

  #singerMvs {
    margin: 0 auto;
    padding: 0px 10px 20px;
    width: 96%;
    height: 435px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.11);
    box-sizing: border-box;

    // overflow-x: hidden;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
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
            background: transparent;
          }
        }

        p {
          font-size: 15px;
          padding: 0 10px;
          // width: 100%;
          transition: 0.2s;
          overflow: hidden;
          /*必须结合的属性,当内容溢出元素框时发生的事情*/
          text-overflow: ellipsis;
          /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
          display: -webkit-box;
          /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
          -webkit-line-clamp: 2;
          /*用来限制在一个块元素显示的文本的行数。*/
          -webkit-box-orient: vertical;

          /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
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

  .song-album-wrap {
    height: 420px;
    // background: #8eb89e;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
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
}

.iconhover {
  transition: 0.2s;

  &:hover {
    color: rgb(247, 243, 45);
  }
}
</style>
