import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
]

const router = new VueRouter({
  routes: [
    {
      path: "",
      redirect: { name: "HomePage" }
    },
    // 首页
    {
      path: "/HomePage",
      name: "HomePage",
      component: () => import("@/views/home/HomePage.vue"),
    },
    {
      path: "/emptyPage",
      name: "emptyPage",
      component: () => import("@/components/emptyPage.vue")

    },
    //搜索的音乐页面
    {
      path: "/MusicPlayList",
      name: "MusicPlayList",
      component: () => import("@/views/musiclist/MusicPlayList.vue"),
    },
    //歌曲详情
    {
      path: "/songDetails",
      name: "songDetails",
      component: () => import("@/views/songDetails/songDetails.vue"),
      props:true,
    },
    //专辑详情
    {
      path: "/albumDetail",
      name: "albumDetail",
      component: () => import("@/views/albumDetail/albumDetail.vue"),
      props:true,
    },
    //歌手详情
    {
      path: "/singerDetail",
      name: "singerDetail",
      component: () => import("@/views/singerDetail/singerDetail.vue"),
      props:true,
    },
    //歌单详情
    {
      path: '/playListDetails',
      name: 'playListDetails',
      component: () => import("@/views/playListDetails/playListDetails.vue"),
      props:true,
    },
    //MV页面
    {
      path: "/mvPlay",
      name: "mvPlay",
      component: () => import("@/views/mvPlay/mvPlay.vue"),
      props:true,
      // meta: { keepAlive: true }
    },
    //视频页面
    {
      path: "/videoPlay",
      name: "videoPlay",
      component: () => import("@/views/videoPlay/videoPlay.vue"),
      props:true,
      // meta: { keepAlive: true }
    },
    

  ]
})

export default router
