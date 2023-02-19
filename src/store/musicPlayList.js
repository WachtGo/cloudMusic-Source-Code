export default {
  namespaced: true,
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
  },
  actions: {

  },
  mutations: {
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
  }
}