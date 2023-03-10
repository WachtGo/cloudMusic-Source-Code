<template>
  <!-- 主页 -->
  <div class="Home">
    <div class="tags">
      <span
        class="tags-select"
        v-for="(item, index) in homeTags.tags"
        :key="index"
        @click="tagsChange(item.page, true)"
        >{{ item.pageName }}</span
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import recommend from "./recommend/index";
import playlistCategary from "./categery/playlistCategary.vue";
import singerCategaryVue from "./categery/singerCategary.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "HomePage",
  components: {
    recommend,
    playlistCategary,
    singerCategaryVue,
  },
  data() {
    return {
      tags: [], //标签节点
    };
  },
  computed: {
    ...mapState("homePage", ["homeTags"]),
  },
  mounted() {
    this.tags = document.querySelectorAll(".tags-select");
    this.tagsChange(this.homeTags.routerPage); //首页重定向时，显示标签下划线
  },
  methods: {
    ...mapMutations("homePage", ["changehomeTAG"]),
    //切换标签
    tagsChange(page, goRouter) {
      //改变标签样式
      // let tags = document.querySelectorAll('.tags-select')
      this.tags.forEach((item, index) => {
        if (page === index) {
          item.classList.add("tags-select-click");
        } else {
          if (item.classList.contains("tags-select-click")) {
            item.classList.remove("tags-select-click");
          }
        }
      });
      if (goRouter) {
        //判断是否是通过点击进入对应页面，未进入到该处表示只是更换下划线
        if (page === 0) {
          this.$router.push({
            name: "recommend",
          });
        } else if (page === 1) {
          this.$router.push({
            name: "playlistCategary",
          });
        } else if (page === 2) {
          this.$router.push({
            name: "singerCategary",
          });
        }
        this.changehomeTAG(page);
      }
    },
  },
};
</script>

<style lang="less">
.Home {
  width: 100%;
  height: 785px;
  // background: rgba(93, 150, 140, 0.11);
  // background: rgba(39, 83, 75, 0.808);
  box-sizing: border-box;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .Ocenter {
    // width: 1120px;
    padding: 0 10px;
    margin: 5px auto;
    border-radius: 10px;
  }
  .h2title {
    padding: 0 40px;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 400px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    border-radius: 20px;
    // background: rgba(173, 169, 169, 0.377);

    .tags-select {
      display: inline-block;
      margin: 0 10px;
      transition: 0.2s;
      // border-bottom: 2px solid #eee;

      &:hover {
        cursor: pointer;
        // color: rgb(91, 187, 231);
        // transform: scale(1.05);
        font-size: 21px;
      }
    }
    //点击标签添加类名
    .tags-select-click {
      // color: rgb(91, 187, 231);
      border-bottom: 2px solid #eee;
      font-size: 21px;
    }
  }
}
</style>