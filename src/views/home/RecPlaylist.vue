<template>
  <!-- 推荐歌单 -->
  <div>
    <h3 class="h2title">推荐歌单 :</h3>
    <div class="recPlay Ocenter">
      <ul class="recPlaywrap">
        <li class="recPlayList"
            v-for="(item, index) in recPlayList"
            :key="index">
          <div class="image">
            <img :src="item.picUrl"
                 alt=""
                 title=""
                 @click="goSongList(item.id)" />
            <span class="playCount"><i class="el-icon-video-play"
                 style="margin-right: 1px"></i>{{ item.playCount }}</span>
          </div>
          <p class="List-title"
             @click="goSongList(item.id)">
            <span>{{ item.name }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSuggestPlayList } from "@/api/api";
import { transPlayCount } from "@/api/commonApi"
export default {
  data () {
    return {
      limit: 10,
      recPlayList: [],
    };
  },
  mounted () {
    this.getSuggestPlayList();
  },
  methods: {
    getSuggestPlayList () {
      //获取推荐歌单
      var that = this;
      let params = {
        limit: that.limit,
      };
      getSuggestPlayList(params).then((res) => {
        that.recPlayList = res.data.result;
        // console.log("推荐歌单：--", res.data.result);
        //将播放量转成亿,万单位
        transPlayCount(that.recPlayList, 'playCount')
      });
    },
    goSongList (songListId) {
      //传入歌单id进入歌曲列表
      var that = this;
      that.$router.push({
        name: "playListDetails",
        params: { songListId: songListId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.recPlay {
  max-height: 550px;
  overflow-x: hidden;
  background: rgba(95, 158, 160, 0.11);
  &::-webkit-scrollbar {
    display: none;
  }

  .recPlaywrap {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap; //根据宽度限制一行的盒子个数
    margin: 10px 0;
    width: 100%;
    // overflow-x: hidden;

    .recPlayList {
      margin-bottom: 10px;
      width: 205px;
      height: 260px;
      box-sizing: border-box;

      .image {
        position: relative;
        margin-bottom: 10px;
        width: 200px;
        height: 200px;
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

      p {
        font-size: 15px;
        padding: 0 10px;
        // width: 100%;
        transition: 0.2s;
        overflow: hidden; /*必须结合的属性,当内容溢出元素框时发生的事情*/
        text-overflow: ellipsis; /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
        display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
        -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
        -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
        span {
          &:hover {
            color: rgb(145, 245, 228);
            cursor: pointer;
          }
        }
      }
    }
  }
}
.h2title {
  margin-top: 10px;
  text-align: left;
}
</style>