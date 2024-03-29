import Vue from "vue";
import Vuex from "vuex";
import aplayer from "./aplayer";
import homePage from "./homePage";
import musicPlayList from "./musicPlayList";
import login from "./login"
import createPersistedState from "vuex-persistedstate";//状态持久化，将vuex资源保存在localStorage中
import { getToken, setToken, removeToken } from "@/utils/token"
import { getStorage, setStorage, removeStorage } from "@/utils/storage"
Vue.use(Vuex);
export default new Vuex.Store({
  // 歌曲生成周期
  plugins: [
    createPersistedState({
      key: 'userState', // 默认值vuex
      storage: window.localStorage,  // 缓存的介质localStorage、sessionStorage
      // storage: window.sessionStorage,
      whiteList: ['token', 'user'],  // 白名单 要缓存的数据，刷新不会丢失，重新打开也不会丢失
      // blackList: [], // 黑名单 不缓存的数据，刷新丢失
    }),
  ],
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setTOKEN(state, value) { //登录后设置token
      state.token = value
      setToken(value)
    },
    removeTOKEN(state) {
      removeToken()
      state.token = null
      state.user = null
    },
    setUSER(state, user) {//登录后将用户信息存在vuex
      state.user = user
    },
    setSTORAGE(state, obj) {//设置本地存储
      setStorage(obj.name, obj.value)
    },

  },
  actions: {
    getTOKEN() {//获取token值
      return getToken()
    }
  },
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
