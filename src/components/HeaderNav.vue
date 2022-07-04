<template>
  <!-- 顶部栏 -->
  <div >
    <div v-drag>
     <header class="head">
      <!-- 首页 -->
      <div class="cl">
        <router-link to="HomePage"><h3>首页</h3></router-link>
      </div>
      <!-- 搜索框 -->
      <div class="center cl">
        <div class="search">
          <div class="search-input">
            <input
              @focus="switchChange"
              @blur="switchNone"
              @keyup.enter="enterSearch"
              type="text"
              :placeholder="placeholder"
              v-model="searchTerms"
            />
          </div>
        </div>
      </div>
      <!-- 返回 -->
      <div class="cl" @click="back()"><h3>返回</h3></div>
      </header>
    </div>
   
    <!-- 搜索显示的搜索项列表 -->
    <ul class="search-box" v-show="searchSwitch">
      <!-- searchSwitch -->
      <li
        class="suggest-list"
        v-for="(item, index) in musicList"
        :key="index"
        @click="selectMusic(item.name, item.ar[0].name)"
      >
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
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import { getSearchDefault, getMusicInfo } from "@/api/api";
export default {
  data() {
    return {
      searchSwitch: false,
      searchTerms: "",
      placeholder: "",
      musicList: [],
      inputTimer: null,
    };
  },
  directives: {
            drag(el){ 
              // let dragBox = el.parentElement.parentElement; //获取app元素 
              let dragBox = document.getElementById('app')
              el.onmousedown = e => {
              //鼠标点击时鼠标的的位置
              // console.log(e)
              // console.log(el.parentElement)
              let downX = e.clientX
              let downY = e.clientY
              //元素位置
              let left = dragBox.offsetLeft
              let top = dragBox.offsetTop
              // console.log(e.clientX,e.clientY)
              // console.log('app位置：',dragBox.offsetLeft,dragBox.offsetTop)
              document.onmousemove = e => {
                  //鼠标移动的距离
                  let moveX = e.clientX - downX ;
                  let moveY = e.clientY - downY;
                  // console.log('鼠标移动:',moveX,moveY)
                  
                  //移动当前元素
                  dragBox.style.left  = left + moveX +'px' ;
                  dragBox.style.top = top + moveY + 'px';
              };
              document.onmouseup = e => {
                    //鼠标弹起来的时候不再移动
                    document.onmousemove = null;
                   //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                  document.onmouseup = null;
                };
              };
            }
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
    back() {
      this.$router.back();
    },
    switchNone() {
      //搜索框失去焦点时消失
      setTimeout(() => {
        this.searchSwitch = false;
      }, 100);
    },
    switchChange() {
      //显示搜索列表
      this.searchSwitch = true;
      if (!this.searchTerms.trim()) {
        this.getMusicInfo(this.placeholder);
      }
    },
    selectMusic(keywords, artist) {
      this.placeholder = `${keywords}   -   ${artist}`;
      this.searchTerms = "";
      //选择歌曲进入列表
      this.$router.push({
        name: "emptyPage",
        query: { keywords: keywords, reload: true },
      });
      this.searchSwitch = true;
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
          this.getMusicInfo(this.searchTerms);
          clearTimeout(this.inputTimer);
        }, 500);
      }
    },
    getMusicInfo(searchTerms) {
      //获取歌曲列表
      let params = {
        keywords: searchTerms,
        limit: 50,
        offset: "",
        type: "",
      };
      getMusicInfo(params).then((res) => {
        this.musicList = [];
        this.musicList = res.data.result.songs;
        this.count = res.data.result.songCount;
        //将歌曲时长转换成分秒格式
        for (let i = 0; i < this.musicList.length; i++) {
          let min = parseInt(this.musicList[i].dt / 1000 / 60);
          let sec = parseInt((this.musicList[i].dt / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.musicList[i].dt = min + ":" + sec;
          // console.log(this.musicList[i].song.duration)
        }
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
  justify-content: space-between;
  padding: 10px 50px;
  height: 100%;
  // line-height: 50px;
  background: rgba(95, 158, 160, 0.322);
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
        font-weight: bolder;
        border-style: none;
        border-radius: 10px;
        text-align: center;
        text-overflow: ellipsis;
        color: rgb(255, 255, 255);
        background: rgba(253, 253, 253, 0.11);

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
.search-box {
  z-index: 100;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 600px;
  max-height: 300px;
  border-radius: 0 0 20px 20px;
  background: rgb(135, 192, 184);
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
      color: aqua;
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