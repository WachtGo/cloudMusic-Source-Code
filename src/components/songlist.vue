<template>
  <div>
    <div class="music-list" v-for="(item, index) in songlist" :key="item.id">
      <div style="width: 35px">{{ index + 1 }}.</div>
      <div @dblclick="goSongDetails(item)" class="music-list-info">
        <div class="music-list-span">{{ item.name }}</div>
        <div class="music-list-span">{{ item.ar[0].name }}</div>
        <div class="music-list-span music-list-dt">{{ item.dt }}</div>
      </div>

      <div class="option">
        <!-- 加入我的喜欢
        <span @click="likeMusic(item.id, true)"
          ><i class="iFont el-icon-star-on iconhover"></i
        ></span>
        从我的喜欢删除
        <span @click="likeMusic(item.id, false)"
          ><i class="iFont el-icon-star-off iconhover"></i
        ></span> -->
        <!-- <i class="iFont el-icon-star-off" @click="collectPlaylist"></i> -->
        <!-- 试听 -->
        <span @click="listenMusic(item)"><i class="el-icon-headset iconhover"></i></span>
        <!-- 添加到播放列表 -->
        <span v-if="item.fee == 0 || item.fee == 8" @click.stop="playMusic(item)"><i
            class="el-icon-folder-add iconhover"></i>
        </span>
        <!-- 播放MV -->
        <span v-if="Boolean(item.mv)" @click.stop="playMV(item.mv)"><i class="el-icon-video-camera iconhover"></i>
        </span>
        <!-- 下载 -->
        <span v-if="item.fee == 0 || item.fee == 8" @click="getDownloadUrl(item.id, item.name, item.ar[0].name)">
          <i class="el-icon-download iconhover"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadUrl } from "@/api/api";
import { playMusic, listenMusic } from "@/utils/musicPlay";
import { likeMusic } from "@/api/needLogin/musicOperate";
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
    /*  //加入/删除喜欢音乐
     likeMusic(id, bool) {
       const loading = this.$loading({
         target: "#app_body",
         background: "rgba(255,255,255,0.1)",
       });
       likeMusic({ id: id, like: bool })
         .then((res) => {
           this.$nextTick(() => {
             loading.close();
           });
           console.log("添加", res);
           if (res.data.code === 200) {
             if (bool) {
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
     }, */
    //试听音乐
    listenMusic(songDetals) {
      //获取播放音乐链接
      var that = this;
      // var list = "songlist";
      // console.log(songDetals)
      listenMusic(songDetals, that);
    },
    //添加歌曲到播放列表
    playMusic(songDetals) {
      //获取播放音乐链接
      var that = this;
      // var list = "songlist";
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
    getDownloadUrl(songId, songName, songArtist) {
      let musicfilename = songName + ' - ' + songArtist
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

<style lang="less" >
.music-list {
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-around;
  margin: 5px auto 5px;
  padding: 0 15px;
  width: 96%;
  height: 30px;
  line-height: 30px;
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
    width: 5%;
  }

  .music-list-info {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 70%;

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
      width: 25%;
      // font-size:13px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .option {
    display: inline-block;
    margin-left: 2%;
    width: 15%;
    box-sizing: border-box;

    span {
      display: inline-block;
      width: 15%;

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