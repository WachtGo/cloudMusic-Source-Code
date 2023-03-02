"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[958],{18687:function(t,i,s){s.d(i,{Z:function(){return m}});var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",t._l(t.songlist,(function(i,a){return s("div",{key:i.id,staticClass:"music-list"},[s("div",{staticStyle:{width:"35px"}},[t._v(t._s(a+1)+".")]),s("div",{staticClass:"music-list-info",on:{dblclick:function(s){return t.goSongDetails(i)}}},[s("div",{staticClass:"music-list-span"},[t._v(t._s(i.name))]),s("div",{staticClass:"music-list-span"},[t._v(t._s(i.ar[0].name))]),s("div",{staticClass:"music-list-span music-list-dt"},[t._v(t._s(i.dt))])]),s("div",{staticClass:"option"},[s("span",{on:{click:function(s){return t.likeMusic(i.id,!0)}}},[s("i",{staticClass:"iFont el-icon-star-on iconhover"})]),s("span",{on:{click:function(s){return t.likeMusic(i.id,!1)}}},[s("i",{staticClass:"iFont el-icon-star-off iconhover"})]),s("span",{on:{click:function(s){return t.listenMusic(i)}}},[s("i",{staticClass:"el-icon-headset iconhover"})]),0==i.fee||8==i.fee?s("span",{on:{click:function(s){return s.stopPropagation(),t.playMusic(i)}}},[s("i",{staticClass:"el-icon-folder-add iconhover"})]):t._e(),Boolean(i.mv)?s("span",{on:{click:function(s){return s.stopPropagation(),t.playMV(i.mv)}}},[s("i",{staticClass:"el-icon-video-camera iconhover"})]):t._e(),0==i.fee||8==i.fee?s("span",{on:{click:function(s){return t.getDownloadUrl(i.id,i.name)}}},[s("i",{staticClass:"el-icon-download iconhover"})]):t._e()])])})),0)},e=[],n=s(38898),r=s(24979),c=s(55615),l=s(30767),o={props:{songlist:Array},data:function(){return{}},methods:{goSongDetails:function(t){this.$router.push({name:"songDetails",params:{songDetails:t}})},likeMusic:function(t,i){var s=this;(0,c.Y)({id:t,like:i}).then((function(t){if(200===t.data.code){if(i)return void s.$message({type:"success",message:"已添加入我的喜欢-可进入网易云音乐查看"});s.$message({type:"success",message:"已从我的喜欢列表删除"})}})).catch((function(t){}))},listenMusic:function(t){var i=this;(0,r.b)(t,i)},playMusic:function(t){var i=this;(0,r.H)(t,i)},playMV:function(t){this.$router.push({name:"mvPlay",params:{mvId:t}})},getDownloadUrl:function(t,i){var s=this;s.$message({type:"success",message:"正在尝试下载"});var a={id:t};(0,n.km)(a).then((function(t){(0,l.download)(t.data.data[0].url,i),s.$message({type:"success",message:"开始下载了"})}))}}},u=o,g=s(1001),v=(0,g.Z)(u,a,e,!1,null,null,null),m=v.exports},21958:function(t,i,s){s.r(i),s.d(i,{default:function(){return p}});var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"list-wrap"},[s("div",{staticClass:"pageName"},[t._v("歌手详情")]),s("div",{staticClass:"descript"}),s("div",[s("div",{staticClass:"ul"},[s("div",{staticClass:"details"},[s("div",{staticClass:"details-img"},[s("img",{attrs:{src:t.artist.img1v1Url,alt:""}})]),s("div",{staticClass:"detailsRight"},[s("div",{staticStyle:{"margin-left":"0px","text-align":"left","font-size":"20px"}},[t._v(" "+t._s(t.artist.name)+" ")]),s("div",{staticStyle:{"font-size":"14px"}},[s("div",{staticClass:"aliasClass"},[t.artist.alias[0]?s("span",{staticClass:"playListNickName"},[t._v(t._s(t.artist.alias[0]))]):t._e(),t.artist.alias[1]?s("span",{staticClass:"playListNickName"},[t._v("-")]):t._e(),s("span",{staticClass:"playListNickName2"},[t._v(t._s(t.artist.alias[1]))]),t._m(0)]),s("div",{staticClass:"option"},[s("div",{staticClass:"flexBetween"},[s("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerSongList("songSwitch")}}},[t._v("歌曲："),s("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.musicSize))])]),s("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerAlbum("albumSwitch")}}},[t._v("专辑："),s("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.albumSize))])]),s("span",{staticClass:"inline-block",on:{click:function(i){return t.getSingerMvList("mvSwitch")}}},[t._v("MV："),s("span",{staticClass:"musicSize"},[t._v(t._s(t.artist.mvSize))])])])])])])]),t.tagSwitch.detailSwitch?s("div",{staticClass:"singerDetail"},[s("div",{staticStyle:{"font-size":"15px"}},[t._v("简介：")]),""===t.artist.briefDesc?s("div",{staticClass:"loading"},[s("i",{staticClass:"el-icon-loading"})]):t._e(),s("p",{staticClass:"briefDesc"},[t._v(" "+t._s(t.artist.briefDesc)+" ")])]):t._e(),t.tagSwitch.songSwitch?s("div",{attrs:{id:"singleSongs"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.songList.length,expression:"songList.length === 0"}],staticClass:"loading"},[s("i",{staticClass:"el-icon-loading"})]),0!==t.songList.length?s("div",[s("ul",{staticClass:"song-album-wrap"},[s("songlist",{attrs:{songlist:t.songList}})],1),s("div",{staticClass:"pagination"},[s("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.musicSize>30,expression:"artist.musicSize > 30"}],attrs:{"current-page":t.songcurrentPage,"page-size":30,layout:"prev, pager, next, jumper",total:t.artist.musicSize,background:!0},on:{"current-change":t.songHandleCurrentChange,"update:currentPage":function(i){t.songcurrentPage=i},"update:current-page":function(i){t.songcurrentPage=i}}})],1)]):t._e()]):t._e(),t.tagSwitch.albumSwitch?s("div",{attrs:{id:"albumList"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.albumList.length,expression:"albumList.length === 0"}],staticClass:"loading"},[s("i",{staticClass:"el-icon-loading"})]),0!==t.albumList.length?s("div",[s("ul",{staticClass:"song-album-wrap"},t._l(t.albumList,(function(i,a){return s("li",{key:a,staticClass:"liWrap",on:{click:function(s){return t.goAlbumDetail(i.id)}}},[s("div",{staticClass:"liWrap-block1"},[s("img",{attrs:{src:i.blurPicUrl,alt:""}})]),s("div",{staticClass:"liWrap-block2"},[s("div",{staticClass:"div1"},[s("span",{staticClass:"albumName"},[t._v(t._s(i.name)+" "),i.alias[0]?s("span",{staticClass:"albumName2"},[t._v(t._s(i.alias[0]))]):t._e()])]),s("div",[s("div",{staticClass:"divOther"}),s("span",{staticClass:"inline-block",staticStyle:{display:"inline-block",width:"50px"}}),s("div",{staticClass:"divOther",staticStyle:{width:"100px"}},[t._v(" 歌曲："),s("span",[t._v(t._s(i.size))])])])])])})),0),s("div",{staticClass:"pagination"},[s("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.albumSize>6,expression:"artist.albumSize > 6"}],attrs:{"current-page":t.albumcurrentPage,"page-size":6,layout:"prev, pager, next, jumper",total:t.artist.albumSize,background:!0},on:{"current-change":t.albumHandleCurrentChange,"update:currentPage":function(i){t.albumcurrentPage=i},"update:current-page":function(i){t.albumcurrentPage=i}}})],1)]):t._e()]):t._e(),t.tagSwitch.mvSwitch?s("div",{attrs:{id:"singerMvs"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.mvList.length,expression:"mvList.length === 0"}],staticClass:"loading"},[s("i",{staticClass:"el-icon-loading"})]),0!==t.mvList.length?s("div",[s("ul",{staticClass:"videoPlaywrap"},t._l(t.mvList,(function(i,a){return s("li",{key:a,staticClass:"videoPlayList"},[s("div",{staticClass:"videoImage"},[s("img",{staticClass:"videoImg",staticStyle:{position:"absolute",width:"240px",height:"155px","border-radius":"10px"},attrs:{src:i.imgurl16v9,alt:"",title:""},on:{click:function(s){return t.playMV(i.id)}}}),s("span",{staticClass:"videoPlayTime"},[s("i",{staticClass:"el-icon-video-play",staticStyle:{"margin-right":"1px"}}),t._v(t._s(i.playCount))]),s("span",{staticClass:"videoPlayTime",staticStyle:{bottom:"0"}},[t._v(t._s(i.duration))])]),s("p",{staticClass:"List-title",staticStyle:{"font-size":"10px"}},[s("span",{staticStyle:{display:"inline-block",width:"100%",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[i.type?t._e():s("span",{staticStyle:{color:"red"}},[t._v("MV ")]),t._v(t._s(i.name))]),s("br"),s("span",{staticStyle:{color:"rgb(199, 199, 199)"}},[s("span",[t._v("by ")]),s("span",[t._v(t._s(i.artistName))])])])])})),0),s("div",{staticClass:"pagination"},[s("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.artist.mvSize>8,expression:"artist.mvSize > 8"}],attrs:{"current-page":t.mvcurrentPage,"page-size":8,layout:"prev, pager, next, jumper",total:t.artist.mvSize,background:!0},on:{"current-change":t.mvHandleCurrentChange,"update:currentPage":function(i){t.mvcurrentPage=i},"update:current-page":function(i){t.mvcurrentPage=i}}})],1)]):t._e()]):t._e()])])])},e=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("span",[s("br"),s("span",{staticStyle:{color:"antiquewhite"}})])}],n=s(68439),r=s(48534),c=s(82482),l=(s(36133),s(38862),s(38898)),o=s(30767),u=s(18687),g={components:{songlist:u.Z},data:function(){var t;return{artist:(t={alias:[],musicSize:"",id:"",img1v1Url:"",name:""},(0,c.Z)(t,"alias",["",""]),(0,c.Z)(t,"musicSize",""),(0,c.Z)(t,"albumSize",""),(0,c.Z)(t,"mvSize",""),(0,c.Z)(t,"briefDesc",""),t),songList:[],albumList:[],mvList:[],tagSwitch:{detailSwitch:!0,songSwitch:!1,albumSwitch:!1,mvSwitch:!1},songcurrentPage:1,albumcurrentPage:1,mvcurrentPage:1}},created:function(){this.$route.params.artist?(this.artist=this.$route.params.artist,this.getSingerDetail(this.$route.params.artist.id)):this.$route.params.id?this.getSingerDetail(this.$route.params.id):this.artist=JSON.parse(localStorage.getItem("artist"))},methods:{switchChange:function(t){var i=this;for(var s in i.tagSwitch)s!=t&&(i.tagSwitch[s]=!1);i.tagSwitch[t]=!0},getSingerDetail:function(t){var i=this;(0,l.ty)({id:t}).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==s.data.code){t.next=5;break}return t.next=3,s.data.artist;case 3:i.artist=t.sent,localStorage.setItem("artist",JSON.stringify(s.data.artist));case 5:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()).catch((function(t){}))},getSingerSongList:function(t){var i=this,s={id:i.artist.id,limit:30,offset:30*(i.songcurrentPage-1)};i.detailShow=!1,i.songList=[],(0,l.UV)(s).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(s){var a,e,r,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.data.songs;case 2:i.songList=t.sent,a=(0,n.Z)(i.songList);try{for(a.s();!(e=a.n()).done;)r=e.value,i.$set(r,"timer",!0)}catch(l){a.e(l)}finally{a.f()}c="dt",(0,o.transMusicTime)(i.songList,c);case 7:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()),i.switchChange(t)},getSingerAlbum:function(t){var i=this,s={id:i.artist.id,limit:6,offset:6*(i.albumcurrentPage-1)};i.detailShow=!1,i.albumList=[],(0,l.F7)(s).then((function(t){i.albumList=t.data.hotAlbums})),i.switchChange(t)},getSingerMvList:function(t){var i=this,s={id:i.artist.id,limit:8,offset:8*(i.mvcurrentPage-1)};i.mvList=[],(0,l.Rf)(s).then(function(){var t=(0,r.Z)(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.data.mvs;case 2:i.mvList=t.sent,(0,o.transMusicTime)(i.mvList,"duration"),(0,o.transPlayCount)(i.mvList,"playCount");case 5:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}()),i.switchChange(t)},goAlbumDetail:function(t){this.$router.push({name:"albumDetail",params:{albumId:t}})},playMV:function(t){this.$router.push({name:"mvPlay",params:{mvId:t}})},songHandleCurrentChange:function(t){var i=this;i.songcurrentPage=t,i.getSingerSongList("songSwitch")},albumHandleCurrentChange:function(t){var i=this;i.albumcurrentPage=t,i.getSingerAlbum("albumSwitch")},mvHandleCurrentChange:function(t){var i=this;i.mvcurrentPage=t,i.getSingerMvList("mvSwitch")}}},v=g,m=s(1001),d=(0,m.Z)(v,a,e,!1,null,"75df367a",null),p=d.exports},55615:function(t,i,s){s.d(i,{Y:function(){return n},k:function(){return e}});var a=s(39950);function e(t){return(0,a.l)({url:"/playlist/subscribe",method:"post",data:t})}function n(t){return(0,a.l)({url:"/like",method:"post",data:t})}}}]);
//# sourceMappingURL=958-legacy.8b361217.js.map