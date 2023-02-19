<template>
  <div>
    <div class="music-list" v-for="(item, index) in songlist" :key="item.id">
      <div style="width: 20px">{{ index + 1 }}.</div>
      <div @dblclick="goSongDetails(item)" class="music-list-info">
        <div class="music-list-span">{{ item.name }}</div>
        <div class="music-list-span">{{ item.ar[0].name }}</div>
        <div class="music-list-span music-list-dt">{{ item.dt }}</div>
      </div>

      <div class="option">
        <!-- 试听 -->
        <span @click="listenMusic(item)"
          ><i class="el-icon-headset iconhover"></i
        ></span>
        <!-- 添加到播放列表 -->
        <span
          v-if="item.fee == 0 || item.fee == 8"
          @click.stop="playMusic(item)"
          ><i class="el-icon-folder-add iconhover"></i>
        </span>
        <!-- 播放MV -->
        <span v-if="Boolean(item.mv)" @click.stop="playMV(item.mv)"
          ><i class="el-icon-video-camera iconhover"></i>
        </span>
        <!-- 下载 -->
        <span
          v-if="item.fee == 0 || item.fee == 8"
          @click="getDownloadUrl(item.id, item.name)"
        >
          <i class="el-icon-download iconhover"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadUrl } from "@/api/api";
import { playMusic, listenMusic } from "@/utils/musicPlay";
import { download } from "@/utils/commonApi";
export default {
  props: {
    songlist: Array,
  },
  data() {
    return {};
  },
  methods: {
    //获取歌曲详情,进入详情页面
    goSongDetails(songDetails) {
      // console.log('歌曲信息',songDetails)
      this.$router.push({
        name: "songDetails",
        params: {
          songDetails: songDetails,
        },
      });
    },
    //试听音乐
    listenMusic(songDetals) {
      //获取播放音乐链接
      var that = this;
      var list = "songlist";
      listenMusic(songDetals, that);
    },
    //添加歌曲到播放列表
    playMusic(songDetals) {
      //获取播放音乐链接
      var that = this;
      var list = "songlist";
      playMusic(songDetals, that);
    },
    playMV(mvId) {
      //获取mv播放链接
      this.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
    //获取歌曲下载地址
    getDownloadUrl(songId, songName) {
      var that = this;
      that.$message({
        type: "success",
        message: "正在尝试下载",
      });
      let params = {
        id: songId,
      };
      getDownloadUrl(params).then((res) => {
        // console.log('歌曲下载地址：', res.data)
        // console.log("歌曲下载地址：", res.data.data.url);
        // download(res.data.data.url, songName)
        download(res.data.data[0].url, songName);
        that.$message({
          type: "success",
          message: "开始下载了",
        });
      });
    },
  },
};
</script>

<style lang="less" >
.music-list {
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-around;
  margin: 5px auto 5px;
  padding: 0 15px;
  width: 96%;
  //   height: 30px;
  //   line-height: 30px;
  overflow: hidden;
  color: rgba(255, 255, 255, 1);
  font-weight: bolder;
  border-radius: 5px;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  background-color: rgba(99, 187, 162, 0.044);
  border-radius: 15px;
  transition: 0.2s;

  .music-list-index {
    position: absolute;
    left: 0;
    width: 3%;
  }
  .music-list-info {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 75%;

    .music-list-span,
    .music-list-dt {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .music-list-span {
      width: 40%;
    }
    .music-list-dt {
      width: 20%;
      // font-size:13px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .option {
    display: inline-block;
    margin-left: 5%;
    width: 10%;
    box-sizing: border-box;

    span {
      display: inline-block;
      width: 25%;
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
</style>