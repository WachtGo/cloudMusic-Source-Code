<template>
  <!-- 顶部栏 -->
  <div>
    <header class="head">
      <!-- 用于拖拽，防止点击到其他元素时也触发 -->
      <div class="drag" v-drag></div>
      <!-- 首页 -->
      <div class="left cl" @click="goHome">
        <div class="homeButton"><i class="el-icon-s-home"></i></div>
      </div>
      <!-- 搜索框 -->
      <div class="center cl">
        <div class="search">
          <div class="search-input">
            <input
              id="searchInput"
              @focus="switchChange"
              @blur="searchSwitch = false"
              @keyup.enter="enterSearch"
              type="text"
              :placeholder="placeholder"
              v-model="searchTerms"
            />
          </div>
        </div>
      </div>
      <!-- 返回 -刷新-->
      <div class="right cl">
        <div class="rightWrap">
          <div class="goBack" @click="goBack(-1)">
            <i class="el-icon-back"></i>
          </div>
          <div class="goBack" @click="refreshPage()">
            <i class="el-icon-refresh"></i>
          </div>
          <div class="goBack" @click="goBack(1)">
            <i class="el-icon-right"></i>
          </div>
        </div>
      </div>
    </header>

    <!-- 搜索显示的搜索项列表 -->
    <!-- @scroll="searchScroll" 搜索懒加载-->
    <div id="search-box" v-show="searchSwitch">
      <!-- searchSwitch -->
      <div class="search-box-wrap">
        <div class="suggest-title">单曲</div>
        <ul class="suggest-ul">
          <li
            class="suggest-list"
            v-for="(item, index) in musicList.songs"
            :key="index"
            @mousedown="selectMusic(item.name, item.artists[0].name)"
          >
            <span class="suggest-list-music" style="width: 310px">{{
              item.name
            }}</span>
            <span class="suggest-list-music" style="width: 180px">{{
              item.artists[0].name
            }}</span>
          </li>
        </ul>
      </div>
      <div class="search-box-wrap">
        <div class="suggest-title">歌手</div>
        <ul class="suggest-ul">
          <li
            class="suggest-list"
            v-for="(item, index) in musicList.artists"
            :key="index"
            @mousedown="selectArtist(item)"
          >
            <span class="suggest-list-music" style="width: 310px"
              ><img
                :src="item.img1v1Url"
                alt=""
                style="width: 28px; height: 28px; border-radius: 50%"
            /></span>
            <span class="suggest-list-music" style="width: 180px">{{
              item.name
            }}</span>
          </li>
        </ul>
      </div>
      <div class="search-box-wrap">
        <div class="suggest-title">专辑</div>
        <ul class="suggest-ul">
          <li
            class="suggest-list"
            v-for="(item, index) in musicList.albums"
            :key="index"
            @mousedown="selectAlbum(item.id)"
          >
            <span class="suggest-list-music" style="width: 310px">{{
              item.name
            }}</span>
            <span class="suggest-list-music" style="width: 180px">{{
              item.artist.name
            }}</span>
          </li>
        </ul>
      </div>

      <div class="loading" v-if="reloadShow">
        <i class="el-icon-loading"></i>
      </div>
    </div>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { getSearchDefault, getSearchSuggest } from "@/api/api";
