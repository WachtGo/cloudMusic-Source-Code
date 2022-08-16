import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
// import {getToken,setToken,removeToken} from "@/utils/auth"
// import {getStorage, setStorage,removeStorage} from "@/utils/storage"
Vue.use(Vuex)

export default new Vuex.Store({
  // 歌曲生成周期
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],

  state: {
    // 获取token
    // token:getToken(),
    //获取本地token
    // token_storage:getStorage(),
    //歌曲，视频，歌单，歌手等标签开关
    tagSwitch: {
      songSwitch: true,
      albumSwitch: false,
      singerSwitch: false,
      playListSwitch: false,
      videoSwitch: false,
      mvSwitch: false,
    },
    audio: [],//播放列表音乐
    audition:[],//试听歌曲
    musicAudioStatu:0,//控制audio,audition两个播放器显示
    alplayShow:true
  },
  //mutations用于修改state
  //Async 异步
  mutations: {//将方法名改成大写，防止在其他组件中出现同名冲突（无法生效）

    //将token保存在本地存储
    // setSTORAGE(state,tokenName,tokenContent){
    //   setStorage(tokenName,tokenContent)
    // }
    // ,
    // //保存token
    // setTOKEN(state,token){
    //   setToken(token)
    //   this._vm.$message({
    //     type: 'success',
    //     message: 'cookie设置成功',
    //   });
    // },
    // removeTOKEN(state){
    //   state.token = null
    //   removeToken()
    //   this._vm.$message({
    //     type: 'success',
    //     message: '成功退出登录',
    //   });
    // },
    //播放器添加歌曲
    addSONG(state, song) {
      for (let item of state.audio) {
        // if (item.url === song.url) {
        //   this._vm.$message('播放列表已存在这首歌');
        //   return
        // }
        if (item.id === song.id) {
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
    deleteMUSIC(state,index) {
      state.audio.splice(index,1)
      this._vm.$message({
        type: 'success',
        message: '歌曲已移出播放列表',
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
    addAUDITION(state,song) {
      for (let item of state.audition) {
        if (item.id === song.id) {
          this._vm.$message('正在试听这首歌');
          return
        }
      }
      state.musicAudioStatu = 1
      state.audition.splice(0,1)
      state.audition[0] = song//将歌曲添加
      this._vm.$message({
        type: 'success',
        message: '歌曲已添加到试听',
      });
    },
    deleteAUDITION(state,index) {
      state.audition.splice(index,1)
      this._vm.$message({
        type: 'success',
        message: '歌曲已移出试听列表',
      });
    },
    //更换播放器
    changeAPLAYER(state,statu) {
      statu === 1 ? state.musicAudioStatu = 1 : state.musicAudioStatu = 0
    }
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