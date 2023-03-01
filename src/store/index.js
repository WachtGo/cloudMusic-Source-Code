import Vue from "vue";
import Vuex from "vuex";
import aplayer from "./aplayer";
import homePage from "./homePage";
import musicPlayList from "./musicPlayList";
import login from "./login"
import createPersistedState from "vuex-persistedstate";//状态持久化，将vuex资源保存在localStorage中
// import {getToken,setToken,removeToken} from "@/utils/auth"
// import {getStorage, setStorage,removeStorage} from "@/utils/storage"
Vue.use(Vuex);
export default new Vuex.Store({
  // 歌曲生成周期
  plugins: [
    createPersistedState({
      // 默认值vuex
      // key: 'userState',
      // 缓存的介质localStorage、sessionStorage
      storage: window.localStorage,
      // storage: window.sessionStorage,
      // 白名单 要缓存的数据，刷新不会丢失，重新打开也不会丢失
      // whiteList: ['loginState'],
      // 黑名单 不缓存的数据，刷新丢失
      // blackList: [],
    }),
  ],
  modules: {
    aplayer,
    homePage,
    musicPlayList,
    login
  },

});

// export default new Vuex.Store({
// state: {
//   // 获取token
//   // token:getToken(),
//   //获取本地token
//   // token_storage:getStorage(),
// },
// //mutations用于修改state
// //Async 异步
// mutations: {//将方法名改成大写，防止在其他组件中出现同名冲突（无法生效）

//   //将token保存在本地存储
//   // setSTORAGE(state,tokenName,tokenContent){
//   //   setStorage(tokenName,tokenContent)
//   // }
//   // ,
//   // //保存token
//   // setTOKEN(state,token){
//   //   setToken(token)
//   //   this._vm.$message({
//   //     type: 'success',
//   //     message: 'cookie设置成功',
//   //   });
//   // },
//   // removeTOKEN(state){
//   //   state.token = null
//   //   removeToken()
//   //   this._vm.$message({
//   //     type: 'success',
//   //     message: '成功退出登录',
//   //   });
//   // },
//   //播放器添加歌曲

//   // //刷新音频播放器
//   // alplayReload(state,change){
//   //   if(change){
//   //      state.alplayShow = false
//   //   setTimeout(()=>{
//   //     state.alplayShow = true
//   //   },1000)
//   //   }
//   // }

// },
// //actions专门用来做异步处理
// actions: {

// }
// })
