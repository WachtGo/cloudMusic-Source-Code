"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[337],{6865:function(t,s,i){i.d(s,{Z:function(){return g}});var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",t._l(t.songlist,(function(s,a){return i("div",{key:s.id,staticClass:"music-list"},[i("div",{staticStyle:{width:"35px"}},[t._v(t._s(a+1)+".")]),i("div",{staticClass:"music-list-info",on:{dblclick:function(i){return t.goSongDetails(s)}}},[i("div",{staticClass:"music-list-span"},[t._v(t._s(s.name))]),i("div",{staticClass:"music-list-span"},[t._v(t._s(s.ar[0].name))]),i("div",{staticClass:"music-list-span music-list-dt"},[t._v(t._s(s.dt))])]),i("div",{staticClass:"option"},[i("span",{on:{click:function(i){return t.likeMusic(s.id,!0)}}},[i("i",{staticClass:"iFont el-icon-star-on iconhover"})]),i("span",{on:{click:function(i){return t.likeMusic(s.id,!1)}}},[i("i",{staticClass:"iFont el-icon-star-off iconhover"})]),i("span",{on:{click:function(i){return t.listenMusic(s)}}},[i("i",{staticClass:"el-icon-headset iconhover"})]),0==s.fee||8==s.fee?i("span",{on:{click:function(i){return i.stopPropagation(),t.playMusic(s)}}},[i("i",{staticClass:"el-icon-folder-add iconhover"})]):t._e(),Boolean(s.mv)?i("span",{on:{click:function(i){return i.stopPropagation(),t.playMV(s.mv)}}},[i("i",{staticClass:"el-icon-video-camera iconhover"})]):t._e(),0==s.fee||8==s.fee?i("span",{on:{click:function(i){return t.getDownloadUrl(s.id,s.name)}}},[i("i",{staticClass:"el-icon-download iconhover"})]):t._e()])])})),0)},e=[],l=i(8898),n=i(4979),c=i(5615),r=i(767),o={props:{songlist:Array},data(){return{}},methods:{goSongDetails(t){this.$router.push({name:"songDetails",params:{songDetails:t}})},likeMusic(t,s){const i=this.$loading({target:"#app_body",background:"rgba(255,255,255,0.1)"});(0,c.Yf)({id:t,like:s}).then((t=>{if(this.$nextTick((()=>{i.close()})),200===t.data.code){if(s)return void this.$message.success("已添加入我的喜欢-可进入网易云音乐查看");this.$message.success("已从我的喜欢列表删除")}})).catch((t=>{this.$nextTick((()=>{i.close()}))}))},listenMusic(t){var s=this;(0,n.b)(t,s)},playMusic(t){var s=this;(0,n.H)(t,s)},playMV(t){this.$router.push({name:"mvPlay",params:{mvId:t}})},getDownloadUrl(t,s){var i=this;i.$message({type:"success",message:"正在尝试下载"});let a={id:t};(0,l.km)(a).then((t=>{(0,r.download)(t.data.data[0].url,s),i.$message({type:"success",message:"开始下载了"})}))}}},u=o,d=i(1001),p=(0,d.Z)(u,a,e,!1,null,null,null),g=p.exports},1337:function(t,s,i){i.r(s),i.d(s,{default:function(){return g}});var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"list-wrap"},[i("div",{staticClass:"pageName"},[t._v("歌单详情")]),i("div",{staticClass:"descript"}),i("div",[i("div",{staticClass:"wrap2"},[i("div",{staticClass:"details",attrs:{id:"list_detail"}},[i("div",{staticClass:"details-img"},[i("img",{attrs:{src:t.playListDetail.coverImgUrl,alt:""}})]),i("div",{staticClass:"detailsRight"},[i("h3",{staticStyle:{"margin-left":"0px","text-align":"left","font-size":"20px"}},[t._v(" "+t._s(t.playListDetail.name)+" "),t.playListDetail.creator.userId===t.userId?i("div",{staticStyle:{display:"inline-block"}},[i("button",{staticClass:"my-button",on:{click:function(s){return t.deletePlayList(t.playListDetail.id)}}},[t._v(" 删除歌单 ")])]):t._e(),t.playListDetail.creator.userId!==t.userId?i("div",{staticStyle:{display:"inline-block"}},[i("button",{staticClass:"my-button",on:{click:function(s){return t.collectPlaylist("1")}}},[t._v(" 收藏")]),i("button",{staticClass:"my-button",on:{click:function(s){return t.collectPlaylist("2")}}},[t._v(" 取消收藏 ")])]):t._e()]),i("div",{staticClass:"playListCreator"},[i("img",{attrs:{src:t.playListDetail.creator.avatarUrl,alt:""}}),i("span",{staticClass:"playListNickName"},[t._v("    "+t._s(t.playListDetail.creator.nickname)+"  ")]),t.playListDetail.creator.signature?i("span",[t._v("  -  "+t._s(t.playListDetail.creator.signature))]):t._e()]),0!==t.playListDetail.tags.length?i("div",{staticClass:"playListTag"},[i("span",[t._v("标签:  ")]),t._l(t.playListDetail.tags,(function(s,a){return i("span",{key:a},[t._v(t._s(s)+" ")])}))],2):t._e(),i("p",{staticClass:"playListIntro"},[t._v(" "+t._s(t.playListDetail.description)+" ")])])]),i("div",{staticClass:"countLine"},[t._v(" 歌曲： "),i("span",[t._v(t._s(t.playListDetail.trackCount))])]),i("ul",{staticClass:"wrap-center"},[0===t.musicList.length?i("div",{staticClass:"loading"},[i("i",{staticClass:"el-icon-loading"})]):t._e(),i("songlist",{attrs:{songlist:t.musicList}})],1)])])])},e=[],l=i(8898),n=i(5615),c=i(767),r=i(6865),o={components:{songlist:r.Z},data(){return{songListId:"",currentPage:1,musicList:[],DownloadSongUrl:"",mvUrl:"",count:"",playListComment:[{user:{avatarUrl:""}}],songMV:[],playListDetail:{name:"",coverImgUrl:"",trackCount:"",creator:{avatarUrl:"",nickname:"",signature:""},tags:[],description:""},userId:""}},mounted(){localStorage.getItem("user")&&(this.userId=JSON.parse(localStorage.getItem("user")).userId),this.$route.params.playListDetail&&localStorage.setItem("playListDetail",JSON.stringify(this.$route.params.playListDetail)),this.$route.params.playListDetail?this.playListDetail=this.$route.params.playListDetail:this.playListDetail=JSON.parse(localStorage.getItem("playListDetail")),this.getPlaylistDetail(),this.getSongList()},methods:{handleCurrentChange:function(t){this.currentPage=t;var s=this;s.getPlaylistDetail(t)},getPlaylistDetail(){var t=this;let s={id:t.playListDetail.id};(0,l._V)(s).then((async s=>{t.playListDetail=await s.data.playlist}))},getSongList(){var t=this;let s={id:t.playListDetail.id};(0,l.vw)(s).then((async s=>{t.musicList=await s.data.songs;for(let i of t.musicList)t.$set(i,"timer",!0);(0,c.transMusicTime)(t.musicList,"dt")}))},collectPlaylist(t){const s=this.$loading({target:"#list_detail",background:"rgba(255,255,255,0.1)"});let i={t:t,id:this.playListDetail.id};(0,n.k2)(i).then((i=>{if(this.$nextTick((()=>{s.close()})),200===i.data.code){if("1"===t)return void this.$message({type:"success",message:"收藏成功-可在网易云音乐中查看"});"2"===t&&this.$message({type:"success",message:"已取消收藏"})}})).catch((t=>{this.$nextTick((()=>{s.close()}))}))},deletePlayList(t){const s=this.$loading({target:"#list_detail",background:"rgba(255,255,255,0.1)"});(0,n.jV)({id:t}).then((t=>{this.$nextTick((()=>{s.close()})),200===t.data.code&&(this.$message.success("已从我的歌单删除"),this.$router.go(-1))})).catch((t=>{this.$nextTick((()=>{s.close()}))}))}}},u=o,d=i(1001),p=(0,d.Z)(u,a,e,!1,null,"2b533af3",null),g=p.exports},5615:function(t,s,i){i.d(s,{XR:function(){return n},Yf:function(){return l},jV:function(){return c},k2:function(){return e}});var a=i(9950);function e(t){return(0,a.l)({url:"/playlist/subscribe",method:"post",data:t})}function l(t){return(0,a.l)({url:"/like",method:"post",data:t})}function n(t){return(0,a.l)({url:"/user/playlist",method:"get",params:t})}function c(t){return(0,a.l)({url:"/playlist/delete",method:"get",params:t})}}}]);
//# sourceMappingURL=337.8bb2f078.js.map