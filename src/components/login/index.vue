<template>
  <!-- 暂时开启该功能 -->
  <div>
    <div class="login" @click="goLogin">登录</div>
    <button style="color: black" @click="getloginStatus">登录状态获取</button>
    <button style="color: black" @click="loginOut">退出登录</button>
    <button style="color: black" @click="getuserDetail">获取用户详情</button>
    <div class="loginWrap" v-if="loginWrapShow">
      <p class="loginClose" @click="loginWrapShow = false">
        <i class="el-icon-close"></i>
      </p>
      <div class="imgWrap">
        <canvas id="QRCode_header"></canvas>
      </div>
      <p class="refreshQr"><span @click="refreshQr">刷新二维码</span></p>
      <p class="qrStatus">{{ qrStatus }}</p>
      <p class="enter" @click="getqrStatus">扫码确认登录后，点击此处进入</p>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import {
  getqrKey,
  getqrImg,
  getqrStatus,
  getloginStatus,
  loginOut,
} from "@/api/login";
import { getuserDetail } from "@/api/user";
import { getTimestamp } from "@/utils/commonApi";
export default {
  name: "Login",
  data() {
    return {
      loginWrapShow: false,
      qrStatus: "",
      qrtimer: null,
      key: "",
    };
  },
  methods: {
    goLogin() {
      this.loginWrapShow = true;
      let params = {
        timestamp: getTimestamp(),
      };
      // console.log(params.timestamp)
      getqrKey(params).then((res) => {
        this.key = res.data.data.unikey;
        let params = {
          key: res.data.data.unikey,
          // timestamp: getTimestamp()
        };
        getqrImg(params).then((res) => {
          console.log(res.data.data.qrurl);
          this.getQRCode(res.data.data.qrurl);
        });
      });
    },
    //生成二维码
    getQRCode(qrurl) {
      let opts = {
        errorCorrectionLevel: "H", //容错级别
        type: "image/png", //生成的二维码类型
        quality: 0.3, //二维码质量
        margin: 5, //二维码留白边距
        width: 180, //宽
        height: 180, //高
        text: "", //二维码内容
        color: {
          dark: "#333333", //前景色
          light: "#fff", //背景色
        },
      };
      this.QRCodeMsg = qrurl; //生成的二维码为URL地址js
      let msg = document.getElementById("QRCode_header");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
        // console.log(error)
      });
    },
    //刷新二维码
    refreshQr() {
      this.goLogin();
    },
    // 二维码状态
    getqrStatus() {
      let params = {
        key: this.key,
        timestamp: getTimestamp(),
      };
      getqrStatus(params).then((res) => {
        console.log(res);
        this.qrStatus = res.data.message;
        console.log(this.qrStatus);
        if (res.data.code === 803) {
          this.$store.commit("setTOKEN", res.data.cookie);
          setTimeout(() => {
            this.loginWrapShow = false;
          }, 1000);
        } else if (res.data.code === 800) {
          this.qrStatus += ",请刷新获取";
        }
      });
    },
    //获取登录状态
    getloginStatus() {
      let params = {
        timestamp: getTimestamp(),
      };
      getloginStatus(params).then((res) => {
        if (res.data.data.code === 200) {
          console.log(res.data.data.account);
          console.log("已登陆");
        }
      });
    },
    //退出登录
    loginOut() {
      let params = {
        // cookie: "MUSIC_SNS=; Max-Age=0; Expires=Sun, 07 Aug 2022 07:29:20 GMT; Path=/;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/wapi/feedback; HTTPOnly;NMTID=00O7WKRxVwcZw0Uw0D6ubODlxpdLj4AAAGCdzVVLw; Max-Age=315360000; Expires=Wed, 04 Aug 2032 07:29:20 GMT; Path=/;;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_U=9611c371e6419e2c184a366a7ca936bfe793a0a6f0d4dbbbb88db8dba5edf83d993166e004087dd37a99ad5471c3636273479095928a9cef26de8349c63f526ad40a31ebc291eb4ad4dbf082a8813684; Max-Age=15552000; Expires=Fri, 03 Feb 2023 07:29:20 GMT; Path=/; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/eapi/feedback; HTTPOnly;__csrf=d1f2fa83b3815f03a3448349af4ecc04; Max-Age=1296010; Expires=Mon, 22 Aug 2022 07:29:30 GMT; Path=/;;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1659792787979; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1659792788186; Max-Age=2147483647; Expires=Fri, 25 Aug 2090 10:43:27 GMT; Path=/neapi/clientlog; HTTPOnly",
      };
      loginOut(params).then((res) => {
        this.$store.commit("removeTOKEN", "token");
      });
    },
    //获取用户详情
    getuserDetail() {
      getuserDetail({ uid: 7978233287 }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  right: 10px;
  color: rgba(238, 238, 238, 0.61);
  text-align: center;
  // background: rgb(161, 145, 139);
  &:hover {
    cursor: pointer;
    color: #eee;
  }
}
.loginWrap {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 300px;
  background-color: rgba(51, 73, 128, 0.856);

  .loginClose {
    position: absolute;
    height: 20px;
    top: 5px;
    right: 5px;
    /deep/ .el-icon-close {
      font-size: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .imgWrap {
    // display: inline-block;
    margin: 50px auto 0;
    width: 180px;
    height: 180px;
    #QRCode_header {
      margin: auto;
    }
  }
  .qrStatus {
    text-align: center;
    // background-color: #eee;
  }
  .refreshQr {
    color: rgba(255, 255, 255, 0.808);
    margin-bottom: 20px;
    text-align: center;
    transition: 0.2s;
    span {
      font-size: 15px;
      &:hover {
        color: rgb(228, 74, 74);
        cursor: pointer;
      }
    }
  }
  .enter {
    position: absolute;
    bottom: 0;
    right: 5px;
    font-size: 14px;
    color: rgba(221, 191, 152, 0.788);
    transition: 0.2s;
    &:hover {
      color: rgba(221, 191, 152);
      cursor: pointer;
    }
  }
}
</style>