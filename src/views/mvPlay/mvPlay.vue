<style lang="less" scoped>
.recMv {
  width: 1100px;
  padding: 0 10px;

  margin: 10px auto;

  max-height: 700px;
  border-radius: 0 0 10px 10px;
  background: rgba(95, 158, 160, 0.322);
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .mvTitle {
    font-size: 20px;
  }

  .recMvwrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; //根据宽度限制一行的盒子个数
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(95, 158, 160, 0.322);
  }
}
.mvDetail {
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
  .mvTitle {
    margin-bottom: 10px;
  }
  ul {
    margin: 10px 0;
    .mvTag {
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
    border: 1px solid white;
  }
}
.pagination {
  /deep/ .el-pager {
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
}
</style>
<template>
  <!-- 推荐歌单 -->
  <div class="recMv" style="border-radius: 10px">
    <div v-if="mvId" style="margin: 0 auto; width: 95%">
      <video
        controls
        autoplay
        loop
        :src="mvUrl"
        style="margin: 10px 0; width: 100%; height: 580px"
      ></video>
    </div>

    <div class="mvDetail">
      <div>
        <div style="margin-bottom: 10px">
          <div class="authorImg">
            <img :src="mvDetail.cover" alt="" />
          </div>
          <span class="authorName">{{ mvDetail.artistName }}</span>
        </div>
      </div>

      <div style="margin-bottom: 10px">
        <span class="mvTitle">{{ mvDetail.name }} </span>
      </div>
      <div>
        <span class="smallFont">发布：{{ mvDetail.publishTime }}</span>
        <span class="smallFont">播放：{{ mvDetail.playCount }}次</span>
      </div>

      <p style="margin-top: 10px">{{ mvDetail.desc }}</p>
      <ul>
        <li class="mvTag" v-for="item in mvDetail.videoGroup" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
      <div>
        <span class="smallFont border">赞{{ mvDetail.likedCount }}</span>
        <span class="smallFont border">收藏{{ mvDetail.subCount }}</span>
        <span class="smallFont border">分享{{ mvDetail.shareCount }}</span>
      </div>
    </div>
    <div v-if="mvId" style="padding: 0px 50px">
      <h3 style="margin: 5px 0 10px 0; text-align: center">
        评论({{ count }}条)
      </h3>
      <div class="hoverBackColor" v-for="item in mvComments" :key="item.id">
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
      <!-- //评论分页 -->
    </div>
    <div
      class="pagination"
      style="text-align: center; padding-top: 10px; box-sizing: border-box"
    >
      <el-pagination
        v-if="count != 0"
        @current-change="videohandleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next, jumper"
        :total="count"
        :background="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getMVUrl,
  getcommentMV,
  getMvDetails,
  getMvDetailInfo,
} from "@/api/api";
export default {
  data() {
    return {
      mvUrl: "",
      mvName: false,
      mvId: "",
      mvComments: [],
      mvDetail: {},
      count: "",
      currentPage: 1,
    };
  },
  created() {
    this.mvName = this.$route.query.mvName;
    this.mvId = this.$route.query.mvId;
    this.playMV();
  },
  methods: {
    //mv分页
    videohandleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log("我是第一"+this.currentPage)
      this.playMV(this.mvId, currentPage);
    },
    playMV() {
      let params = {
        id: this.$route.query.mvId,
      };
      getMVUrl(params).then((res) => {
        this.mvUrl = res.data.data.url;
      });
      //mv详情
      getMvDetails(params).then((res) => {
        // console.log("mv详情---：", res.data.data);
        this.mvDetail = res.data.data;
        // mv点赞转发评论数数据
        getMvDetailInfo(params).then((res) => {
          // console.log("mv点赞转发评论数数据---:", res.data);
          this.$set(this.mvDetail, "likedCount", res.data.likedCount);
        });
      });
      // 热门评论;
      getcommentMV({
        id: this.$route.query.mvId,
        limit: 8,
        offset: (this.currentPage - 1) * 8,
      }).then((res) => {
        this.mvComments = res.data.comments;
        // console.log("我是评论" + this.mvComments);
        this.count = res.data.total;
        // console.log("我是最后面"+page)
      });
    },
  },
};
</script>

