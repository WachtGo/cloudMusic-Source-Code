<template>
  <!-- 最新MV -->
  <div>
    <h3 class="h2title">推荐MV :</h3>
    <div class="recPlay">
      <ul class="recPlaywrap">
        <li class="recPlayList" v-for="(item, index) in recMvList" :key="index">
          <div class="image">
            <img
              :src="item.picUrl"
              alt=""
              title=""
              @click="goPlayMv(item.id)"
            />
            <span class="playCount"
              ><i class="el-icon-video-play" style="margin-right: 1px"></i
              >{{ item.playCount }}</span
            >
          </div>
          <p class="List-title">
            <span
              style="
                display: inline-block;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              "
              >{{ item.name }}</span
            >
            <span style="font-size: 10px; color: rgb(220, 220, 220)">{{
              item.artists[0].name
            }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSuggestMvList } from "@/api/api";
import { transPlayCount } from "@/utils/commonApi";
export default {
  data() {
    return {
      limit: 4,
      recMvList: [],
    };
  },
  mounted() {
    this.getSuggestMvList();
  },
  methods: {
    getSuggestMvList() {
      //获取推荐MV
      var that = this;
      let params = {
        limit: that.limit,
      };
      getSuggestMvList(params).then((res) => {
        // console.log(res);
        // console.log(res, 'tuijianmv')
        that.recMvList = res.data.result;
        // console.log("推荐mv---:", res.data.result);
        //将播放量转换成亿万单位
        transPlayCount(that.recMvList, "playCount");
      });
    },
    goPlayMv(mvId) {
      var that = this;
      that.$router.push({
        name: "mvPlay",
        params: { mvId: mvId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.recPlay {
  // max-height: 550px;
  overflow-x: hidden;
  // background: rgba(95, 158, 160, 0.11);
  // &::-webkit-scrollbar {
  //   display: none;
  // }

  .recPlaywrap {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap; //根据宽度限制一行的盒子个数
    margin: 10px 0;
    width: 100%;
    height: 200px;
    // overflow-x: hidden;

    .recPlayList {
      margin-bottom: 10px;
      width: 260px;
      height: 190px;
      box-sizing: border-box;

      .image {
        position: relative;
        margin-bottom: 5px;
        width: 260px;
        height: 145px;
        border-radius: 10px;
        overflow: hidden;
        transition: 0.2s;

        &:hover {
          transform: scale(1.05);
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

      .list-title {
        font-size: 15px;
        padding: 0 10px;
        // width: 100%;
        transition: 0.2s;
        overflow: hidden; /*必须结合的属性,当内容溢出元素框时发生的事情*/
        text-overflow: ellipsis; /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
        display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
        -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
        -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
      }
    }
  }
}
.h2title {
  margin-top: 10px;
  text-align: left;
}
</style>