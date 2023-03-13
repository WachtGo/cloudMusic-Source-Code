<template>
  <div class="list-wrap">
    <!-- <div class="descript"></div> -->
    <div class="pageName">我的歌单</div>
    <ul>
      <!-- 歌单列表 -->
      <div class="playListClass">
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
                  alt=" "
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
    </ul>

    <div class="pagination">
      <el-pagination
        v-show="count != 0"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="30"
        layout="prev, pager, next, jumper"
        :total="count"
        :background="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMyPlayList, updatePlayList } from "@/api/needLogin/musicOperate";
import { transMusicTime, transPlayCount } from "@/utils/commonApi";
import songlist from "@/components/songlist.vue";
export default {
  components: {
    songlist,
  },
  data() {
    return {
      //歌单列表
      playListTable: [],
      count: 0,
      //初始页
      currentPage: 1,
    };
  },
  created() {
    // this.updatePlayList();
    this.getMyPlayList();
  },
  methods: {
    //分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.getMyPlayList();
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

    //获取用户歌单
    getMyPlayList() {
      let params = {
        uid: this.$store.state.user.userId,
        limit: 30,
        offset: (this.currentPage - 1) * 30,
      };
      this.playListTable = [];
      getMyPlayList(params).then(async (res) => {
        console.log("获取我的歌单列表----", res);
        if (res.data.code === 200) {
          this.playListTable = await res.data.playlist;
          this.count = this.playListTable.length;
          transPlayCount(this.playListTable, "playCount");
        }
      });
    },
    //更新歌单
    // updatePlayList(){
    //   updatePlayList().then(res=>{

    //   })
    // }
  },
};
</script>

<style lang="less" scoped>
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
      // flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap; //根据宽度限制一行的盒子个数
      margin-bottom: 10px;
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

.descript {
  display: flex;
  flex-direction: column;
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

