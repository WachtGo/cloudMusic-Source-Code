export default {
  namespaced: true,
  state: {
    // 首页标签
    homeTags: {
      routerPage: 0,
      tags: [
        { page: 0, pageName: "推荐" },
        { page: 1, pageName: "歌单" },
        { page: 2, pageName: "歌手" },
      ],
    },
  },
  actions: {},
  mutations: {
    //首页标签更改
    changehomeTAG(state, page) {
      state.homeTags.routerPage = page;
    },
  },
};
