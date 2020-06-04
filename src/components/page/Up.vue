<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件上传</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
  
    <el-link :underline="false" type="danger">基本信息填写</el-link>
    <el-divider></el-divider>

    <div class="input">
      <span>
        文件类型：
        <el-select style="width:150px" placeholder="请选择" v-model='fileType'>
          <el-option
            v-for="item in fileTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <span>
        一级行业：
        <el-select style="width:150px" placeholder="请选择" v-model='fileType'>
          <el-option
            v-for="item in fileTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <span>
        二级行业：
        <el-select style="width:150px" placeholder="请选择" v-model='fileType'>
          <el-option
            v-for="item in fileTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
    </div>
    <br />
    <br />
    <el-link :underline="false" type="primary">上传</el-link>
    <el-divider></el-divider>

    <el-upload
      drag
      action="http://localhost:3000/api/file/up"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip">上传列表</div>
    </el-upload>
    <br />
    <br />
    <el-link :underline="false" type="success">我的上传</el-link>
    <el-divider></el-divider>

    <div class="head-input">
      <span>
        关键字：
        <el-input style="width:150px" placeholder="请输入"></el-input>
      </span>
      <div>
        <el-button type="danger">搜索</el-button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="type" label="文件类型"></el-table-column>
      <el-table-column prop="name" label="文件名"></el-table-column>
      <el-table-column prop="date" label="上传时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button>重新上传</el-button>
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
      fileType:'',
      tableData: [
        {
          type: "项目建议书",
          name: "2019项目建议书",
          date: "2020-4-29"
        }
      ],
      fileTypes: [
        {
          label: '开发中',
          value: '开发中'
        }
      ]
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
}
.head-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20%;
}
</style>
