<template>
  <!-- 暂时不开启该功能 -->
  <div>
    <div v-if="!user" class="login" @click="goLogin">登录</div>
    <div v-if="user" class="user">
      <img class="userAvatar" :src="user.avatarUrl" alt=" " /><span class="nickName">{{ user.nickname }}</span>
      <ul>
        <li class="logined-li" @click="golike">我的歌单</li>
        <li class="logined-li" @click="loginOut">退出登录</li>
      </ul>
    </div>
    <!-- <li class="logined-li" @click="loginOut">退出登录</li> -->
    <!-- <el-button style="color: black" @click="getloginStatus"
      >登录状态获取</el-button
    >
    <button @click="ceshi">登录,测试</button>
    <el-button style="color: black" @click="getuserDetail"
      >获取用户详情</el-button
    > -->
    <!-- <el-button style="color: black" @click="getAccount">获取账号信息</el-button> -->
    <div class="loginWrap" v-show="loginWrapShow">
      <!-- 关闭窗口 -->
      <div class="loginClose_wrap">
        <p class="loginClose" @click="loginWrapShow = false; qrshowed = false">
          <i class="el-icon-close"></i>
        </p>
      </div>
      <!-- 二维码 -->
      <div class="imgWrap">
        <div v-show="!qrshowed" class="qrloading_wrap">
          <div class="qrloading absolute_center">
            <i class=" el-icon-loading " style=" font-size: 45px;color:#eee"></i>
          </div>
        </div>
        <div v-show="qrshowed">
          <canvas id="QRCode_header"></canvas>
        </div>
      </div>
      <!-- 二维码刷新 -->
      <p class="refreshQr">
        <span @click="refreshQr">刷新二维码</span>
      </p>
      <p id="qrStatus">
        {{ qrStatus }}<i v-if="qrloading" class="el-icon-loading"></i>
      </p>
      <p class="enter" @click="
        getqrStatus();
      qrloading = true;
                                        ">
        <span>使用网易云音乐app进行扫码,可能会有所延迟,不用多次扫码,手动点击此处进入</span>
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
import { cookieParser, getTimestamp } from "@/utils/commonApi";

export default {
  name: "Login",
  data() {
    return {
      loginWrapShow: false, //展示登录窗口
      qrStatus: "",
      qrtimer: null,
      qrshowed: false,
      key: "",
      qrloading: false, //点击判断是否已经授权时的加载图标状态
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    // if (localStorage.getItem("user")) {
    //   this.user = JSON.parse(localStorage.getItem("user"));
    // }
    // this.getloginStatus();
  },
  methods: {
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
      this.qrshowed = true
    },
    //  获取/刷新二维码
    refreshQr() {
      this.qrshowed = false
      let params = {
        timestamp: getTimestamp(),
      };
      // console.log(params.timestamp)
      getqrKey(params).then(async (res) => {
        this.key = await res.data.data.unikey;
        let params = {
          key: res.data.data.unikey,
        };
        getqrImg(params).then((res) => {
          this.getQRCode(res.data.data.qrurl);
        });
      });
    },
    // 二维码状态
    getqrStatus() {
      this.qrloading = true;
      let params = {
        key: this.key,
      };
      getqrStatus(params).then(async (res) => {
        this.qrStatus = await res.data.message;
        if (res.data.code === 803) {
          // clearInterval(this.qrtimer);
          // console.log("扫码登录成功");
          let cookies = cookieParser(res.data.cookie);
          this.$store.commit("setTOKEN", cookies[1]); //设置好了token
          setTimeout(() => {
            this.loginWrapShow = false; //关闭登录窗口
            this.$message.success("已登录");
          }, 500);
          this.getloginStatus();
        } else if (res.data.code === 800) {
          this.qrStatus += ",请刷新获取";
        } else if (res.data.code === 400) {
          this.qrStatus = "请求错误";
        }
        this.qrloading = false;
      });
    },

    //获取登录状态
    getloginStatus() {
      getloginStatus().then(async (res) => {
        // console.log(res.data.data.profile);
        if (res.data.data.profile) {
          this.$store.commit("setUSER", {
            avatarUrl: res.data.data.profile.avatarUrl,
            nickname: res.data.data.profile.nickname,
            userId: res.data.data.profile.userId,
            userType: res.data.data.profile.userType,
          });
        }
      });
    },
    //退出登录
    loginOut() {
      const loading = this.$loading({
        background: "rgba(255,255,255,0.1)",
      });
      loginOut()
        .then((res) => {
          this.$nextTick(() => {
            loading.close();
          });
          this.$store.commit("removeTOKEN");
          this.$message.success("已退出登录");
          // this.getloginStatus(); //获取登陆状态
        })
        .catch((err) => {
          this.$nextTick(() => {
            loading.close();
          });
        });
    },
    golike() {
      console.log(this.user);
      this.$router.push({
        name: "myPlayList",
        params: {
          id: this.user.userId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login,
.user {
  position: absolute;
  // width: 150px;
  height: 30px;
  top: 0;
  right: 10px;
  color: rgba(238, 238, 238, 0.61);
  text-align: center;
  overflow: hidden;
  transition: 0.2s;

  // background: rgb(161, 145, 139);
  &:hover {
    height: 96px; //每次添加一个列表这里加32px
    transform: scale(1.01);
  }

  .userAvatar {
    vertical-align: top;
    margin-right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  .nickName {
    display: inline-block;
    font-size: 13px;
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

  .loginClose_wrap {
    position: relative;
    width: 100%;
    height: 45px;

    .loginClose {
      position: absolute;
      width: 35px;
      height: 35px;
      top: 10px;
      right: 10px;
      border-radius: 50%;

      color: rgb(221, 191, 151);
      transition: 0.2s;

      &:hover {
          cursor: pointer;
          background-color: #094f776c;
        }
      /deep/ .el-icon-close {
        font-size: 35px;

        &:hover {
          cursor: pointer;
          color: rgb(187, 145, 90);
        }
      }
    }
  }


  .imgWrap {
    // display: inline-block;
    margin: 0 auto;
    width: 180px;
    height: 180px;
    border-radius: 15px;
    overflow: hidden;

    .qrloading_wrap{
      position: relative;
      // background-color: #fff;
      width: 180px;
      height: 180px;
    }
    .qrloading {
      // position: absolute;
      width: 45px;
      height: 45px;
      // background-color: #694646;
    }

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