import { deepFreeze } from "@/utils/commonApi";
export default {
  data() {
    return {
      searchSwitch: false, //搜索窗口开关
      searchTerms: "", //输入框内容
      placeholder: "",
      musicList: {}, //搜索列表
      inputTimer: null, //搜索节流
      reloadShow: null, //是否在请求数据
      // page: 1, //搜索列表页数
      // limit: 30, //搜索每次请求的数
      // count: 15, //最后一次搜索请求的数量，用于判断是否全部加载完毕
    };
  },
  directives: {
    drag(el, binding) {
      // console.log(el)
      // let dragBox = el.parentElement.parentElement; //获取app元素
      let dragBox = document.getElementById("app");
      // 鼠标事件
      el.onmousedown = (e) => {
        //鼠标点击时鼠标的的位置
        // console.log(e)
        // console.log(el.parentElement)
        let downX = e.clientX;
        let downY = e.clientY;
        //元素位置
        let left = dragBox.offsetLeft;
        let top = dragBox.offsetTop;
        // console.log(e.clientX,e.clientY)
        // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
        document.onmousemove = (e) => {
          //鼠标移动的距离
          let moveX = e.clientX - downX;
          let moveY = e.clientY - downY;
          // console.log('鼠标移动:',moveX,moveY)

          //移动当前元素
          dragBox.style.left = left + moveX + "px";
          dragBox.style.top = top + moveY + "px";
        };
        document.onmouseup = (e) => {
          //鼠标弹起来的时候不再移动
          document.onmousemove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
        };
      };
      //手指触屏事件
      el.touchstart = (e) => {
        //鼠标点击时鼠标的的位置
        // console.log(e)
        // console.log(el.parentElement)
        let downX = e.clientX;
        let downY = e.clientY;
        //元素位置
        let left = dragBox.offsetLeft;
        let top = dragBox.offsetTop;
        // console.log(e.clientX,e.clientY)
        // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
        document.touchmove = (e) => {
          //鼠标移动的距离
          let moveX = e.clientX - downX;
          let moveY = e.clientY - downY;
          // console.log('鼠标移动:',moveX,moveY)

          //移动当前元素
          dragBox.style.left = left + moveX + "px";
          dragBox.style.top = top + moveY + "px";
        };
        document.touchend = (e) => {
          //鼠标弹起来的时候不再移动
          document.touchmove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.touchend = null;
        };
      };
    },
  },
  watch: {
    searchTerms: function () {
      this.search();
    },
  },
  mounted() {
    this.getSearchDefault();
  },
  methods: {
    goBack(val) {
      this.$router.go(val);
    },
    refreshPage() {
      location.reload();
    },
    goHome() {
      this.$router.push({ name: "HomePage" });
    },
    switchChange() {
      //显示搜索列表
      this.searchSwitch = true;
      if (!this.searchTerms.trim()) {
        this.getSearchSuggest(this.placeholder);
      }
    },

    selectMusic(keywords, artist) {
      this.placeholder = `${keywords}      ${artist}`;
      // console.log(this.placeholder, "---placeholde");
      this.searchTerms = "";
      //选择歌曲进入列表
      this.$router.push({
        name: "emptyPage",
        query: { keywords: keywords, reload: true },
      });
      this.searchSwitch = false;
    },
    selectArtist(singerDetail) {
      let params = {
        id: singerDetail.id,
        img1v1Url: singerDetail.img1v1Url,
        name: singerDetail.name,
        alias: singerDetail.alias,
        musicSize: null,
        albumSize: singerDetail.albumSize,
        mvSize: null,
        briefDesc: "",
      };
      this.$router.push({
        name: "singerDetail",
        params: {
          artist: params,
        },
      });
    },
    selectAlbum(id) {
      this.$router.push({
        name: "albumDetail",
        params: {
          albumId: id,
        },
      });
    },
    enterSearch() {
      if (!this.searchTerms.trim()) {
        this.$router.push({
          name: "emptyPage",
          query: { keywords: this.placeholder, reload: true },
        });
        this.searchTerms = this.placeholder;
      } else {
        this.$router.push({
          name: "emptyPage",
          query: { keywords: this.searchTerms, reload: true },
        });
      }
      this.searchSwitch = false;
    },
    search() {
      //搜索列表
      if (this.searchTerms.trim) {
        if (this.inputTimer) {
          clearTimeout(this.inputTimer);
        }
        this.inputTimer = setTimeout(() => {
          this.musicList = {};
          // this.page = 1;
          this.getSearchSuggest(this.searchTerms);
          clearTimeout(this.inputTimer);
        }, 500);
      }
    },

    //搜索懒加载
    // searchScroll() {
    //   //获取现在滚动高度
    //   let scrollTop = document.getElementById("search-box").scrollTop;
    //   // console.log('滚动高度----:',scrollTop)
    //   // 获取可视区域高度
    //   let clientHeight = document.getElementById("search-box").clientHeight;
    //   // 获取文档总高度
    //   let scrollHeight = document.getElementById("search-box").scrollHeight;
    //   // 滚动到底部
    //   if (scrollTop + clientHeight === scrollHeight) {
    //     // console.log('到底部了');
    //     // console.log(this.reloadShow,this.count)
    //     if (this.reloadShow || this.limit > this.count) return;
    //     this.page += 1;
    //     this.getSearchSuggest(this.searchTerms);
    //   }
    // },
    //搜索
    getSearchSuggest(searchTerms) {
      this.reloadShow = true;
      //获取歌曲列表
      let params = {
        keywords: searchTerms,
        // type: "",
      };
      getSearchSuggest(params).then(async (res) => {
        console.log("搜索建议", res.data.result);
        this.musicList = res.data.result;
        this.reloadShow = false; //加载的开关
      });
    },
    getSearchDefault() {
      //默认搜索关键字
      getSearchDefault().then(async (res) => {
        this.placeholder = res.data.data.realkeyword;
        // console.log("搜索关键字：", res.data.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-between;

  height: 50px;
  // line-height: 50px;
  background: rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  .cl {
    height: 30px;
    position: absolute;
    // height: 100%;

    .rightWrap {
      display: flex;
      align-content: center;
      justify-content: center;
      height: 30px;
      line-height: 30px;
      transition: 0.2s;

      .goBack {
        width: 35px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: bolder;
        text-align: center;
        transition: 0.2s;

        &:hover {
          color: rgb(32, 147, 192);
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
  .left,
  .right {
    margin: 10px 0;
  }
  .left {
    flex: 1;
    left: 0;
    margin-left: 50px;
  }
  .right {
    flex: 1;
    right: 0;
    margin-right: 50px;
  }

  .center {
    width: 300px;
    height: 30px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .homeButton {
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      color: rgb(95, 205, 248);
    }
  }
  .search-input {
    width: 100%;
    height: 100%;
    // display: inline-block;

    input {
      font-size: 16px;
      width: 100%;
      height: 30px;
      font-family: 三极行楷;
      // font-weight: bolder;
      border-style: none;
      border-radius: 10px;
      text-align: center;
      text-overflow: ellipsis;
      color: rgb(255, 255, 255);
      background: rgba(216, 216, 216, 0.11);

      // ::selection {
      //   background-color: lightblue !important;
      //   // text-shadow: none;
      // }
      &:focus {
        outline: none;
      }
    }

    ::-webkit-input-placeholder {
      font-size: 16px;
      color: rgba(253, 253, 253, 0.61);
    }
  }
}

#search-box {
  z-index: 100;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 600px;
  height: 300px;
  border-radius: 0 0 20px 20px;
  background: url(@/static/img/background8.jpeg); //-------------需要与主题更改
  overflow-x: hidden;

  cursor: default;

  &::-webkit-scrollbar {
    display: none;
  }
  .search-box-wrap {
    display: flex;
    .suggest-title {
      padding: 8px 0;
      text-indent: 1.5em;
      flex: 1;
    }
    .suggest-ul {
      flex: 4;
      .suggest-list {
        margin: 5px 10px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        border-radius: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bolder;
        transition: 0.2s;
        // border-bottom: 2px solid rgba(255, 255, 255, 0.445);

        &:hover {
          cursor: pointer;
          transform: scale(1.02);
          // color: rgb(94, 211, 211);
          background: rgba(250, 250, 250, 0.062);
        }

        .suggest-list-music {
          display: inline-block;
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>