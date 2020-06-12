<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件上传</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <el-link :underline="false" type="danger">上传管理</el-link>
    <el-divider></el-divider>
    <div class="input">
      <span>
        文件类型：
        <el-select placeholder="请选择" v-model="fileType">
          <el-option v-for="item in fileTypes" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </span>

      <span>
        一级行业：
        <el-select placeholder="请选择" @change="setLevel2($event)" v-model="level1">
          <el-option v-for="item in level1s" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </span>

      <span>
        二级行业：
        <el-select placeholder="请选择" v-model="level2">
          <el-option v-for="item in level2s" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </span>

      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:3000/api/file/up"
        :data="uploadData"
        :before-upload="beforeUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </el-upload>
    </div>

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
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      fileType: "",
      level1: "",
      level2: "",
      tableData: [
        {
          type: "项目建议书",
          name: "2019项目建议书",
          date: "2020-4-29"
        }
      ],
      fileTypes: [],
      level1s: [],
      level2s: [],
      uploadData: null //上传时候的参数
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload() {
      //在上传之前 设定除文件外的额外参数
      if (this.fileType == "" || this.level1 == "" || this.level2 == "") {
        this.$message.error("请选择标签");
        return false;
      }
      this.uploadData = {
        fileType: this.fileType.value,
        level1: this.level1.value,
        level2: this.level2.value
      };
      console.log(this.uploadData);
      let promise = new Promise(resolve => {
        this.$nextTick(function() {
          resolve(true);
        });
      });
      return promise; //通过返回一个promise对象解决
    },
    setLevel2(prop) {
      this.$post("/api/file/getLevel2", { parent_id: prop.value }).then(res => {
        let temp = [];
        for (let i of res) {
          temp.push({ label: i.name, value: i.id });
        }
        this.level2 = "";
        this.level2s = temp;
      });
      // let tempArray = [];
      // this.level2s = [];
      // for (var item of area2) {
      //   if (item[0] === prop.value) {
      //     // console.log(prop);
      //     tempArray.push({ label: item[2], value: item[1] });
      //     this.level2s = tempArray;
      //   }
      // }
      //笨比切换实现 by lb
    }
  },
  mounted() {
    this.$get("/api/file/getFileType").then(res => {
      let temp = [];
      for (let i of res) {
        temp.push({ label: i.type, value: i.id });
      }
      this.fileTypes = temp;
    });
    this.$get("/api/file/getLevel1").then(res => {
      let temp = [];
      for (let i of res) {
        temp.push({ label: i.name, value: i.id });
      }
      this.level1s = temp;
    });
  }
};
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}
.head-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20%;
}
</style>
