<template>
  <div>
    <h3 class="h2title">热搜:</h3>
    <div class="hotSearch">
      <div class="hotSearchWrap">
        <div
          class="hotSearchWord"
          v-for="(item, index) in hotSearch"
          :key="index"
          @click="getMusicList(item.searchWord)"
        >
          <span>{{ item.searchWord }}</span
          ><img class="hot" v-if="item.iconType" :src="item.iconUrl" alt=" " />
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
      hotSearch: [
        {
          searchWord: "爱如火",
          iconType: 1,
          iconUrl:
            "https://p1.music.126.net/2zQ0d1ThZCX5Jtkvks9aOQ==/109951163968000522.png",
        },
        {
          searchWord: "乌梅子酱",
          iconType: 1,
          iconUrl:
            "https://p1.music.126.net/2zQ0d1ThZCX5Jtkvks9aOQ==/109951163968000522.png",
        },
        {
          searchWord: "我们的歌",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "DA CAPO",
          iconType: 1,
          iconUrl:
            "https://p1.music.126.net/2zQ0d1ThZCX5Jtkvks9aOQ==/109951163968000522.png",
        },
        {
          searchWord: "就让这大雨全都落下",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "谁",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "林俊杰",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "桃花诺",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "Love Fool",
          content: "电影《罗密欧与朱丽叶》主题曲",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "薛之谦",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "崩坏三",
          iconType: 5,
          iconUrl:
            "https://p1.music.126.net/PtgUJbcvDAY0HKWpmOB2HA==/109951163967988470.png",
        },
        {
          searchWord: "我记得",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "精卫",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "Capper",

          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "佤咖啡",
          score: 7331,

          iconType: 0,
          iconUrl: null,

          alg: "alg_search_rec_hotquery_base_hotquery",
        },
        {
          searchWord: "我的美丽",
          score: 6836,

          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "邓紫棋",

          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "进击的巨人",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "陈奕迅",
          iconType: 0,
          iconUrl: null,
        },
        {
          searchWord: "乌兰巴托的夜",
          iconType: 0,
          iconUrl: null,
        },
      ],
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
    // height: 120px;

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