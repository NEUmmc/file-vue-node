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

      <span>
        备注：
        <el-input style="width:200px" placeholder="请输入备注" v-model="note"></el-input>
      </span>

      <el-upload
        style="width:300px"
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
    <el-link :underline="false" type="success">文件查询</el-link>
    <el-divider></el-divider>
    <div class="head-input">
      <span>
        关键字：
        <el-input style="width:200px" placeholder="请输入"></el-input>
      </span>
      <div>
        <el-button type="danger">搜索</el-button>
        <el-button type="danger" @click="refresh">刷新</el-button>
      </div>
    </div>
    <br />
    <el-table
      height="400"
      size="medium"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="文件名" width="600"></el-table-column>
      <el-table-column prop="time" sortable label="上传时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button>在线阅读</el-button> -->
          <el-button size="small" type="danger" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6,8,10,tableData.length]"
      :page-size="pagesize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      note: "",
      fileList: [],
      fileType: "",
      level1: "",
      level2: "",
      tableData: [],
      currentPage: 1, //默认页码为1
      pagesize: 6, //默认一页显示6条
      fileTypes: [],
      level1s: [],
      level2s: [],
      uploadData: null //上传时候的参数
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      this.reload();
      this.$message.success("上传成功");
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
      this.$post("/api/file/getLevel2", { parent_id: this.level1.value }).then(
        res => {
          let temp = [];
          for (let i of res) {
            temp.push({ label: i.name, value: i.id });
          }
          this.level2 = "";
          this.level2s = temp;
        }
      );
    },
    /**文件列表方法*/
    handleSizeChange(size) {
      //一页显示多少条
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },
    refresh() {
      this.reload();
    },
    download(row) {
      let url = "http://localhost:3000/api/file/down?filename=" + row.name;
      // window.open(url);//会有闪现，造成不好的用户体验
      this.downloadByIframe(url); //用户体验好但可能耗费浏览器资源，部分浏览器可能不支持
    },
    downloadByIframe(url) {
      var iframe = document.getElementById("myIframe");
      if (iframe) {
        iframe.src = url;
      } else {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        iframe.id = "myIframe";
        document.body.appendChild(iframe);
      }
    }
  },
  mounted() {
    this.$post("/api/file/getFile").then(res => {
      this.tableData = res;
    });
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
  /* align-items: center; */
  width: 100%;
}
.head-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
}
</style>
