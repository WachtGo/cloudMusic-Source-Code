"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[940],{3940:function(t,e,i){i.r(e),i.d(e,{default:function(){return v}});var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"recMv Ocenter"},[t.videoId?i("div",{staticStyle:{margin:"0 auto",width:"95%"}},[i("video",{staticStyle:{margin:"10px 0",width:"100%",height:"580px"},attrs:{controls:"",autoplay:"",loop:"",src:t.videoUrl}})]):t._e(),i("div",{staticClass:"videoDetail"},[i("div",[i("div",{staticStyle:{"margin-bottom":"10px"}},[i("div",{staticClass:"authorImg"},[i("img",{attrs:{src:t.videoDetail.creator.avatarUrl,alt:""}})]),i("span",{staticClass:"authorName"},[t._v(t._s(t.videoDetail.creator.nickname))])])]),i("div",{staticStyle:{"margin-bottom":"10px"}},[i("span",{staticClass:"videoTitle"},[t._v(t._s(t.videoDetail.title))])]),i("div",{staticStyle:{"margin-bottom":"10px"}},[i("span",{staticClass:"smallFont"},[t._v("发布："+t._s(t.videoDetail.publishTime))]),i("span",{staticClass:"smallFont"},[t._v("播放："+t._s(t.videoDetail.playTime)+"次")])]),i("p",[t._v(t._s(t.videoDetail.description))]),i("ul",t._l(t.videoDetail.videoGroup,(function(e){return i("li",{key:e.id,staticClass:"videoTag"},[t._v(" "+t._s(e.name)+" ")])})),0),i("div",[i("span",{staticClass:"smallFont border"},[t._v("赞"+t._s(t.videoDetail.praisedCount))]),i("span",{staticClass:"smallFont border"},[t._v("收藏"+t._s(t.videoDetail.subscribeCount))]),i("span",{staticClass:"smallFont border"},[t._v("分享"+t._s(t.videoDetail.shareCount))])])]),t.videoId?i("div",{staticStyle:{padding:"0px 50px"}},[i("h3",{staticStyle:{margin:"5px 0 10px 0","text-align":"center"}},[t._v(" 评论("+t._s(t.count)+"条) ")]),t._l(t.videoComments,(function(e){return i("div",{key:e.id,staticClass:"hoverBackColor"},[i("img",{staticStyle:{width:"50px","border-radius":"25px"},attrs:{src:e.user.avatarUrl}}),i("span",{staticStyle:{display:"inline-block","margin-left":"10px","font-size":"15px"}},[t._v(t._s(e.user.nickname)+"  :  ")]),i("span",{staticStyle:{"margin-left":"20px",width:"750px"}},[t._v(" "+t._s(e.content)+" ")]),i("div",{staticStyle:{height:"30px"}},[i("span",{staticStyle:{float:"right",width:"130px"}},[t._v("  时间："+t._s(e.timeStr))]),i("span",{staticStyle:{float:"right"}},[t._v(t._s(e.likedCount)+" 赞   ")])])])})),i("div",{staticStyle:{"text-align":"center"}},[0!=t.count?i("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":8,layout:"prev, pager, next, jumper",total:t.count,background:!0},on:{"current-change":t.mvhandleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}}):t._e()],1)],2):t._e()])},s=[],o=i(8898),r=i(767),l={data(){return{mvUrl:"",videoUrl:"",videoDetail:{creator:{},title:"",publishTime:"",playTime:"",videoGroup:[],praisedCount:"",subscribeCount:"",shareCount:""},videoId:"",videoComments:[],count:"",currentPage:1}},mounted(){this.$route.params.videoId&&localStorage.setItem("videoId",this.$route.params.videoId),this.$route.params.videoId?this.videoId=this.$route.params.videoId:this.videoId=localStorage.getItem("videoId"),this.playVideo()},methods:{mvhandleCurrentChange:function(t){this.currentPage=t,this.playVideo(this.videoId,t)},playVideo(){let t={id:this.videoId};(0,o.kS)(t).then((t=>{this.videoDetail=t.data.data,this.videoDetail.publishTime=(0,r.transtime)(this.videoDetail.publishTime)})),(0,o.cy)(t).then((t=>{this.videoUrl=t.data.urls[0].url}));var e={id:this.videoId,limit:8,offset:8*(this.currentPage-1)};(0,o.qf)(e).then((t=>{this.videoComments=t.data.comments,this.count=t.data.total}))}}},n=l,d=i(1001),c=(0,d.Z)(n,a,s,!1,null,"59c991b9",null),v=c.exports}}]);
//# sourceMappingURL=940.9d6119a6.js.map