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
        <el-select placeholder="请选择" @change="setLevel2" v-model="level1">
          <el-option v-for="item in level1s" :key="item.value" :label="item.label" :value="item"></el-option>
        </el-select>
      </span>

      <span>
        二级行业：
        <el-select placeholder="请选择" v-model="level2" @change="setUploadData">
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
        action="http://39.99.161.110:3002/api/file/up"
        :data="uploadData"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="fileChange"
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
        <el-input style="width:200px" placeholder="请输入文件名" v-model="filename"></el-input>
      </span>
      <div>
        <el-button type="danger" @click="search">搜索</el-button>
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
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column
        prop="filetype"
        label="文件类型"
        :filters="filterFileType"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column prop="level1" label="一级行业"></el-table-column>
      <el-table-column prop="level2" label="二级行业"></el-table-column>
      <el-table-column prop="name" label="文件名" width="400"></el-table-column>
      <el-table-column prop="note" label="备注" width="200"></el-table-column>
      <el-table-column prop="time" sortable label="上传时间" width="200"></el-table-column>
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
      filename: "",
      note: "",
      fileList: [],
      count: 0,
      fileType: "",
      level1: "",
      level2: "",
      tableData: [],
      currentPage: 1, //默认页码为1
      pagesize: 6, //默认一页显示6条
      fileTypes: [],
      level1s: [],
      level2s: [],
      filterFileType:[],
      uploadData: null //上传时候的参数
    };
  },
  mounted() {
    this.$post("/api/file/getFile").then(res => {
      this.tableData = res;
    });
    this.$get("/api/file/getFileType").then(res => {
      let temp = [];
      let filter = [];
      for (let i of res) {
        temp.push({ label: i.type, value: i.id });
        filter.push({ text: i.type, value: i.type });
      }
      this.fileTypes = temp;
      this.filterFileType = filter;
    });
    this.$get("/api/file/getLevel1").then(res => {
      let temp = [];
      for (let i of res) {
        temp.push({ label: i.name, value: i.id });
      }
      this.level1s = temp;
    });
  },
  methods: {
    setUploadData() {
      this.uploadData = {
        fileType: this.fileType.label,
        level1: this.level1.label,
        level2: this.level2.label
      };
    },
    submitUpload() {
      if (this.level2 == "" || this.level1 == "" || this.fileType == "") {
        this.$message.warning("标签不能为空");
      } else if (this.count == 0) {
        this.$message.warning("请先选择文件");
      } else {
        this.uploadData.note = this.note;
        this.$refs.upload.submit();
        this.reload();
        this.$message.success("上传成功");
      }
    },
    fileChange(file, fileList) {
      this.count++;
      console.log(this.count);
    },
    handleRemove(file, fileList) {
      this.count--;
      console.log(this.count);
    },
    setLevel2() {
      if (this.fileType == "") {
        this.$message.warning("请先选择文件类型");
        this.level1 = "";
      } else {
        this.$post("/api/file/getLevel2", {
          parent_id: this.level1.value
        }).then(res => {
          let temp = [];
          for (let i of res) {
            temp.push({ label: i.name, value: i.id });
          }
          this.level2 = "";
          this.level2s = temp;
        });
      }
    },
    /**文件列表方法*/
    search(){
      this.$post("/api/file/search",{
        filename: this.filename
      }).then(res => {
      this.tableData = res;
    });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
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
      let url = "http://39.99.161.110:3002/api/file/down?filename=" + row.name;
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
