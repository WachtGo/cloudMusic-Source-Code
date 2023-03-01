<template>
  <!-- 暂时开启该功能 -->
  <div>
    <div v-if="!loginStatus" class="login" @click="goLogin">登录</div>
    <div v-if="loginStatus" class="user">
      <img class="userAvatar" :src="user.avatarUrl" alt="" /><span
        class="nickName"
        >{{ user.nickname }}</span
      >
      <ul>
        <li class="logined-li" @click="loginOut">退出登录</li>
      </ul>
    </div>
    <!-- <el-button style="color: black" @click="getloginStatus"
      >登录状态获取</el-button
    >
    <button @click="ceshi">登录,测试</button>
    <el-button style="color: black" @click="getuserDetail"
      >获取用户详情</el-button
    > -->
    <!-- <el-button style="color: black" @click="getAccount">获取账号信息</el-button> -->
    <div class="loginWrap" v-show="loginWrapShow">
      <p class="loginClose" @click="loginWrapShow = false">
        <i class="el-icon-close"></i>
      </p>
      <div class="imgWrap">
        <canvas id="QRCode_header"></canvas>
      </div>
      <p class="refreshQr">
        <span @click="refreshQr">刷新二维码</span>
      </p>
      <p id="qrStatus" @click="getqrStatus">{{ qrStatus }}</p>
      <p class="enter" @click="getqrStatus">
        请使用网易云音乐app进行扫码-确认登录后，若未自动跳转则手动点击此处进入
      </p>
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
// import { mapMutations, mapState } from "vuex";
import { getuserDetail, getAccount } from "@/api/user";
import { cookieParser, getTimestamp } from "@/utils/commonApi";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";

export default {
  name: "Login",
  data() {
    return {
      loginWrapShow: false, //展示登录窗口
      qrStatus: "",
      qrtimer: null,
      key: "",
      user: {
        avatarUrl: "",
        nickname: "",
      },
      loginStatus: false,
    };
  },
  computed: {
    // ...mapState("login", ["loginWrapShow", "loginStatus"]),
  },
  watch: {
    // loginWrapShow: async function () {
    //   var that = this;
    //   if (that.loginWrapShow) {
    //     // console.log(document);
    //     let adom = await document.getElementById("qrStatus");
    //     // console.log("adom", adom);
    //     that.qrtimer = setInterval(() => {
    //      adom.click();
    //       // console.log("刷新");
    //     }, 1500);
    //   } else {
    //     clearInterval(that.qrtimer);
    //     console.log("扫码登录成功");
    //   }
    // },
  },
  mounted() {
    localStorage.getItem("loginStatus")
      ? (this.loginStatus = localStorage.getItem("loginStatus"))
      : (this.loginStatus = false);
    this.getloginStatus();
  },
  methods: {
    // ...mapMutations("login", ["loginWrapOnOff", "loginStatusOnOff"]),
    ceshi() {
      let a =
        "MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Mon, 27 Feb 2023 15:10:28 GMT; Path=/;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/weapi/feedback; HTTPOnly;__csrf=a7ae33e29d089a9e30774e67bfd99367; Max-Age=1296010; Expires=Tue, 14 Mar 2023 15:10:38 GMT; Path=/;;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_U=6bf80db2682091e66db7c358940e6034f555d03d999284f42033476c98e45796993166e004087dd3e30340b48322c4fd7a82616b73ff591e0195ea446a99c0ab92386fc4f57b0915a0d2166338885bd7; Max-Age=15552000; Expires=Sat, 26 Aug 2023 15:10:28 GMT; Path=/; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1481119727062; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1481119757789; Max-Age=2147483647; Expires=Sat, 17 Mar 2091 18:24:35 GMT; Path=/api/clientlog; HTTPOnly";

      let cookies = cookieParser(a);
      //两个都设置上才能请求成功
      setCookie("MUSIC_U", cookies[0]);
      setCookie("__csrf", cookies[1]);
    },
    goLogin() {
      //点击登录，获取二维码
      // this.loginWrapOnOff(true);
      this.loginWrapShow = true;
      this.refreshQr();
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
      QRCode.toCanvas(msg, qrurl, opts, function (error) {
        // console.log(error)
      });
    },
    //  获取/刷新二维码
    refreshQr() {
      let params = {
        timestamp: getTimestamp(),
      };
      // console.log(params.timestamp)
      getqrKey(params).then(async (res) => {
        this.key = await res.data.data.unikey;
        let params = {
          key: res.data.data.unikey,
          // timestamp: getTimestamp()
        };
        getqrImg(params).then((res) => {
          // console.log(res.data.data.qrurl);
          this.getQRCode(res.data.data.qrurl);
        });
      });
    },
    // 二维码状态
    getqrStatus() {
      let params = {
        key: this.key,
        timestamp: getTimestamp(),
      };
      getqrStatus(params).then(async (res) => {
        this.qrStatus = await res.data.message;
        if (res.data.code === 803) {
          this.qrStatus += ",1s后自动关闭";
          // console.log("登录成功：--", res);
          let cookies = cookieParser(res.data.cookie);
          setCookie("__csrf", cookies[1]);
          setTimeout(() => {
            this.loginWrapShow = false; //关闭登录窗口
            //  this.loginWrapOnOff(false);
            this.$message({
              type: "success",
              message: "已登录",
            });
          }, 1000);
          this.getloginStatus();
        } else if (res.data.code === 800) {
          this.qrStatus += ",请刷新获取";
        }
      });
    },

    //获取登录状态
    getloginStatus() {
      // console.log("this.loginStatus", this.loginStatus);
      // console.log("----------", getCookie("MUSIC_U"), getCookie("__csrf"));
      if (getCookie("__csrf")) {
        this.loginStatus = true;
        localStorage.setItem("loginStatus", true);
        // console.log("登录成功", this.loginWrapShow);
      } else {
        // this.$message({
        //   type: "error",
        //   message: "当前未登录",
        // });
        this.loginStatus = false;
        localStorage.setItem("loginStatus", false);
        this.user = {};
      }
      getloginStatus().then(async (res) => {
        // console.log("getloginStatus", res.data.data.profile);
        if (res.data.data.profile) {
          this.user = await res.data.data.profile;
        }
      });
    },
    //退出登录
    loginOut() {
      loginOut().then((res) => {
        removeCookie("__csrf");
        this.loginStatus = false;
        localStorage.removeItem("loginStatus");
        this.user = {};
        // this.getloginStatus(); //获取登陆状态
      });
    },
    //获取账户信息-需要与获取登陆状态api都调用，才会真实的刷新登陆状态
    // getAccount() {
    //   getAccount().then((res) => {
    //     console.log("账号信息---：", res.data.profile);
    //   });
    // },
    // 获取用户详情
    // getuserDetail() {
    // 374598092 Wacht丶T
    // getuserDetail({ uid: 374598092 }).then((res) => {
    // console.log("用户详情---：", res);
    // });
    // },
  },
};
</script>

