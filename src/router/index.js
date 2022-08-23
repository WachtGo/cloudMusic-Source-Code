import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
]

const router = new VueRouter({
  mode:'hash',
  // mode:'hash',
  routes: [
    {
      path: "",
      redirect: { name: "HomePage" }
    },
    // 首页
    {
      path: "/HomePage",
      name: "HomePage",
      redirect: { name: "recommend" },
      component: () => import("@/views/home/HomePage.vue"),
      children:[
        {//个性推荐
          path:"/HomePage/recommend",
          name:"recommend",
          component:()=>import("@/views/recommend/index.vue")
        },
        {//歌单分类
          path:"/HomePage/playlistCategary",
          name:"playlistCategary",
          component:()=>import("@/views/categery/playlistCategary.vue")
        },
        {//歌手分类
          path:"/HomePage/singerCategary",
          name:"singerCategary",
          component:()=>import("@/views/categery/singerCategary.vue")
        },
      ],
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
      meta:{
        login:true,
        met:false
      },
      
      
      // meta: { keepAlive: true }
    },
    //视频页面
    {
      path: "/videoPlay",
      name: "videoPlay",
      component: () => import("@/views/videoPlay/videoPlay.vue"),
      props:true,
      // meta: { keepAlive: true }
      // 独享路由
      // beforeEnter(to,from,next){
      //   if(from.path=='/MusicPlayList'){
      //     next()
      //     // alert('buyun')
      //   }
      // },
      //
      // afterEnter(to,from,next){

      // }
    },
  ]
})
// 前置路由
// router.beforeEach((to,from,next)=>{
//   if(to.name === 'videoPlay' || to.meta.met === false) {
//     alert('不允许进入')
//   }else{
//     next()
//   }
// })

//后置路由
// router.afterEach((to,from,next)=>{
  
// })
// //还有组件内路由如下,组件内使用
// beforRouteEnter(to,from,next){

// }
// befroeRouteLeave(to,from,next){

// }
// beforeRouteUpdate(to,from,next){

// }

//去除首页导航重复导航相同页面报错 ：Avoided redundant navigation to current location:

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location){
  return originalPush.call(this,location).catch(err=>err)
}
export default router
