<template>
  <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
  <div id="aplayerWrap">
    <ul class="musicWrap">
      <div
        v-if="audio.length !== 0"
        class="listTitle"
        v-drag
        style="text-align: center"
      >
        播放列表
      </div>
      <div class="wrapShow">
        <li
          class="musicLi"
          v-for="(item, index) in audio"
          :key="item.id"
          @click.self="playMusic(index)"
        >
          <span>{{ index + 1 }}.</span>&nbsp;
          <span class="musicName">{{ item.name }}</span>
          <span class="artist">{{ item.artist }}</span>
          <span class="delete" @click.stop="deleteMusic(index)"
            ><i class="el-icon-delete iconhover"></i
          ></span>
        </li>
      </div>
    </ul>
    <div class="audition" v-if="audition.length !== 0">
      <div
        class="inline-block"
        style="margin: 0 auto"
        v-for="(item, index) in audition"
        :key="item.id"
      >
        <div class="auditionTitle">正在试听:</div>
        <div class="auditionMusic" @click="playAudition()">
          <span class="inline-block auditionName">{{ item.name }}</span>
          <span class="inline-block auditionArtist">{{ item.artist }}</span>

          <span
            class="inline-block auditionDelete"
            @click.stop="deleteAudition(index)"
            ><i class="el-icon-delete iconhover"></i
          ></span>
          <span
            class="inline-block auditionAdd"
            @click.stop="addListenMusic(item.id)"
            ><i class="el-icon-folder-add iconhover"></i
          ></span>
        </div>
      </div>
    </div>
    <div v-if="audio.length !== 0 && musicAudioStatu === 0">
      <aplayer
        autoplay
        fixed
        ref="aplayer"
        :audio="audio"
        style="color: rgb(120, 120, 120)"
      >
      </aplayer>
    </div>

    <div v-if="audition.length !== 0 && musicAudioStatu === 1">
      <aplayer
        autoplay
        :fixed="true"
        ref="auditions"
        :audio="audition"
        :liric-type="1"
      ></aplayer>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { getSongDetails } from "@/api/api";
