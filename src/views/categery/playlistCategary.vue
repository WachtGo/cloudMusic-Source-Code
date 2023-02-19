<template>
  <div>
    <div class="list-wrap">
      <div>
        <div class="inline-block" style="padding: 5px 0">
          <span style="font-size: 16px">热门歌单分类：</span>
          <span
            class="hotCategary"
            v-for="item in hotPlaylistTag"
            :key="item.id"
            @click="getPlaylist(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
        <div class="inline-block clearfix" style="float: right; padding: 5px 0">
          <span style="color: #eee">当前：</span>
          <span class="categary-select">{{ currentTag }}</span> -
          <span style="color: #eee">&nbsp;排列：</span>
          <span
            class="categary-select"
            v-if="order === '最热'"
            @click="order = '最新'"
            >最热</span
          >
          <span
            class="categary-select"
            v-if="order === '最新'"
            @click="order = '最热'"
            >最新</span
          >
          -
          <span class="categary-allTag" @click="categaryShow = !categaryShow"
            >&nbsp;全部分类</span
          >
          <!-- 全部分类窗口 -->
          <div class="categary-allTag-wrap" v-if="categaryShow">
            <div
              class="categary-allTag-wrap-list"
              v-for="(item, index) in categories"
              :key="index"
            >
              <div>
                <span>{{ item }}:</span>
              </div>
              <div class="categary-allTag-wrap-list-item">
                <span
                  v-for="(item, index2) in categoryTag[index]"
                  @click="getPlaylist(item.name)"
                  :key="index2"
                  >{{ item.name }}</span
                >
              </div>
            </div>
            <div class="categary-allTag-wrap-list">
              <div><span>全部:</span></div>
              <div class="categary-allTag-wrap-list-item">
                <span @click="getPlaylist('全部')">全部</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="descript"></div> -->
      </div>

      <!-- <div class="descript"></div> -->
      <!-- 歌单列表 -->
      <div class="playListClass">
        <div class="recPlay">
          <div class="loading" v-show="playListTable.length === 0">
            <i class="el-icon-loading"></i>
          </div>
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
                  @click="goSongList(item.id)"
                />
                <span class="playCount"
                  ><i class="el-icon-video-play" style="margin-right: 1px"></i
                  >{{ item.playCount }}</span
                >
              </div>
              <p class="List-title" @click="goSongList(item.id)">
                <span>{{ item.name }} </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count !== 0"
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
import { getHotPlayList, getAllPlayList, getPlaylist } from "@/api/api";
import { transPlayCount } from "@/utils/commonApi";
export default {
  data() {
    return {
      hotPlaylistTag: [],
      categaryShow: false,
      order: "最新",
      currentTag: "全部",
      categories: {},
      categoryTag: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
      },
      playListTable: [],
      count: 0,
      //初始页
      currentPage: 1,
    };
  },
  watch: {
    //排列顺序发生变化时，自动获取
    order() {
      this.getPlaylist(this.currentTag);
    },
  },
  mounted() {
    this.getHotPlayList();
    this.getAllPlayList();
    this.getPlaylist(this.currentTag);
  },
  methods: {
    //获取热门分类歌单
    getHotPlayList() {
      let that = this;
      getHotPlayList().then((res) => {
        that.hotPlaylistTag = res.data.tags;
      });
    },
    //获取全部歌单分类
    getAllPlayList() {
      let that = this;
      getAllPlayList().then((res) => {
        // console.log(res)
        that.categories = res.data.categories;
        for (let key in that.categoryTag) {
          res.data.sub.forEach((item) => {
            if (item.category == key) {
              that.categoryTag[key].push(item);
              // console.log(that.categoryTag)
            }
          });
        }
      });
    },
    //获取歌单列表----
    async getPlaylist(cat, notChangePage) {
      let that = this;
      let params = {
        cat: cat,
        order: that.order,
        limit: 15,
        offset: (that.currentPage - 1) * 15,
      };
      that.categaryShow = false;
      if (that.currentTag === cat && notChangePage) return;
      that.playListTable = []; //清空，重新获取，防止页面图片加载慢
      that.currentTag = cat;
      await getPlaylist(params).then((res) => {
        // console.log(res)
        that.playListTable = res.data.playlists;
        // console.log(that.playListTable)
        that.count = res.data.total;
        // transPlayCount(that.playListTable)
        transPlayCount(that.playListTable, "playCount");
      });
    },
    //传入歌单id进入歌单详情
    goSongList(songListId) {
      //传入歌单id进入歌单详情
      var that = this;
      that.$router.push({
        name: "playListDetails",
        params: { songListId: songListId },
      });
    },
    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      var that = this;
      that.currentPage = currentPage;
      that.getPlaylist(that.currentTag, false);
    },
  },
};
</script>

<style lang="less" scoped>
.descript {
  display: flex;
  justify-content: space-between;
  // color: aliceblue;
  font-weight: bolder;
  padding: 0 20px;
  border-radius: 20px 20px 0 0;
  // background: rgba(95, 158, 160, 0.05);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto 0;
  padding: 0 20px;
  width: 1120px;
  height: 697px;
  border-radius: 20px;
  // background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .hotCategary {
    padding: 0 5px;
    font-size: 15px;
    color: rgb(201, 185, 165);
    // border: 1px dotted rgb(192, 190, 190);
    // border-radius: 10px;
    transition: 0.3s;

    &:hover {
      cursor: pointer;
      color: rgb(202, 162, 108);
    }
  }
  .categary-select {
    padding: 0 10px;
    // border: 1px solid #eee;
    border-radius: 10px;

    color: rgb(202, 162, 108);
    transition: 0.3s;
    &:hover {
      color: rgb(202, 162, 108);
      cursor: pointer;
    }
  }
  .categary-allTag {
    color: rgb(201, 185, 165);
    transition: 0.2s;
    &:hover {
      color: rgb(202, 162, 108);
      cursor: pointer;
    }
  }
  .categary-allTag-wrap {
    z-index: 100;
    position: absolute;
    right: 40px;
    width: 600px;
    height: 300px;
    padding: 10px;
    background: url(@/static/img/background8.jpeg); //---------------需要与主题一同更改
    // background-size: cover;
    border-radius: 20px;
    overflow-x: hidden;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }

    .categary-allTag-wrap-list-item {
      padding: 5px 20px;

      box-sizing: border-box;
      // background: rgb(153, 140, 140);

      span {
        display: inline-block;
        margin: 5px 10px;
        color: rgb(207, 206, 204);
        transition: 0.2s;

        &:hover {
          color: rgb(202, 162, 108);
          cursor: pointer;
        }
      }
    }
  }
}
/* 歌单列表样式 */
.playListClass {
  .recPlay {
    margin: auto;
    width: 100%;
    height: 655px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    .playListWrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap; //根据宽度限制一行的盒子个数
      margin: 0 0 10px;
      width: 100%;
      // max-height: 100%;
      background: transparent;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
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
  /deep/ .el-pagination {
    height: 100% !important;
  }
}
</style>