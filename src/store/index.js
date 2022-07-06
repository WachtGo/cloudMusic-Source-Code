import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  // 歌曲生成周期
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],

  state: {
    //歌曲，视频，歌单，歌手等标签开关
    tagSwitch: {
      songSwitch: true,
      albumSwitch: false,
      singerSwitch: false,
      playListSwitch: false,
      videoSwitch: false,
      mvSwitch: false,
    },
    audio: [
      // {
      //   name: "这世界那么多人", //歌曲名
      //   artist: "莫文蔚", //作者
      //   url: "http://m801.music.126.net/20220507180637/9a30807211a23c8f25ec13f365eb5ed0/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096407591/ba3d/5a07/9eea/2f6a725e7b6519eb18818cd7bb640b7f.mp3",
      //   cover: "https://p2.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg",
      // }
    ],
    alplayShow:true
  },
  //mutations用于修改state
  //Async 异步
  mutations: {//将方法名改成大写，防止在其他组件中出现同名冲突（无法生效）
    //播放器添加歌曲
    addSONG(state, song) {
      for (let item of state.audio) {
        // if (item.url === song.url) {
        //   this._vm.$message('播放列表已存在这首歌');
        //   return
        // }
        if (item.artist === song.artist && item.name ===song.name) {
          this._vm.$message('播放列表已存在这首歌');
          return
        }
      }
      state.audio.push(song)//将歌曲添加
      this._vm.$message({
        type: 'success',
        message: '歌曲已添加到播放列表',
      });
    },
    //删除歌曲
    deleteMUSIC(state,index){
      state.audio.splice(index,1)
      this._vm.$message({
        type: 'success',
        message: '歌曲已从列表清除',
      });
    },
    //更换搜索项
    tagSelect(state, tag) {
      for (let key in state.tagSwitch) {
        if (key != tag) {
          state.tagSwitch[key] = false;
        }
      }
      state.tagSwitch[tag] = true;
      // console.log('state.tagSwitch----------------', state.tagSwitch)
    },
    
    // //刷新音频播放器
    // alplayReload(state,change){
    //   if(change){
    //      state.alplayShow = false
    //   setTimeout(()=>{
    //     state.alplayShow = true
    //   },1000)
    //   }
    // }

  },
  //actions专门用来做异步处理
  actions: {

  }
})