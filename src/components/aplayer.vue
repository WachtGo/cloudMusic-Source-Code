<template>
  <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
  <div id="aplayerWrap" @keydown="operaMusic">
    <ul class="musicWrap">
      <div v-if="audio.length !== 0" class="listTitle">播放列表</div>
      <div class="wrapShow">
        <li class="musicLi" v-for="(item, index) in audio" :key="item.id" @click="playMusic(index)">
          <div :style="{ 'color': item.id === currentMusic.id ? 'rgb(29, 236, 167)' : '#ccc' }">
            <span>{{ index + 1 }}.</span>&nbsp;
            <span class="musicName">{{ item.name }}</span>
            <span class="artist">{{ item.artist }}</span>
            <span class="delete" @click.stop="deleteMusic(index)"><i class="el-icon-delete iconhover"></i></span>
          </div>

        </li>
      </div>
    </ul>
    <!-- <div class="audition" v-if="audition.length !== 0">
      <div
        class="inline-block"
        style="margin: 0 auto"
        v-for="(item, index) in audition"
        :key="item.id"
      >
        <div class="auditionTitle">正在试听:</div>
        <div class="auditionMusic" @click="playAudition(0)">
          <span class="inline-block auditionName">{{ item.name }}</span>
          <span class="inline-block auditionArtist">{{ item.artist }}</span>

          <span
            class="inline-block auditionDelete"
            @click.stop="deleteAudition(index)"
            ><i class="el-icon-delete iconhover"></i
          ></span>
          <span
            class="inline-block auditionAdd"
            @click.stop="addListenMusic(item)"
            ><i class="el-icon-folder-add iconhover"></i
          ></span>
        </div>
      </div>
    </div> -->
    <div style="position: relative;" v-if="audio.length !== 0 && musicAudioStatu === 0">
      <aplayer autoplay ref="aplayer" :audio="audio" style="color: rgb(120, 120, 120)">
      </aplayer>
      <span class="aplayeIcon" @click="getDownloadUrl(currentMusic)">
        <i class="el-icon-download iconhover"></i></span>
    </div>

    <div style="position: relative;" v-if="audition.length !== 0 && musicAudioStatu === 1">
      <aplayer autoplay ref="auditions" :audio="audition" :liric-type="1"></aplayer>
      <span class="aplayeIcon" @click="resetAudition">
        <i class=" el-icon-magic-stick iconhover"></i></span>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { playMusic, listenMusic } from "@/utils/musicPlay";
