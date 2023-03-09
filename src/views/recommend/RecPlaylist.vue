<template>
  <!-- 推荐歌单 -->
  <div>
    <h3 class="h2title">推荐歌单 :</h3>
    <div class="recPlay Ocenter">
      <ul class="recPlaywrap">
        <li
          class="recPlayList"
          v-for="(item, index) in recPlayList"
          :key="index"
        >
          <div class="image">
            <img :src="item.picUrl" alt="" title="" @click="goSongList(item)" />
            <span class="playCount"
              ><i class="el-icon-video-play" style="margin-right: 1px"></i
              >{{ item.playCount }}</span
            >
          </div>
          <p class="List-title" @click="goSongList(item)">
            <span>{{ item.name }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSuggestPlayList } from "@/api/api";
import { transPlayCount } from "@/utils/commonApi";
export default {
  data() {
    return {
      limit: 10,
      recPlayList: [
        {
          id: 2420545066,
          name: "『纯音乐』当雨滴敲响琴键",
          picUrl:
            "http://p2.music.126.net/HIUy568wk914exFZai5GXA==/109951163554890901.jpg",
          playCount: "973万",
          trackCount: 68,
        },
        {
          id: 8013623763,
          name: "别担心 迟早都会和喜欢的人在一起的",
          picUrl:
            "http://p1.music.126.net/I4L4gx-NPQqYuQbBtzXc6g==/109951168203750890.jpg",
          playCount: "7.58万",
          trackCount: 94,
        },
        {
          id: 7662651829,
          name: "[听·陈奕迅] 有请K歌之王",
          picUrl:
            "http://p1.music.126.net/Dt2BjvqgHWag_ZHwJi_rWg==/109951167921109973.jpg",
          playCount: "310万",
          trackCount: 30,
        },
        {
          id: 2767811922,
          name: "古风｜闲庭抚琴桃花酒，叶落似是故人归",
          picUrl:
            "http://p1.music.126.net/KjjSfVVJBomMHzP2YZnOJg==/109951164294871555.jpg",
          playCount: "835万",
          trackCount: 61,
        },
        {
          id: 8065290179,
          name: "优美旋律陪伴着我一路成长｜轻音",
          picUrl:
            "http://p2.music.126.net/N3OI7jFVm5E_KX7leCVh-g==/109951168242183467.jpg",
          playCount: "3.05万",
          trackCount: 92,
        },
        {
          id: 7569628231,
          name: "民谣｜去做不被定义的自己",
          picUrl:
            "http://p2.music.126.net/FQZig87CWrbsIfHHso-5tA==/109951167739914317.jpg",
          playCount: "2.66万",
          trackCount: 17,
        },
        {
          id: 7426382152,
          name: "「刷题专用」明月一灯清 清灯一月明",
          picUrl:
            "http://p2.music.126.net/RHczLl3Ja8xbpq405ZANOA==/109951167626284403.jpg",
          playCount: "3.31万",
          trackCount: 85,
        },
        {
          id: 7796293725,
          name: "『纯音乐/治愈』解压放松催眠 看书写作业",
          picUrl:
            "http://p1.music.126.net/DNvqiqgUPQoQjH4-23ZsqQ==/109951168127987799.jpg",
          playCount: "15万",
          trackCount: 98,
        },
        {
          id: 7734531118,
          name: "学习纯音 | 深度专注,私享静谧",
          picUrl:
            "http://p1.music.126.net/Aun7GzRJg2xSvmlOOrfJ1w==/109951168041516106.jpg",
          playCount: "10万",
          trackCount: 54,
        },
        {
          id: 8093747519,
          name: "【轻音乐】唯心主义浪漫情怀",
          picUrl:
            "http://p2.music.126.net/XCnaOJ9thqM0yOmwYw1TEw==/109951168380809911.jpg",
          playCount: "1.26万",
          trackCount: 28,
        },
      ],
    };
  },
  mounted() {
    this.getSuggestPlayList();
    // await this.$nextTick(()=>{
    //   // console.log(6)
    // })
  },
  methods: {
    getSuggestPlayList() {
      //获取推荐歌单
      var that = this;
      let params = {
        limit: that.limit,
      };
      getSuggestPlayList(params).then(async (res) => {
        // console.log("推荐歌单：---",res.data);
        that.recPlayList = await res.data.result;
        // console.log("推荐歌单：--", res.data.result);
        //将播放量转成亿,万单位
        transPlayCount(that.recPlayList, "playCount");
      });
    },
    // goSongList(songListId) {
    //   //传入歌单id进入歌曲列表
    //   var that = this;
    //   that.$router.push({
    //     name: "playListDetails",
    //     params: { songListId: songListId },
    //   });
    // },
    goSongList(playListDetail) {
      //传入歌单id进入歌曲列表
      let params = {
        id: playListDetail.id,
        name: playListDetail.name,
        coverImgUrl: playListDetail.picUrl,
        trackCount: playListDetail.trackCount,
        creator: { avatarUrl: "", nickname: "", signature: "" },
        tags: [],
        description: "",
      };
      this.$router.push({
        name: "playListDetails",
        params: { playListDetail: params },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.recPlay {
  // max-height: 550px;
  overflow-x: hidden;
  // background: rgba(95, 158, 160, 0.11);
  // &::-webkit-scrollbar {
  //   display: none;
  // }

  .recPlaywrap {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap; //根据宽度限制一行的盒子个数
    margin: 10px 0;
    width: 100%;
    height: 520px;
    // overflow-x: hidden;

    .recPlayList {
      // margin-bottom: 10px;
      width: 205px;
      height: 260px;
      box-sizing: border-box;

      .image {
        position: relative;
        margin-bottom: 10px;
        width: 200px;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        transition: 0.2s;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
          // height: 210px;
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .playCount {
          position: absolute;
          z-index: 99;
          right: 10px;
          background: transparent;
        }
      }

      p {
        font-size: 15px;
        padding: 0 10px;
        // width: 100%;
        transition: 0.2s;
        overflow: hidden; /*必须结合的属性,当内容溢出元素框时发生的事情*/
        text-overflow: ellipsis; /*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
        display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
        -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
        -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
        span {
          &:hover {
            color: rgb(145, 245, 228);
            cursor: pointer;
          }
        }
      }
    }
  }
}
.h2title {
  margin-top: 10px;
  text-align: left;
}
</style>