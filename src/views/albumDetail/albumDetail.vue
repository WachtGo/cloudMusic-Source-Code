<template>
  <div class="list-wrap">
    <h3>专辑详情</h3>
    <div class="descript"></div>
    <div>
      <div class="ul">
        <div class="details">
          <div class="details-img">
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
              <span v-if="item.fee == 0 || item.fee == 8"
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
import { getAlbumContent, getDownloadUrl } from '@/api/api'
import { transMusicTime, download } from '@/utils/commonApi'
import { playMusic, listenMusic } from '@/utils/musicPlay'

export default {
  // props: ['albumId'],
  data() {
    return {
      listen: [],
      albumId: '',
      albumSongs: [],
      albumDesc: {},
    }
  },
  mounted() {
    //缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌单id
    if (this.$route.params.albumId) {
      localStorage.setItem('albumId', this.$route.params.albumId)
    }
    // 判断是否使用缓存
    this.$route.params.albumId
      ? (this.albumId = this.$route.params.albumId)
      : (this.albumId = localStorage.getItem('albumId'))
    this.getAlbumContent()
  },
  methods: {
    getAlbumContent() {
      var that = this
      let params = {
        id: that.albumId,
      }
      getAlbumContent(params).then((res) => {
        // console.log("专辑信息---：", res.data.album);
        // console.log("专辑歌曲---：", res.data.songs);
        that.albumDesc = res.data.album
        that.albumSongs = res.data.songs
        //给每个列表添加一个防抖
        for (let item of that.albumSongs) {
          that.$set(item, 'timer', true)
        }
        let dt = 'dt'
        transMusicTime(that.albumSongs, dt)
      })
    },

    //获取歌曲下载地址
    getDownloadUrl(songId, songName) {
      var that = this
      let params = {
        id: songId,
      }
      getDownloadUrl(params).then((res) => {
        // console.log("歌曲下载地址：", res.data.data.url);
        download(res.data.data.url, songName)
        that.$message({
          type: 'success',
          message: '开始下载了',
        })
      })
    },
    //试听音乐
    listenMusic(id, fee, index) {
      //获取播放音乐链接
      var that = this
      var list = 'albumSongs'
      listenMusic(id, fee, index, list, that)
    },
    //将歌曲添加到播放列表或者播放
    playMusic(id, fee, index) {
      //获取播放音乐链接
      var that = this
      var list = 'albumSongs'
      playMusic(id, fee, index, list, that)
    },
    //跳转到歌曲详情
    goSongDetails(ids) {
      this.$router.push({
        name: 'songDetails',
        params: {
          songId: ids,
        },
      })
    },
    //跳转到播放MV页面
    playMV(mvId) {
      //获取mv播放链接
      this.$router.push({
        name: 'mvPlay',
        params: { mvId: mvId },
      })
    },
    goMv(mvId) {
      this.$router.push({
        name: 'mvPlay',
        params: {
          mvId: mvId,
        },
      })
    },
    //根据主题更换播放器颜色
    randomColor() {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    },
  },
}
</script>

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
  margin: 10px auto 0;
  padding: 0 20px 10px;
  width: 1120px;
  border-radius: 20px;
  background: rgba(221, 239, 243, 0.05);
  box-sizing: border-box;

  .ul {
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
      margin: 0 auto 10px;
      padding: 10px;
      width: 96%;
      height: 170px;
      // border: 1px solid rgb(97, 226, 183);
      border-radius: 10px;
      background: rgba(221, 239, 243, 0.05);
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
    #singleSongs {
      margin: 0 auto;
      padding: 0px 10px 20px;
      width: 96%;
      height: 420px;
      border-radius: 10px;
      background: rgba(95, 158, 160, 0.05);
      box-sizing: border-box;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

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
  .iconhover {
    transition: 0.2s;
    &:hover {
      color: rgb(247, 243, 45);
    }
  }
}
</style>
