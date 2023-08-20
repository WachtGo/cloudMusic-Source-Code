
<template>
  <div id="app">
    <div class="app_main">
      <HeaderNav></HeaderNav>
      <AppBody></AppBody>
    </div>
    <div class="aplayer_wrap">
      <aplayer></aplayer>
    </div>
  </div>
</template>
<script>
import HeaderNav from "./components/HeaderNav.vue";
import AppBody from "./components/AppBody.vue"
import aplayer from "@/components/aplayer.vue";

export default {
  name: "App",
  components: {
    HeaderNav,
    AppBody,
    aplayer,
  },
  data() {
    return {};
  },
  mounted() { },
  methods: {},
};
</script>
<style lang="less">
@import "@/style/common.less";

#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 915px;
  border-radius: 20px;
  cursor: default;
  .app_main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 830px;
    border-radius: 20px;
    background: url(@/static/img/background8.jpeg);
    box-shadow: 0 0 15px 5px #f8f8f81f;
  }

  .aplayer_wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}


// }
</style>
