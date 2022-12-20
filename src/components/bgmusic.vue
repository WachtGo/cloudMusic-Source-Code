<template>

  <div class="bgmusicWrap">
    <div>推荐音乐</div>
    <ul class="bgmusic-ul">
      <li
        v-for="(item,index) in bgmusicSrc"
        :key="item.src"
        :class="['bgmusic-li',item.fontColor]"
        @dblclick="reloadbgMusic(index)"
        @click="playbgMusic(index)"
      >
        <audio
          class="bgmusicAudio"
          :src="item.src"
          @play="bgmusicPlayed"
          type="video/mp3"
        ></audio>
        <span>{{item.name}}</span>
      </li>

    </ul>
  </div>

</template>

<script>
export default {
  data() {
    return {
      bgmusicSrc: [
        {
          name: "夏天的日子",
          src: "https://music.163.com/song/media/outer/url?id=1965308597.mp3",
          fontColor: "fontColorgray",
        },
        {
          name: "带走我的心啊 把他藏在行囊",
          src: "https://music.163.com/song/media/outer/url?id=1883088998.mp3",
          fontColor: "fontColorgray",
        },
        {
          name: "Childhood Memory",
          src: "https://music.163.com/song/media/outer/url?id=401767.mp3",
          fontColor: "fontColorgray",
        },
        {
          name: "Kiss The Rain",
          src: "https://music.163.com/song/media/outer/url?id=28411989.mp3",
          fontColor: "fontColorgray",
        },
        {
          name: "Sundial Dreams",
          src: "https://music.163.com/song/media/outer/url?id=5226753.mp3",
          fontColor: "fontColorgray",
        },
        {
          name: "Tears",
          src: "https://music.163.com/song/media/outer/url?id=5331915.mp3",
          fontColor: "fontColorgray",
        },
      ],
      bgmusic: [],
    };
  },
  mounted() {
    this.bgmusic = document.querySelectorAll(".bgmusicAudio");
    // this.$nextTick(() => {
    //   this.autoplayBgmusic()
    // })
  },
  methods: {
    //背景音乐播放/暂停
    playbgMusic(idx) {
      this.bgmusic.forEach((item, index) => {
        if (item.paused && index === idx) {
          item.play();
        } else {
          item.pause();
        }
      });
      // this.bgmusic[index].play()
    },
    //背景音乐播放时触发
    bgmusicPlayed() {
      this.bgmusic.forEach((item, index) => {
        if (item.paused) {
          this.bgmusicSrc[index].fontColor = "fontColorgray";
        } else {
          this.bgmusicSrc[index].fontColor = "fontColorgreen";
        }
      });
    },
    //背景音乐重头播放
    reloadbgMusic(idx) {
      this.bgmusic.forEach((item, index) => {
        if (item.paused && index === idx) {
          item.load(); //重新加载音频
          item.play(); //播放
        } else {
          item.load(); //重新加载
        }
      });
    },
  },
};
</script>

<style lang="less" >
.bgmusicWrap {
  position: absolute;
  top: 0;
  right: 5px;
  width: 250px;
  color: #ccc;
  text-align: center;
  max-height: 20px;
  overflow: hidden;
  transition: 0.3s;

  .bgmusic-ul {
    width: 100%;

    transition: 0.2s;
    max-height: 300px;
    background: url(@/img/background8.jpeg);
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .bgmusic-li {
      height: 30px;
      line-height: 30px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        color: rgb(29, 236, 167);
        transform: scale(1.01);
      }
    }
  }
}

.fontColorgreen {
  color: rgb(29, 236, 167);
}
.fontColorgray {
  color: #ccc;
}
</style>