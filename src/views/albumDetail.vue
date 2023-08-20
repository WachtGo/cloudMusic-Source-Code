<template>
  <div class="list-wrap">
    <div class="pageName">专辑详情</div>
    <div class="descript"></div>
    <div>
      <div class="ul">
        <div class="details">
          <div class="details-img">
            <img :src="albumDesc.blurPicUrl" alt=" " />
          </div>
          <div class="detailsRight">
            <div style="margin-left: 0px; text-align: left; font-size: 20px">
              {{ albumDesc.name }}
            </div>
            <div style="font-size: 14px">
              <div class="aliasClass">
                <img
                  class="artistPic"
                  :src="albumDesc.artist.img1v1Url"
                  alt=" "
                />-
                <span class="playListNickName">{{
                  albumDesc.artist.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="singleSongs">
          <div class="countLine">专辑歌曲：{{ albumDesc.size }} 首</div>
          <div v-if="albumSongs.length !== 0 " >
            <songlist :songlist="albumSongs"></songlist>
          </div>
          <div v-else class="loading">
            <i class="el-icon-loading"></i>
          </div>
          
        </div>
      </div>
    </div>
    <div v-show="false">
      <aplayer :autoplay="true" :fixed="true" :audio="listen" :liric-type="1">
      </aplayer>
    </div>
  </div>
</template>

<script>
import { getAlbumContent, getDownloadUrl } from "@/api/api";
import { transMusicTime, download } from "@/utils/commonApi";
import songlist from "@/components/songlist.vue";

export default {
  components: {
    songlist,
  },
  data() {
    return {
      listen: [],
      albumId: "",
      albumSongs: [],
      albumDesc: {
        artist: { img1v1Url: "" },
      },
    };
  },
  mounted() {
    //进入专辑详情，判断是否有路由信息传入
    if (this.$route.params.albumDesc) {
      this.albumDesc = this.$route.params.albumDesc;
      localStorage.setItem(
        "albumDesc",
        JSON.stringify(this.$route.params.albumDesc)
      );
      this.getAlbumContent();
    } else {//没有路由信息，说明刷新了页面，则尝试使用之前的缓存信息
        this.albumDesc = JSON.parse(localStorage.getItem("albumDesc"));  
    }
    //获取专辑信息
    this.getAlbumContent()



  },
  methods: {
    getAlbumContent() {
      var that = this;
      let params = {
        id: that.albumDesc.id,
      };
      getAlbumContent(params).then((res) => {
        // console.log("专辑信息---：", res.data.album);
        // console.log("专辑歌曲---：", res.data.songs);
        that.albumSongs = res.data.songs;
        that.albumDesc = res.data.album;
        //给每个列表添加一个防抖
        for (let item of that.albumSongs) {
          that.$set(item, "timer", true);
        }
        let dt = "dt";
        transMusicTime(that.albumSongs, dt);
      });
    },

    //根据主题更换播放器颜色
    // randomColor() {
    //   return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    // },
  },
};
</script>

<style lang="less" >
.descript {
  display: flex;
  justify-content: space-between;
  // color: aliceblue;
  font-weight: bolder;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  // background: rgba(221, 239, 243, 0.05);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto 0;
  padding: 0 20px 10px;
  width: 1120px;
  border-radius: 20px;
  // background: rgba(221, 239, 243, 0.05);
  box-sizing: border-box;

  .ul {
    height: 630px;
    border-radius: 0 0 10px 10px;
    // background: rgba(221, 239, 243, 0.05);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .details {
      display: flex;
      justify-content: space-between;
      margin: 0 auto 10px;
      padding: 10px;
      width: 96%;
      height: 170px;
      // border: 1px solid rgb(97, 226, 183);
      border-radius: 10px;
      // background: rgba(221, 239, 243, 0.05);
      box-sizing: border-box;

      .details-img {
        display: inline-block;
        // width: 180px;
        // height: 180px;
        border-radius: 10px;

        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          transition: 0.2s;

          &:hover {
            transform: scale(1.03);
          }
        }
      }

      .detailsRight {
        position: relative;
        width: 820px;
        height: 150px;
        // background: rgb(181, 209, 152);

        .option {
          position: absolute;
          bottom: 0;

          .flexBetween {
            .inline-block {
              display: inline-block;
              margin-right: 40px;
              transition: 0.2s;

              &:hover {
                cursor: pointer;
                // color: rgb(246, 255, 119);
              }
            }
          }
        }
        .songTns {
          width: 100%;
          font-size: 14px;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            display: none;
          }
        }
        .aliasClass {
          position: absolute;
          top: 69px;
        }
        .artistPic {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
        .playListNickName {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
    #singleSongs {
      margin: 0 auto;
      padding: 0px 10px 20px;
      width: 96%;
      height: 520px;
      border-radius: 10px;
      // background: rgba(95, 158, 160, 0.05);
      box-sizing: border-box;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.pagination {
  text-align: center;
  background: none !important;

  /deep/ .el-pager {
    height: 30px !important;
    background: none !important;
  }
  /deep/ .number,
  /deep/ .btn-prev,
  /deep/ .btn-quicknext,
  /deep/ .btn-next,
  /deep/ .el-input__inner,
  /deep/ .more {
    color: #f2fff7 !important;
    background: transparent !important;
  }
  /deep/ .number:hover,
  /deep/ .btn-prev:hover,
  /deep/ .btn-quicknext:hover,
  /deep/ .btn-next:hover,
  /deep/ .el-input__inner:hover,
  /deep/ .more:hover {
    color: #f7a588 !important;
  }
  /deep/ .active {
    color: #f7a588 !important;
  }
  /deep/ .el-input__inner {
    border: none;
  }
  /deep/ .el-pagination__jump {
    color: #f7dd88 !important;
  }
  .iconhover {
    transition: 0.2s;
    &:hover {
      color: rgb(247, 243, 45);
    }
  }
}
</style>