<style lang="less" scoped>
.login,
.user {
  position: absolute;
  // width: 150px;
  height: 32px;
  top: 0;
  right: 10px;
  color: rgba(238, 238, 238, 0.61);
  text-align: center;
  overflow: hidden;
  transition: 0.2s;
  // background: rgb(161, 145, 139);
  &:hover {
    height: 64px;
    transform: scale(1.01);
  }

  .userAvatar {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .nickName {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  .logined-li {
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    transition: 0.2s;
    padding: 0 10px;
    background: rgba(160, 160, 160, 0.041);

    &:hover {
      cursor: pointer;
      color: rgb(39, 177, 131);
      transform: scale(1.01);
    }
  }
}
.login {
  &:hover {
    cursor: pointer;
    color: rgb(187, 145, 90);
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
  border-radius: 15px;
  background: url(@/static/img/background8.jpeg);

  .loginClose {
    position: absolute;
    height: 20px;
    top: 15px;
    right: 15px;

    color: rgb(221, 191, 151);
    transition: 0.2s;
    /deep/ .el-icon-close {
      font-size: 20px;

      &:hover {
        cursor: pointer;
        color: rgb(187, 145, 90);
      }
    }
  }
  .imgWrap {
    // display: inline-block;
    margin: 45px auto 0;
    width: 180px;
    height: 180px;
    #QRCode_header {
      margin: auto;
    }
  }
  #qrStatus {
    color: #eee;
    text-align: center;
    // background-color: #eee;
  }
  .refreshQr {
    padding: 5px;
    color: rgba(255, 255, 255, 0.808);

    text-align: center;
    transition: 0.2s;
    span {
      font-size: 15px;
      transition: 0.2s;
      &:hover {
        color: rgba(221, 191, 152);
        cursor: pointer;
      }
    }
  }
  .enter {
    position: absolute;
    bottom: 5px;
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