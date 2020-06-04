<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <br />
    <div class="temp">
      <img class="img" src="../../assets/coding.png" alt="开发中" title="开发中....." />开发中.....
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.img {
  width: 30%;
}
.temp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
