// import createPersistedState from "vuex-persistedstate"

export default {
  namespaced: true,
  state: {
    // 歌曲生成周期
    // plugins: [createPersistedState({
    // 	storage: window.sessionStorage
    // })],
    audio: [], //播放列表音乐
    audition: [], //试听歌曲
    musicAudioStatu: 0, //控制audio,audition两个播放器显示
    alplayShow: true,
  },
  actions: {},
  mutations: {
    //播放器添加歌曲
    addSONG(state, song) {
      for (let item of state.audio) {
        if (item.id === song.id) {
          this._vm.$message("播放列表已存在这首歌");
          return;
        }
      }
      state.audio.push(song); //将歌曲添加
      this._vm.$message({
        type: "success",
        message: "歌曲已添加到播放列表",
      });
    },
    //删除歌曲
    deleteMUSIC(state, index) {
      state.audio.splice(index, 1);
      this._vm.$message({
        type: "success",
        message: "歌曲已移出播放列表",
      });
    },
    //添加试听
    addAUDITION(state, song) {
      for (let item of state.audition) {
        if (item.id === song.id) {
          this._vm.$message("正在试听这首歌");
          return;
        }
      }
      state.musicAudioStatu = 1;
      state.audition.splice(0, 1);
      state.audition[0] = song; //将歌曲添加
      this._vm.$message({
        type: "success",
        message: "歌曲已添加到试听",
      });
    },
    // 删除试听
    deleteAUDITION(state, index) {
      state.audition.splice(index, 1);
      this._vm.$message({
        type: "success",
        message: "歌曲已移出试听列表",
      });
    },
    //更换播放器
    changeAPLAYER(state, statu) {
      statu === 1 ? (state.musicAudioStatu = 1) : (state.musicAudioStatu = 0);
    },
  },
};
