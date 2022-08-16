
<template>
  <div>
    <div class="wrap">
      <!-- app外层套个盒子，防止由于fixed拖拽乱跳 -->

      <div id="app">
        <HeaderNav></HeaderNav>
        <keep-alive :include="['mvPlay','videoPlay']">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <aplayer></aplayer>
    <!-- <Login></Login> -->
  </div>
</template>
<script>
import HeaderNav from './components/HeaderNav.vue'
import aplayer from '@/components/aplayer.vue'
// import Login from "@/components/login/index"
import AlbumDetail from './views/albumDetail/albumDetail.vue'

export default {
  name: 'App',
  components: {
    HeaderNav,
    aplayer,
    // Login,
    AlbumDetail,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},

  // directives:{
  //   focus:{
  //     bind(el,binding){
  //       console.log("绑定成功")
  //     },
  //     inserted(el,binding){
  //       console.log("插入成功")
  //       el.focus()
  //     },
  //     updated(el,binding){
  //       console.log("更新")
  //     }
  //   },
  // },
}
</script>
<style lang="less">
@import '@/style/common.less';
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 1200px;
  height: 820px;
}
</style>
