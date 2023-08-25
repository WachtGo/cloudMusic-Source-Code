"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[985],{6641:function(t,i,a){a.d(i,{Z:function(){return v}});var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",t._l(t.songlist,(function(i,s){return a("div",{key:i.id,staticClass:"music-list"},[a("div",{staticStyle:{width:"35px"}},[t._v(t._s(s+1)+".")]),a("div",{staticClass:"music-list-info",on:{dblclick:function(a){return t.goSongDetails(i)}}},[a("div",{staticClass:"music-list-span"},[t._v(t._s(i.name))]),a("div",{staticClass:"music-list-span"},[t._v(t._s(i.ar[0].name))]),a("div",{staticClass:"music-list-span music-list-dt"},[t._v(t._s(i.dt))])]),a("div",{staticClass:"option"},[a("span",{on:{click:function(a){return t.listenMusic(i)}}},[a("i",{staticClass:"el-icon-headset iconhover"})]),0==i.fee||8==i.fee?a("span",{on:{click:function(a){return a.stopPropagation(),t.playMusic(i)}}},[a("i",{staticClass:"el-icon-folder-add iconhover"})]):t._e(),Boolean(i.mv)?a("span",{on:{click:function(a){return a.stopPropagation(),t.playMV(i.mv)}}},[a("i",{staticClass:"el-icon-video-camera iconhover"})]):t._e(),0==i.fee||8==i.fee?a("span",{on:{click:function(a){return t.getDownloadUrl(i.id,i.name,i.ar[0].name)}}},[a("i",{staticClass:"el-icon-download iconhover"})]):t._e()])])})),0)},e=[],n=a(8898),r=a(4979),c=(a(5615),a(767)),l={props:{songlist:Array},data:function(){return{}},methods:{goSongDetails:function(t){this.$router.push({name:"songDetails",params:{songDetails:t}})},listenMusic:function(t){var i=this;(0,r.b)(t,i)},playMusic:function(t){var i=this;(0,r.H)(t,i)},playMV:function(t){this.$router.push({name:"mvPlay",params:{mvId:t}})},getDownloadUrl:function(t,i,a){var s=i+" - "+a,e=this;e.$message({type:"success",message:"正在尝试下载"});var r={id:t};(0,n.km)(r).then((function(t){(0,c.download)(t.data.data[0].url,s),e.$message({type:"success",message:"开始下载了"})}))}}},o=l,u=a(1001),g=(0,u.Z)(o,s,e,!1,null,null,null),v=g.exports},8985:function(t,i,a){a.r(i),a.d(i,{default:function(){return p}});var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"list-wrap"},[a("div",{staticClass:"pageName"},[t._v("歌手详情")]),a("div",{staticClass:"descript"}),a("div",[a("div",{staticClass:"ul"},[a("div",{staticClass:"details"},[a("div",{staticClass:"details-img"},[a("img",{attrs:{src:t.artist.img1v1Url,alt:" "}})]),a("div",{staticClass:"detailsRight"},[a("div",{staticStyle:{"margin-left":"0px","text-align":"left","font-size":"20px"}},[t._v(" "+t._s(t.artist.name)+" ")]),a("div",{staticStyle:{"font-size":"14px"}},[a("div",{staticClass:"aliasClass"},[t.artist.alias[0]?a("span",{staticClass:"playListNickName"},[t._v(t._s(t.artist.alias[0]))]):t._e(),t.artist.alias[1]?a("span",{staticClass:"playListNickName"},[t._v("-")]):t._e(),a("span",{staticClass:"playListNickName2"},[t._v(t._s(t.artist.alias[1]))]),t._m(0)]),a("div",{staticClass:"option"},[a("div",{staticClass:"flexBetween"},[a("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerSongList("songSwitch")}}},[t._v("歌曲："),a("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.musicSize))])]),a("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerAlbum("albumSwitch")}}},[t._v("专辑："),a("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.albumSize))])]),a("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerMvList("mvSwitch")}}},[t._v("MV："),a("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.mvSize))])])])])])])]),t.tagSwitch.detailSwitch?a("div",{staticClass:"singerDetail"},[a("div",{staticStyle:{"font-size":"15px"}},[t._v("简介：")]),""===t.artist.briefDesc?a("div",{staticClass:"loading"},[a("i",{staticClass:"el-icon-loading"})]):t._e(),a("p",{staticClass:"briefDesc"},[t._v(" "+t._s(t.artist.briefDesc)+" ")])]):t._e(),t.tagSwitch.songSwitch?a("div",{attrs:{id:"singleSongs"}},[a("div",[a("div",{staticClass:"song-album-wrap"},[0!==t.songList.length?a("ul",[a("songlist",{attrs:{songlist:t.songList}})],1):a("div",{staticClass:"loading"},[a("i",{staticClass:"el-icon-loading"})])]),a("div",{staticClass:"pagination"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.musicSize>30,expression:"artist.musicSize > 30"}],attrs:{"current-page":t.songcurrentPage,"page-size":30,layout:"prev, pager, next, jumper",total:t.artist.musicSize,background:!0},on:{"current-change":t.songHandleCurrentChange,"update:currentPage":function(i){t.songcurrentPage=i},"update:current-page":function(i){t.songcurrentPage=i}}})],1)])]):t._e(),t.tagSwitch.albumSwitch?a("div",{attrs:{id:"albumList"}},[a("div",[a("div",{staticClass:"song-album-wrap"},[0!==t.albumList.length?a("ul",t._l(t.albumList,(function(i,s){return a("li",{key:s,staticClass:"liWrap",on:{click:function(a){return t.goAlbumDetail(i.id)}}},[a("div",{staticClass:"liWrap-block1"},[a("img",{attrs:{src:i.blurPicUrl,alt:" "}})]),a("div",{staticClass:"liWrap-block2"},[a("div",{staticClass:"div1"},[a("span",{staticClass:"albumName"},[t._v(t._s(i.name)+" "),i.alias[0]?a("span",{staticClass:"albumName2"},[t._v(t._s(i.alias[0]))]):t._e()])]),a("div",{staticClass:"divOther"}),a("span",{staticClass:"inline-block",staticStyle:{display:"inline-block",width:"50px"}}),a("div",{staticClass:"divOther",staticStyle:{width:"100px"}},[t._v(" 歌曲："),a("span",[t._v(t._s(i.size))])])])])})),0):a("div",{staticClass:"loading"},[a("i",{staticClass:"el-icon-loading"})])]),a("div",{staticClass:"pagination"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.albumSize>6,expression:"artist.albumSize > 6"}],attrs:{"current-page":t.albumcurrentPage,"page-size":6,layout:"prev, pager, next, jumper",total:t.artist.albumSize,background:!0},on:{"current-change":t.albumHandleCurrentChange,"update:currentPage":function(i){t.albumcurrentPage=i},"update:current-page":function(i){t.albumcurrentPage=i}}})],1)])]):t._e(),t.tagSwitch.mvSwitch?a("div",{attrs:{id:"singerMvs"}},[a("div",{staticClass:"videoPlaywrap"},[0!==t.mvList.length?a("ul",{staticClass:"videoPlaywrap"},t._l(t.mvList,(function(i,s){return a("li",{key:s,staticClass:"videoPlayList"},[a("div",{staticClass:"videoImage"},[a("img",{staticClass:"videoImg",staticStyle:{position:"absolute",width:"240px",height:"155px","border-radius":"10px"},attrs:{src:i.imgurl16v9,alt:" ",title:""},on:{click:function(a){return t.playMV(i.id)}}}),a("span",{staticClass:"videoPlayTime"},[a("i",{staticClass:"el-icon-video-play",staticStyle:{"margin-right":"1px"}}),t._v(t._s(i.playCount))]),a("span",{staticClass:"videoPlayTime",staticStyle:{bottom:"0"}},[t._v(t._s(i.duration))])]),a("p",{staticClass:"List-title",staticStyle:{"font-size":"10px"}},[a("span",{staticStyle:{display:"inline-block",width:"100%",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[i.type?t._e():a("span",{staticStyle:{color:"red"}},[t._v("MV ")]),t._v(t._s(i.name))]),a("br"),a("span",{staticStyle:{color:"rgb(199, 199, 199)"}},[a("span",[t._v("by ")]),a("span",[t._v(t._s(i.artistName))])])])])})),0):a("div",{staticClass:"loading"},[a("i",{staticClass:"el-icon-loading"})])]),a("div",{staticClass:"pagination"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.mvSize>8,expression:"artist.mvSize > 8"}],attrs:{"current-page":t.mvcurrentPage,"page-size":8,layout:"prev, pager, next, jumper",total:t.artist.mvSize,background:!0},on:{"current-change":t.mvHandleCurrentChange,"update:currentPage":function(i){t.mvcurrentPage=i},"update:current-page":function(i){t.mvcurrentPage=i}}})],1)]):t._e()])])])},e=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("span",[a("br"),a("span",{staticStyle:{color:"antiquewhite"}})])}],n=a(8439),r=a(8534),c=a(2482),l=(a(6133),a(8862),a(8898)),o=a(767),u=a(6641),g={components:{songlist:u.Z},data:function(){var t;return{artist:(t={alias:[],musicSize:"",id:"",img1v1Url:"",name:""},(0,c.Z)(t,"alias",["",""]),(0,c.Z)(t,"musicSize",""),(0,c.Z)(t,"albumSize",""),(0,c.Z)(t,"mvSize",""),(0,c.Z)(t,"briefDesc",""),t),songList:[],albumList:[],mvList:[],tagSwitch:{detailSwitch:!0,songSwitch:!1,albumSwitch:!1,mvSwitch:!1},songcurrentPage:1,albumcurrentPage:1,mvcurrentPage:1}},created:function(){this.$route.params.artist?(this.artist=this.$route.params.artist,this.getSingerDetail(this.$route.params.artist.id)):this.$route.params.id?this.getSingerDetail(this.$route.params.id):this.artist=JSON.parse(localStorage.getItem("artist"))},methods:{switchChange:function(t){var i=this;for(var a in i.tagSwitch)a!=t&&(i.tagSwitch[a]=!1);i.tagSwitch[t]=!0},getSingerDetail:function(t){var i=this;(0,l.ty)({id:t}).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==a.data.code){t.next=5;break}return t.next=3,a.data.artist;case 3:i.artist=t.sent,localStorage.setItem("artist",JSON.stringify(a.data.artist));case 5:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()).catch((function(t){}))},getSingerSongList:function(t){var i=this,a={id:i.artist.id,limit:30,offset:30*(i.songcurrentPage-1)};i.detailShow=!1,i.songList=[],(0,l.UV)(a).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(a){var s,e,r,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.data.songs;case 2:i.songList=t.sent,s=(0,n.Z)(i.songList);try{for(s.s();!(e=s.n()).done;)r=e.value,i.$set(r,"timer",!0)}catch(l){s.e(l)}finally{s.f()}c="dt",(0,o.transMusicTime)(i.songList,c);case 7:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()),i.switchChange(t)},getSingerAlbum:function(t){var i=this,a={id:i.artist.id,limit:6,offset:6*(i.albumcurrentPage-1)};i.detailShow=!1,i.albumList=[],(0,l.F7)(a).then((function(t){i.albumList=t.data.hotAlbums})),i.switchChange(t)},getSingerMvList:function(t){var i=this,a={id:i.artist.id,limit:8,offset:8*(i.mvcurrentPage-1)};i.mvList=[],(0,l.Rf)(a).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.data.mvs;case 2:i.mvList=t.sent,(0,o.transMusicTime)(i.mvList,"duration"),(0,o.transPlayCount)(i.mvList,"playCount");case 5:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()),i.switchChange(t)},goAlbumDetail:function(t){this.$router.push({name:"albumDetail",params:{albumId:t}})},playMV:function(t){this.$router.push({name:"mvPlay",params:{mvId:t}})},songHandleCurrentChange:function(t){var i=this;i.songcurrentPage=t,i.getSingerSongList("songSwitch")},albumHandleCurrentChange:function(t){var i=this;i.albumcurrentPage=t,i.getSingerAlbum("albumSwitch")},mvHandleCurrentChange:function(t){var i=this;i.mvcurrentPage=t,i.getSingerMvList("mvSwitch")}}},v=g,m=a(1001),d=(0,m.Z)(v,s,e,!1,null,"042bbb4a",null),p=d.exports},5615:function(t,i,a){a.d(i,{XR:function(){return e}});var s=a(9950);function e(t){return(0,s.l)({url:"/user/playlist",method:"get",params:t})}}}]);