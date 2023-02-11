<template>
  <!-- 顶部栏 -->
  <div>
    <div v-drag>
      <header class="head">
        <!-- 首页 -->
        <div class="cl">
          <h3 @click="goHome" goHome>首页</h3>
        </div>
        <!-- 搜索框 -->
        <div class="center cl">
          <div class="search">
            <div class="search-input">
              <input id="searchInput" @focus="switchChange" @blur="searchSwitch = false" @keyup.enter="enterSearch"
                type="text" :placeholder="placeholder" v-model="searchTerms" />
            </div>
          </div>
        </div>
        <!-- 返回 -->
        <div class="cl">
          <div class="gobackWrap">
            <div class="goBack" @click="goBack(-1)">&lt;</div>
            &nbsp;
            <div class="goBack" @click="goBack(1)">&gt;</div>
          </div>
        </div>
      </header>
    </div>

    <!-- 搜索显示的搜索项列表 -->
    <ul id="search-box" v-show="searchSwitch" @scroll="searchScroll">
      
      <!-- searchSwitch -->
      <li class="suggest-list" v-for="(item, index) in musicList" :key="index"
        @mousedown="selectMusic(item.name, item.ar[0].name)">
        <span class="suggest-list-music" style="width: 310px">{{
          item.name
        }}</span>
        <span class="suggest-list-music" style="width: 180px">{{
          item.ar[0].name
        }}</span>
        <span class="suggest-list-music" style="width: 50px">{{
          item.dt
        }}</span>
      </li>
      <h3 style="text-align: center" v-if="reloadShow">
        <i class="el-icon-loading"></i>
      </h3>
    </ul>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { getSearchDefault, getMusicInfo } from "@/api/api";
export default {
  data() {
    return {
      searchSwitch: false,//搜索窗口开关
      searchTerms: "",//输入框内容
      placeholder: "",
      musicList: [],//搜索列表
      inputTimer: null,//搜索节流
      reloadShow:null,//是否在请求数据
      page: 1,//搜索列表页数
      limit: 30,//搜索每次请求的数
      count:15,//最后一次搜索请求的数量，用于判断是否全部加载完毕
    };
  },
  directives: {
    drag(el) {
      // let dragBox = el.parentElement.parentElement; //获取app元素
      let dragBox = document.getElementById("app");
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
    goHome() {
      this.$router.push({ name: "HomePage" });
    },
    switchChange() {
      //显示搜索列表
      this.searchSwitch = true;
      if (!this.searchTerms.trim()) {
        this.getMusicInfo(this.placeholder);
      }
    },

    selectMusic(keywords, artist) {
      this.placeholder = `${keywords}      ${artist}`;
      // console.log(this.placeholder, "---placeholde");
      this.searchTerms = "";
      //选择歌曲进入列表
      this.$router.push({
        name: "emptyPage",
        query: { keywords: this.keywords, reload: true },
      });
      this.searchSwitch = false;
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
          this.musicList = [];
          this.page = 1;
          this.getMusicInfo(this.searchTerms);
          clearTimeout(this.inputTimer);
        }, 500);
      }
    },

    //搜索懒加载
    searchScroll() {
      //获取现在滚动高度
      let scrollTop = document.getElementById('search-box').scrollTop
      // console.log('滚动高度----:',scrollTop)
      // 获取可视区域高度
      let clientHeight = document.getElementById('search-box').clientHeight;
      // 获取文档总高度
      let scrollHeight = document.getElementById('search-box').scrollHeight;
      // 滚动到底部
      if (scrollTop + clientHeight === scrollHeight) {
        // console.log('到底部了');
        // console.log(this.reloadShow,this.count)
        if(this.reloadShow || this.limit>this.count) return
        this.page += 1
        this.getMusicInfo(this.searchTerms);
      }
    },
    //搜索
   async getMusicInfo(searchTerms) {
    this.reloadShow = true
      //获取歌曲列表
      let params = {
        keywords: searchTerms,
        limit: this.limit,
        offset: this.limit * this.page,
        type: "",
      };
     await getMusicInfo(params).then((res) => {
        // console.log(res)
        let listBox = res.data.result.songs;
        this.count = res.data.result.songCount;
        // this.count = res.data.result.songs.length;

        //将歌曲时长转换成分秒格式
        for (let i = 0; i < listBox.length; i++) {
          let min = parseInt(listBox[i].dt / 1000 / 60);
          let sec = parseInt((listBox[i].dt / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          listBox[i].dt = min + ":" + sec;
          // console.log(this.musicList[i].song.duration)
        }
        this.musicList = this.musicList.concat(listBox)
        this.reloadShow = false
        // console.log("音乐列表：", res.data.result.songs);
      });
      
    },
    getSearchDefault() {
      //默认搜索关键字
      getSearchDefault().then((res) => {
        this.placeholder = res.data.data.realkeyword;
        // console.log("搜索关键字：", res.data.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 10px 50px;
  height: 100%;
  // line-height: 50px;
  background: rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  .cl {
    height: 100%;

    h3 {
      height: 30px;
      line-height: 30px;
      transition: 0.2s;

      &:hover {
        cursor: pointer;
        color: rgb(95, 205, 248);
      }
    }

    .gobackWrap {
      display: flex;
      align-content: center;
      justify-content: center;
      height: 30px;
      line-height: 30px;
      transition: 0.2s;

      .goBack {
        width: 30px;
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

  .search {
    height: 30px;

    h3 {
      display: inline-block;
    }

    .search-input {
      height: 100%;
      display: inline-block;

      input {
        padding: 0 10px;
        font-size: 16px;
        width: 300px;
        height: 30px;
        font-family: 三极行楷;
        // font-weight: bolder;
        border-style: none;
        border-radius: 10px;
        text-align: center;
        text-overflow: ellipsis;
        color: rgb(255, 255, 255);
        background: rgba(216, 216, 216, 0.11);

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
</style>