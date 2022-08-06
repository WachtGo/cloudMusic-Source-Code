<template>
  <!-- 主页 -->
  <div class="Home">
    <hotSearch></hotSearch>
    <RecPlaylist></RecPlaylist>
    <RecMvList></RecMvList>
    <!-- <div class="footerDiv"></div> -->
  </div>
</template>

<script>
import hotSearch from "./hotSearch.vue";
import RecPlaylist from "./RecPlaylist.vue";
import RecMvList from "./RecMvList.vue";
export default {
  name: "HomePage",
  components: {
    hotSearch,
    RecPlaylist,
    RecMvList,
  },
};
</script>

<style lang="less">
.Home {
  width: 100%;
  height: 740px;
  background: rgba(93, 150, 140, 0.11);
  box-sizing: border-box;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .Ocenter {
    width: 1100px;
    padding: 0 10px;
    margin: 5px auto;
    border-radius: 10px;
  }
  .h2title {
    padding: 0 40px;
  }
}
// .footerDiv {
//   height: 200px;
//   font-size: 15px;
//   text-align: center;
//   // line-height: 200px;
// }
</style>