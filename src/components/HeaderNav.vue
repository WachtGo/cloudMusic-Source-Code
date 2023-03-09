<template>
  <!-- 顶部栏 -->
  <div>
    <header class="head">
      <!-- 用于拖拽，防止点击到其他元素时也触发 -->
      <!-- <div class="drag" v-drag></div> -->
      <!-- <div class="drag" v-drag></div> -->
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
              @blur="stopSearch"
              @keyup.enter="enterSearch('searchTerms')"
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
    <div id="search-box" v-show="searchSwitch">
      <!-- 搜索不到相关单曲，歌手，专辑，歌单 -->
      <div class="correla" v-if="!reloadShow && searchCorrela.trim() !== ''">
        <div class="search-correla" @mousedown="enterSearch('searchCorrela')">
          搜索 “<span class="search-correla-keyword"
            >&nbsp;{{ searchCorrela }}&nbsp;</span
          >” 相关内容
        </div>
      </div>
      <!-- 没有搜索结果并且搜索框内容为空 -->
      <div
        v-if="
          !reloadShow &&
          searchTerms.trim() === '' &&
          Object.keys(musicList).length === 0
        "
        style="text-align: center"
      >
        没有您想要的搜索结果
      </div>
      <!-- searchSwitch -->
      <div v-if="!reloadShow && Object.keys(musicList).length !== 0">
        <div class="search-box-wrap">
          <div class="suggest-title">单曲</div>
          <ul class="suggest-ul">
            <li
              class="suggest-list"
              v-for="(item, index) in musicList.songs"
              :key="index"
              @mousedown="goSongDetails(item.id)"
            >
              <span class="suggest-list-music" style="width: 310px">
                {{ item.name }}
              </span>
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
              <div class="suggest-list-music" style="width: 310px">
                <span>{{ item.name }}</span>
                <span style="color: #c4fffa">[{{ item.size }}首]</span>
              </div>
              <span class="suggest-list-music" style="width: 180px">{{
                item.artist.name
              }}</span>
            </li>
          </ul>
        </div>
        <div class="search-box-wrap">
          <div class="suggest-title">歌单</div>
          <ul class="suggest-ul">
            <li
              class="suggest-list"
              v-for="(item, index) in musicList.playlists"
              :key="index"
              @mousedown="goSongList(item)"
            >
              <div class="suggest-list-music" style="width: 490px">
                <span>{{ item.name }}</span>
                <span style="color: #c4fffa">[{{ item.trackCount }}首]</span>
              </div>
            </li>
          </ul>
        </div>
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
      searchCorrela: "",
      placeholder: "",
      musicList: {}, //搜索列表
      inputTimer: null, //搜索节流
      reloadShow: true, //是否在请求数据
      // page: 1, //搜索列表页数
      // limit: 30, //搜索每次请求的数
      // count: 15, //最后一次搜索请求的数量，用于判断是否全部加载完毕
    };
  },
  directives: {
    // drag(el, binding) {
    //   // console.log(el)
    //   // let dragBox = el.parentElement.parentElement; //获取app元素
    //   let dragBox = document.getElementById("app");
    //   // 鼠标事件
    //   el.onmousedown = (e) => {
    //     //鼠标点击时鼠标的的位置
    //     // console.log(e)
    //     // console.log(el.parentElement)
    //     let downX = e.clientX;
    //     let downY = e.clientY;
    //     //元素位置
    //     let left = dragBox.offsetLeft;
    //     let top = dragBox.offsetTop;
    //     // console.log(e.clientX,e.clientY)
    //     // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
    //     document.onmousemove = (e) => {
    //       //鼠标移动的距离
    //       let moveX = e.clientX - downX;
    //       let moveY = e.clientY - downY;
    //       // console.log('鼠标移动:',moveX,moveY)
    //       //移动当前元素
    //       dragBox.style.left = left + moveX + "px";
    //       dragBox.style.top = top + moveY + "px";
    //     };
    //     document.onmouseup = (e) => {
    //       //鼠标弹起来的时候不再移动
    //       document.onmousemove = null;
    //       //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
    //       document.onmouseup = null;
    //     };
    //   };
    //   //手指触屏事件
    //   el.ontouchstart = (e) => {
    //     //鼠标点击时鼠标的的位置
    //     // console.log(e)
    //     // console.log(el.parentElement)
    //     let downX = e.clientX;
    //     let downY = e.clientY;
    //     //元素位置
    //     let left = dragBox.offsetLeft;
    //     let top = dragBox.offsetTop;
    //     // console.log(e.clientX,e.clientY)
    //     // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
    //     document.ontouchmove = (e) => {
    //       //鼠标移动的距离
    //       let moveX = e.clientX - downX;
    //       let moveY = e.clientY - downY;
    //       // console.log('鼠标移动:',moveX,moveY)
    //       //移动当前元素
    //       dragBox.style.left = left + moveX + "px";
    //       dragBox.style.top = top + moveY + "px";
    //     };
    //     document.ontouchend = (e) => {
    //       //鼠标弹起来的时候不再移动
    //       document.touchmove = null;
    //       //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
    //       document.touchend = null;
    //     };
    //   };
    // },
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
      if (this.searchTerms.trim()) {
        this.getSearchSuggest(this.searchTerms);
      } else {
        this.getSearchSuggest(this.placeholder);
      }
    },
    stopSearch() {
      this.searchSwitch = false;
      clearTimeout(this.inputTimer);
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

    //进入歌曲详情
    goSongDetails(id) {
      //路由配置
      let routerInfo = {
        name: "songDetails",
        params: {
          id: id,
        },
      };
      this.$router.push({
        name: "emptyPage",
        params: routerInfo,
      });
    },
    //进入歌手详情
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
      //路由配置
      let routerInfo = {
        name: "singerDetail",
        params: {
          artist: params,
        },
      };
      this.$router.push({
        name: "emptyPage",
        params: routerInfo,
      });
    },
    // 进入专辑详情
    selectAlbum(id) {
      //路由配置发送给空页面
      let routerInfo = {
        name: "albumDetail",
        params: {
          albumId: id,
        },
      };
      this.$router.push({
        name: "emptyPage",
        params: routerInfo,
      });
    },
    //进入歌单详情
    goSongList(playListDetail) {
      // console.log(playListDetail);
      let params = {
        id: playListDetail.id,
        name: playListDetail.name,
        coverImgUrl: playListDetail.coverImgUrl,
        trackCount: playListDetail.trackCount,
        creator: {
          avatarUrl: "",
          nickname: "",
          signature: "",
        },
        tags: [],
        description: playListDetail.description,
      };
      //传入歌单id进入歌单详情
      let routerInfo = {
        name: "playListDetails",
        params: { playListDetail: params },
      };
      this.$router.push({
        name: "emptyPage",
        params: routerInfo,
      });
    },
    //搜索进入搜索结果页面
    enterSearch(searchwords) {
      this.searchSwitch = false;
      let keywords = "";
      //按照搜索框内容进行搜索
      if (searchwords == "searchTerms") {
        if (!this.searchTerms.trim()) {
          //搜索框为空时，搜索内容值为placeholder
          this.searchTerms = this.placeholder;
        }
        keywords = this.searchTerms;
      } else if (searchwords == "searchCorrela") {
        //按照 搜索相关词 进行搜索
        keywords = this.searchCorrela;
      }

      let routerInfo = {
        //路由配置发送给空页面
        name: "MusicPlayList",
        query: { keywords: keywords, reload: true },
      };
      this.$router.push({
        name: "emptyPage",
        params: routerInfo,
      });
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
    //搜索
    getSearchSuggest(keywords) {
      this.reloadShow = true;
      this.searchCorrela = keywords;
      //获取歌曲列表
      let params = {
        keywords: keywords,
        // type: "",
      };
      getSearchSuggest(params).then(async (res) => {
        if (res.data.code == 200) {
          // console.log("搜索建议", res.data.result);
          this.musicList = res.data.result;
        } else {
          this.musicList = {};
        }
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
      // font-family: 三极行楷;
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
  .correla {
    display: flex;
    justify-content: center;
    .search-correla {
      color: #d1cece;
      text-align: center;
      transition: 0.2s;
      .search-correla-keyword {
        color: rgb(173, 248, 223);
        transition: 0.2s;
        &:hover {
          color: rgb(134, 207, 184);
        }
      }
      &:hover {
        color: #afafaf;
        cursor: pointer;
      }
    }
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