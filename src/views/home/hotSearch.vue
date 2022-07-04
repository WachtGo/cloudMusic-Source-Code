<template>
  <div>
    <h3 class="h2title">热搜歌曲 :</h3>
    <div class="hotSearch ">
      <div class="hotSearchWrap">
        <span
          class="hotSearchWord"
          v-for="(item, index) in hotSearch"
          :key="index"
          @click="getMusicList(item.searchWord)"
          >{{ item.searchWord }}</span
        >
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
  margin: 5px auto ;
  padding: 10px;
  width: 1120px;
  border-radius: 10px;
  background: rgba(95, 158, 160, 0.322);
  box-sizing: border-box;

  .hotSearchWrap {
    margin: 10px auto;

    .hotSearchWord {
      display: inline-block;
      margin: 10px 25px;
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
    }
  }
}
.h2title {
  margin-top: 10px;
  text-align: left;
}
</style>