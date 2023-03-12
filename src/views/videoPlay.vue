<template>
  <!-- 推荐歌单 -->
  <div class="recMv Ocenter">
    <!-- <h3 v-if="!vid" class="mvTitle">请先选择需要播放的视频</h3> -->
    <div v-if="videoId" style="margin: 0 auto; width: 95%">
      <video
        controls
        autoplay
        loop
        :src="videoUrl"
        style="margin: 10px 0; width: 100%; height: 580px"
      ></video>
    </div>
    <div class="videoDetail">
      <div>
        <div style="margin-bottom: 10px">
          <div class="authorImg">
            <img :src="videoDetail.creator.avatarUrl" alt=" " />
          </div>
          <span class="authorName">{{ videoDetail.creator.nickname }}</span>
        </div>
      </div>
      <div style="margin-bottom: 10px">
        <span class="videoTitle">{{ videoDetail.title }}</span>
      </div>
      <div style="margin-bottom: 10px">
        <span class="smallFont">发布：{{ videoDetail.publishTime }}</span>
        <span class="smallFont">播放：{{ videoDetail.playTime }}次</span>
      </div>
      <p>{{ videoDetail.description }}</p>
      <ul>
        <li
          class="videoTag"
          v-for="item in videoDetail.videoGroup"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <div>
        <span class="smallFont border">赞{{ videoDetail.praisedCount }}</span>
        <span class="smallFont border"
          >收藏{{ videoDetail.subscribeCount }}</span
        >
        <span class="smallFont border">分享{{ videoDetail.shareCount }}</span>
      </div>
    </div>

    <div v-if="videoId" style="padding: 0px 50px">
      <h3 style="margin: 5px 0 10px 0; text-align: center">
        评论({{ count }}条)
      </h3>
      <div class="hoverBackColor" v-for="item in videoComments" :key="item.id">
        <img
          :src="item.user.avatarUrl"
          style="width: 50px; border-radius: 25px"
        />
        <span style="display: inline-block; margin-left: 10px; font-size: 15px"
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
      <!-- 评论分页 -->
      <div style="text-align: center">
        <el-pagination
          v-if="count != 0"
          @current-change="mvhandleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="8"
          layout="prev, pager, next, jumper"
          :total="count"
          :background="true"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoDetails, getVideoUrl, getVideoComment } from "@/api/api";
import { transtime } from "@/utils/commonApi";
export default {
  data() {
    return {
      mvUrl: "",
      videoUrl: "",
      videoDetail: {
        creator: {},
        title: "",
        publishTime: "",
        playTime: "",
        videoGroup: [],
        praisedCount: "",
        subscribeCount: "",
        shareCount: "",
      },
      videoId: "",
      videoComments: [],
      count: "",
      currentPage: 1,
    };
  },
  mounted() {
    //缓存id,解决params数据在刷新页面后丢失，导致无法获取到歌单id
    if (this.$route.params.videoId) {
      localStorage.setItem("videoId", this.$route.params.videoId);
    }
    // 判断是否使用缓存
    this.$route.params.videoId
      ? (this.videoId = this.$route.params.videoId)
      : (this.videoId = localStorage.getItem("videoId"));
    this.playVideo();
  },
  methods: {
    //mv分页
    mvhandleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log("我是第一"+this.currentPage)
      this.playVideo(this.videoId, currentPage);
    },
    playVideo() {
      let params = {
        id: this.videoId,
      };
      getVideoDetails(params).then((res) => {
        // console.log("视频详情--", res.data.data);
        this.videoDetail = res.data.data;
        this.videoDetail.publishTime = transtime(this.videoDetail.publishTime);
      });
      getVideoUrl(params).then((res) => {
        // console.log("视频地址：", res.data.urls[0].url);
        this.videoUrl = res.data.urls[0].url;
      });
      var comments = {
        id: this.videoId,
        limit: 8,
        offset: (this.currentPage - 1) * 8,
      };
      getVideoComment(comments).then((res) => {
        // console.log("视频评论：", res);
        this.videoComments = res.data.comments;
        this.count = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.recMv {
  width: 1100px;
  padding: 0 10px;
  margin: 10px auto;
  border-radius: 10px;
  max-height: 700px;
  border-radius: 0 0 10px 10px;
  background: rgba(95, 158, 160, 0.322);
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .mvTitle {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .recMvwrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; //根据宽度限制一行的盒子个数
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.322);
  }
}
.videoDetail {
  padding: 10px 50px;
  // height: 100px;
  // background: rgb(226, 211, 211);
  .authorImg {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
    vertical-align: top;
    img {
      width: 100%;
      height: 100%;
      // vertical-align: top;
    }
  }
  .authorName {
    display: inline-block;
    margin-left: 25px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }
  .videoTitle {
    font-size: 20px;
  }
  ul {
    margin: 10px 0;
    .videoTag {
      display: inline-block;
      margin: 0 5px;
      padding: 2px 5px;
      background: rgba(231, 217, 192, 0.349);
      border-radius: 10px;
    }
  }
  .smallFont {
    margin-right: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: rgba(233, 233, 233, 0.829);
  }
  .border {
    margin: 0 5px 0 0;
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    font-size: 15px;
    color: rgb(247, 245, 245);
    border-radius: 10px;
    border: 1px solid rgb(248, 245, 245);
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
</style>