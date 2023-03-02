<template>
  <div>
    <h3 class="h2title">热搜:</h3>
    <div class="hotSearch">
      <div class="hotSearchWrap">
        <!-- <el-skeleton-item
          variant="text"
          animated
          style="width: 10%; background: #000"
        /> -->
        <div
          class="hotSearchWord"
          v-for="(item, index) in hotSearch"
          :key="index"
          @click="getMusicList(item.searchWord)"
        >
          <span>{{ item.searchWord }}</span
          ><img class="hot" v-if="item.iconType" :src="item.iconUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotSearch } from "@/api/api.js";
export default {
  data() {
    return {
      hotSearch: [],
    };
  },
  mounted() {
    this.getHotSearch();
  },
  methods: {
    getHotSearch() {
      //获取热搜歌曲列表
      getHotSearch().then((res) => {
        this.hotSearch = res.data.data;
        // console.log(this.hotSearch);
      });
    },
    getMusicList(keywords) {
      //搜索进入搜索页面
      this.$router.push({
        name: "MusicPlayList",
        query: { keywords: keywords },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.hotSearch {
  margin: 5px auto;
  padding: 0 10px;
  width: 1120px;
  border-radius: 10px;
  // background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .hotSearchWrap {
    height: 120px;

    .hotSearchWord {
      // position: relative;
      display: inline-block;
      margin: 10px 20px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      transition: 0.2s;

      &:hover {
        color: rgb(145, 245, 228);
        transform: scale(1.02);
        cursor: pointer;
      }

      .hot {
        //  position: absolute;
        //  right: 0;
        margin-bottom: 10px;
        // width: 28px;
        height: 15px;
      }
    }
  }
}
.h2title {
  // margin-top: 10px;
  text-align: left;
}
</style>