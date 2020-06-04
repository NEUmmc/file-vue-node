<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <br />
    <div class="head-input">
      <span>
        用户名：
        <el-input style="width:150px" placeholder="请输入"></el-input>
      </span>
      <div>
        <el-button type="danger">查询</el-button>
        <el-button type="danger">新增</el-button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button>修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "admin",
          password: "admin"
        },
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.head-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 25%;
}
</style>