import { playMusic } from "@/utils/musicPlay";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("aplayer", ["audio", "audition", "musicAudioStatu"]),
  },
  mounted() {},

  methods: {
    ...mapMutations("aplayer", [
      "deleteMUSIC",
      "deleteAUDITION",
      "changeAPLAYER",
    ]),

    //播放指定歌曲
    playMusic(idx) {
      this.changeAPLAYER(0); //切换播放器
      let aplayer = this.$refs.aplayer; //获取当前播放器
      aplayer.switch(idx); //切换到播放当前下标的歌曲
      aplayer.toggle(); //切换播放/暂停
    },
    //删除歌曲
    deleteMusic(idx) {
      // this.$store.commit('deleteMusic',idx)
      this.deleteMUSIC(idx);
    },
    //试听的播放/暂停
    playAudition() {
      this.changeAPLAYER(1); //切换到试听播放器
      let auditions = this.$refs.auditions; //获取当前播放器
      auditions.switch(); //切换到播放当前下标的歌曲
      auditions.toggle(); //切换播放/暂停
    },
    //删除试听
    deleteAudition(idx) {
      this.deleteAUDITION(idx);
    },
    //添加到播放列表
    async addListenMusic(id) {
      let that = this;
      let list = "audition";
      await getSongDetails({ ids: id }).then((res) => {
        playMusic(id, res.data.songs[0].fee, 0, list, that);
      });
    },
  },
  directives: {
    drag(el) {
      // let dragBox = el.parentElement.parentElement; //获取移动的元素
      let dragBox = document.getElementsByClassName("musicWrap");
      el.onmousedown = (e) => {
        //鼠标点击时鼠标的的位置
        // console.log(e)
        // console.log(el.parentElement)
        let downX = e.clientX;
        let downY = e.clientY;
        //元素位置
        let left = dragBox[0].offsetLeft;
        let top = dragBox[0].offsetTop;
        // console.log(e.clientX,e.clientY)
        // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
        document.onmousemove = (e) => {
          //鼠标移动的距离
          let moveX = e.clientX - downX;
          let moveY = e.clientY - downY;
          // console.log('鼠标移动:',moveX,moveY)

          //移动当前元素
          dragBox[0].style.left = left + moveX + "px";
          dragBox[0].style.top = top + moveY + "px";
        };
        document.onmouseup = (e) => {
          //鼠标弹起来的时候不再移动
          document.onmousemove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
        };
      };
    },
  },
};
</script>
<style lang="less">
.musicWrap {
  position: relative;
  width: 400px;
  max-height: 16px;
  top: 3%;
  left: 0;
  border-radius: 5px;
  color: #ccc;
  // background: rgba(243, 242, 242, 0.336);
  overflow-x: hidden;

  .listTitle {
    position: relative;
    font-size: 13px;
    text-align: center;
    transition: 0.8s;

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

.audition {
  position: fixed;
  width: 500px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 18px;
  color: #ccc;
  // color: rgba(218, 218, 218, 0.842);

  transition: 0.2s;

  .auditionTitle {
    position: relative;
    display: inline-block;
    font-size: 13px;
    margin-right: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .auditionMusic {
    // position: relative;
    display: inline-block;
    font-size: 13px;
    transition: 0.2s;

    &:hover {
      // color: aqua;
      color: rgb(29, 236, 167);
    }

    .auditionName {
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .auditionArtist {
      width: 90px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .auditionDelete {
      width: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .auditionAdd {
      width: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
}

.bgmusicWrap {
  position: absolute;
  top: 0;
  right: 5px;
  width: 250px;
  color: #ccc;
  max-height: 20px;
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    max-height: 200px;
  }

  .bgmusic-ul {
    width: 100%;
    text-align: center;
    transition: 0.2s;

    .bgmusic-li {
      height: 20px;
      padding: 0 10px;
      background: rgba(160, 160, 160, 0.096);
      transition: 0.2s;

      &:hover {
        cursor: pointer;
        color: rgb(29, 236, 167);
        transform: scale(1.01);
      }
    }
  }
}

.iconhover {
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    color: rgb(238, 160, 57);
  }
}

.aplayer {
  .aplayer-body {
    // height: 200px !important;
    // .aplayer-pic {
    // background-image: url("@/img/background.jpg") !important;
    // img {
    //   width: 100px;
    //   height: 100px;
    // }

    // background: rgba(247, 247, 253, 0.164);
    // }
    // .aplayer-info {
    //   .aplayer-music {
    //     .aplayer-title {
    //       color: rgb(133, 130, 130);
    //       transition: 0.2s;
    //       &:hover {
    //         color: turquoise;
    //       }
    //     }
    //     .aplayer-author {
    //       color: rgb(111, 114, 113);
    //       transition: 0.2s;

    //       &:hover {
    //         color: turquoise;
    //       }
    //     }
    //   }
    //   .aplayer-lrc {
    //     position: fixed;
    //     top: 45px;
    //     left: 0;
    //     right: 0;
    //     margin: auto;
    //     // margin-right: 100px;
    //     width: 350px;
    //     height: 32px;
    //     border-radius: 40px;
    //     // background: rgba(179, 248, 241, 0.082) !important;
    //     transition: 0.2s;
    //     &:after {
    //       background: none;
    //     }
    //     &:before {
    //       background: none;
    //     }
    //     &:hover {
    //       transform: scale(1.01);
    //     }

    //     background: transparent;
    //     .aplayer-lrc-contents {
    //       background: transparent;
    //       .aplayer-lrc-current {
    //         // height: 30px;
    //         font-size: 16px;

    //         color: rgba(248, 255, 254, 0.973);
    //         background: transparent;
    //         &:hover {
    //           color: turquoise;
    //         }
    //       }
    //       p {
    //         color: rgb(255, 255, 255);
    //         font-size: 14px;
    //       }
    //     }
    //   }
    // }
  }

  // .aplayer-list {
  //   .aplayer-list-light {
  //   }
  //   .aplayer-list-cur {
  //   }
  // }
}
</style>
