<template>
  <div class="list-wrap">
    <h3><i class="el-icon-loading"></i></h3>
    <div class="descript"></div>
    <ul></ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    setTimeout(() => {
      this.gotoPage(this.$route.params);
    }, 500);
  },
  methods: {
    gotoPage(routerInfo) {
      //接收传来的路由配置，进行跳转
      this.$router.push(routerInfo);
    },
  },
};
</script>

<style lang='less'>
h3 {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.descript {
  display: flex;
  justify-content: space-between;
  color: aliceblue;
  font-weight: bolder;
  padding: 10px 20px;
  border-radius: 20px 20px 0 0;
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto;
  padding: 0 20px 10px;
  width: 1120px;
  height: 730px;
  border-radius: 20px;
  background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  ul {
    height: 630px;
    border-radius: 0 0 10px 10px;
    background: rgba(95, 158, 160, 0.11);
    overflow-x: hidden;
  }
}
</style>