import { getDownloadUrl } from "@/api/api";
import { download } from "@/utils/commonApi";
// import { Loading } from "element-ui";
export default {
  data() {
    return {
      // 试听歌曲
      // audition:{
      //   name: '卡农（经典钢琴版）', //歌曲名
      //   artist: 'dylanf', //作者
      //   // url: songUrlAdd,
      //   url: `https://music.163.com/song/media/outer/url?id=478507889.mp3`,
      //   cover: 'http://p2.music.126.net/fL7FAeRby1s7JreBqoOKjg==/109951165175371079.jpg',
      //   // lrc: songlrc,
      //   id: 478507889,
      //   timer: true, //试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
      // }
      currentMusic: {},//当前播放的音乐
      aplayerDomLoading: false,//是否正在获取aplayer播放器dom，有效利用资源，用于防卡顿一直获取
    };
  },
  computed: {
    ...mapState("aplayer", ["audio", "audition", "musicAudioStatu"]),
  },
  created() {
    //监听按键
    window.addEventListener('keydown', this.operaMusic);
    //每隔几秒钟获取一次当前播放的音乐id
    let a = setInterval(() => {
      //判断上一次是否获取完毕
      if (this.musicAudioStatu === 0 && !this.aplayerDomLoading) {
        this.aplayerDomLoading = true; // 开始获取状态
        let aplayer = this.$refs.aplayer; // 获取当前播放器
        let timeout = false; // 初始化超时标志为 false

        // 设置一个超时定时器
        let timeoutId = setTimeout(() => {
          timeout = true;
          this.aplayerDomLoading = false; // 超时时重置状态
        }, 1000); // 设置超时时间，单位为毫秒，根据实际情况进行调整

        // 检查超时标志和获取状态
        if (aplayer && aplayer.currentMusic && !timeout) {
          this.currentMusic = aplayer.currentMusic
          this.aplayerDomLoading = false;
          clearTimeout(timeoutId); // 清除超时定时器
        }
      }
    }, 2222);
  },
  beforeDestroy() {
    //销毁按键监听
    window.removeEventListener('keydown', this.operaMusic);
  },
  methods: {
    ...mapMutations("aplayer", [
      "deleteMUSIC",
      "deleteAUDITION",
      "changeAPLAYER",
    ]),

    //播放指定歌曲
    async playMusic(idx) {
      //await,防止还未切换播放器就开始请求，使得aplayer出现undefine
      if (this.musicAudioStatu === 1) {
        await this.changeAPLAYER(0); //切换播放器
      }
      let aplayer = this.$refs.aplayer; //获取当前播放器
      // console.log(aplayer.currentMusic.id)

      // console.log(aplayer)
      aplayer.switch(idx); //切换到播放当前下标的歌曲
      aplayer.toggle(); //切换播放/暂停
      this.currentMusic = aplayer.currentMusic//将当前播放的音乐id记录
      // console.log(this.currentMusicId)
    },
    //删除歌曲
    deleteMusic(idx) {
      // this.$store.commit('deleteMusic',idx)
      this.deleteMUSIC(idx);
    },
    //试听的播放/暂停
    async playAudition() {
      if (this.musicAudioStatu === 0) {
        await this.changeAPLAYER(1); //切换到试听播放器
      }
      let auditions = this.$refs.auditions; //获取当前播放器

      // console.log(auditions)
      // auditions.switch(0); //切换到播放当前下标的歌曲
      auditions.toggle(); //切换播放/暂停
      this.currentMusic = auditions.currentMusic//将当前播放的音乐记录
    },
    //按空格键，对音乐进行播放或者暂停
    operaMusic(event) {
      // 首先判断事件目标是否为输入框
      if (event.target.tagName.toLowerCase() !== 'input') {
        if (event.key === ' ') {
          // console.log('按下了空格')
          // console.log(this.musicAudioStatu)
          if (this.musicAudioStatu === 0) {//播放列表
            let aplayer = this.$refs.aplayer; //获取当前播放器
            aplayer.toggle(); //切换播放/暂停
          } else {
            // let auditions = this.$refs.auditions; //获取当前播放器
            console.log(auditions)
            auditions.toggle(); //切换播放/暂停
          }

        }
      }
    },
    //删除试听
    deleteAudition(idx) {
      this.deleteAUDITION(idx);
    },
    //添加到播放列表
    addListenMusic(songDetals) {
      let that = this;
      let songDetail = {
        ar: [
          {
            name: songDetals.artist,
          },
        ],
        al: {
          picUrl: songDetals.cover,
        },
        id: songDetals.id,
        // url: songDetals.url,
        name: songDetals.name,
        timer: songDetals.timer,
      };
      playMusic(songDetail, that);
    },
    //重置试听歌曲
    resetAudition() {
      this.$store.commit("aplayer/addAUDITION", {
        name: '卡农（经典钢琴版）', //歌曲名
        artist: 'dylanf', //作者
        // url: songUrlAdd,
        url: `https://music.163.com/song/media/outer/url?id=478507889.mp3`,
        cover: 'http://p2.music.126.net/fL7FAeRby1s7JreBqoOKjg==/109951165175371079.jpg',
        // lrc: songlrc,
        id: 478507889,
        timer: true, //试听中添加，防止用户连点消耗性能，在添加播放列表方法中可使用到
      });
    },
    //获取歌曲下载地址
    getDownloadUrl(currentMusic) {
      let musicfilename = currentMusic.name + ' - ' + currentMusic.artist
      var that = this;
      that.$message({
        type: "success",
        message: "正在尝试下载",
      });
      let params = {
        id: currentMusic.id,
      };
      getDownloadUrl(params).then((res) => {
        // console.log('歌曲下载地址：', res.data)
        // console.log("歌曲下载地址：", res.data.data.url);
        // download(res.data.data.url, songName)
        download(res.data.data[0].url, musicfilename);
        that.$message({
          type: "success",
          message: "开始下载了",
        });
      });
    },
  },
};
</script>
<style lang="less">
.musicWrap {
  position: fixed;
  width: 400px;
  max-height: 16px;
  top: 0;
  left: 0;
  border-radius: 5px;
  color: #ccc;
  // background: rgba(243, 242, 242, 0.336);
  overflow-x: hidden;

  .listTitle {
    // position: relative;
    font-size: 13px;
    text-align: center;
    transition: 0.8s;
    text-align: center;

    &:hover {
      // display: none;
      cursor: default;
      // color: rgb(253, 253, 253);
      transform: scale(1.02);
    }
  }

  .wrapShow {
    width: 100%;
    // max-height: 17px;
    top: 8%;
    left: 10px;
    border-radius: 5px;
    // color: rgba(48, 46, 46, 0.548) !important;
    background: rgba(160, 160, 160, 0.096);
    overflow-x: hidden;
    transition: 0.8s;

    &:hover {
      // cursor: pointer;
      max-height: 480px;
      // color: rgb(30, 205, 236) !important;
      // transform: scale(1.03);
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .musicLi {
      position: relative;
      padding: 2px 10px;
      transition: 0.3s;

      &:hover {
        cursor: pointer;
        color: rgb(29, 236, 167);
        transform: scale(1.02);
      }

      // .musicName,
      // .artist {
      //   &:hover {
      //     color: aquamarine;
      //   }
      // }
      .artist {
        position: absolute;
        right: 35px;
      }

      .delete {
        position: absolute;
        right: 15px;
      }
    }
  }

  &:hover {
    // cursor: pointer;
    max-height: 500px;
    // color: rgb(30, 205, 236);
    // transform: scale(1.03);
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.iconhover {
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    color: rgb(238, 160, 57);
  }
}

.aplayeIcon {
  //播放器上的下载图标
  position: absolute;
  right: 57px;
  top: 20px;
}

.aplayer {
  margin: 5px;
  height: 66px;
  overflow: hidden;
  border-radius: 39px !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: 0 0 15px 5px #739cbdf1;
  font-family: 仓耳渔阳体 !important;

  .aplayer-body {
    // background-image: url(../static/img/background8.jpeg);
    // background-attachment: fixed;
    // background-size: cover;

    .aplayer-pic {
      width: 66px;
      height: 66px;
      border-radius: 50% !important;

      .aplayer-button {}

      .aplayer-play {}
    }

    .aplayer-info {
      // height: 66px;
      border: 0px !important;

      // background-image: url(../static/img/background8.jpeg);
      .aplayer-music {
        text-align: center;
        font-size: 16px !important;

        .aplayer-title {
          color: #fff;
        }

        .aplayer-author {
          color: #fff;
        }
      }

      .aplayer-lrc {
        .aplayer-lrc-contents {
          .aplayer-lrc-current {}
        }
      }

      .aplayer-controller {
        .aplayer-bar-wrap {
          margin: 0 50px 0 0;

          .aplayer-bar {
            .aplayer-loaded {}

            .aplayer-played {
              .aplayer-thumb {
                .aplayer-loading-icon {}
              }
            }
          }
        }

        .aplayer-time {
          right: 45px;

          .aplayer-icon {
            color: aliceblue;

            path {
              fill: #fff;
            }

          }

          .aplayer-time-inner {
            color: #fff;

            .aplayer-ptime {}

            .aplayer-dtime {}
          }



          .aplayer-icon-back {}

          .aplayer-icon-play {}

          .aplayer-icon-forward {}

          .aplayer-volume-wrap {
            .aplayer-icon-volume-down {}

            .aplayer-volume-bar-wrap {
              .aplayer-volume-bar {
                .aplayer-volume {}
              }
            }
          }

          .aplayer-icon-order {}

          .aplayer-icon-loop {}

          .aplayer-icon-menu {
            display: none !important;
          }
        }
      }
    }

    .aplayer-notice {}

    .aplayer-miniswitcher {
      .aplayer-icon {}

      .aplayer-icon-miniswitcher {}
    }
  }

  .aplayer-list {
    display: none !important;

    .aplayer-list-light {
      .aplayer-list-cur {}

      .aplayer-list-index {}

      .aplayer-list-title {}

      .aplayer-list-author {}
    }
  }


}
</style>
