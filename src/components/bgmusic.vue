<template>

  <div class="bgmusicWrap">
    <ul class="bgmusic-ul">
      <div>放松一下</div>
      <li v-for="(item,index) in bgmusicSrc"
          :key="item.src"
          :class="['bgmusic-li',item.fontColor]"
          @dblclick="reloadbgMusic(index)"
          @click="playbgMusic(index)">
        <audio class="bgmusicAudio"
               :src="item.src"
               @play="bgmusicPlayed"
               type="video/mp3"></audio>
        <span>{{item.name}}</span>
      </li>

    </ul>
  </div>

</template>

<script>
import { randomRange } from '@/utils/commonApi'
export default {
  data() {
    return {
      bgmusicSrc: [
        {
          name: '夏天的日子',
          src: require('../static/bgmusic/夏天的日子.mp3'),
          fontColor: 'fontColorgray',
        },
        {
          name: '带走我的心啊 把他藏在行囊',
          src: require('../static/bgmusic/带走我的心啊 把它藏在行囊.mp3'),
          fontColor: 'fontColorgray',
        },
      ],
      bgmusic: [],
    }
  },
  mounted() {
    this.bgmusic = document.querySelectorAll('.bgmusicAudio')
    // this.$nextTick(() => {
    //   this.autoplayBgmusic()
    // })
  },
  methods: {
    //背景音乐播放/暂停
    playbgMusic(idx) {
      this.bgmusic.forEach((item, index) => {
        if (item.paused && index === idx) {
          item.play()
        } else {
          item.pause()
        }
      })
      // this.bgmusic[index].play()
    },
    //背景音乐播放时触发
    bgmusicPlayed() {
      this.bgmusic.forEach((item, index) => {
        if (item.paused) {
          this.bgmusicSrc[index].fontColor = 'fontColorgray'
        } else {
          this.bgmusicSrc[index].fontColor = 'fontColorgreen'
        }
      })
    },
    //背景音乐重头播放
    reloadbgMusic(idx) {
      this.bgmusic.forEach((item, index) => {
        if (item.paused && index === idx) {
          item.load() //重新加载音频
          item.play() //播放
        } else {
          item.load() //重新加载
        }
      })
    },
    //网页加载时，自动播放背景音乐
    // autoplayBgmusic() {
    //   this.reloadbgMusic(randomRange(0, this.bgmusic.length))
    // },
  },
}
</script>

<style lang="less" scoped>
.bgmusicWrap {
  position: absolute;
  top: 0;
  right: 5px;
  width: 250px;
  color: #ccc;
  max-height: 20px;
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    max-height: 200px;
  }
  .bgmusic-ul {
    width: 100%;
    // height: 20px;
    // max-height: 20px;
    text-align: center;
    // overflow: hidden;
    // background: rgb(190, 190, 189);
    transition: 0.2s;
    // &:hover {
    //   max-height: 100%;
    // }

    .bgmusic-li {
      height: 20px;
      padding: 0 10px;
      border-radius: 10px;
      background: rgba(160, 160, 160, 0.096);
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