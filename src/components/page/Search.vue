<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件查询</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <br />

    <div class="head-input">
      <span>
        关键字：
        <el-input style="width:150px" placeholder="请输入"></el-input>
      </span>
      <div>
        <el-button type="danger">搜索</el-button>
        <el-button type="danger" @click="refresh">刷新</el-button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <el-table size='medium' :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="文件名" width="600"></el-table-column>
      <el-table-column prop="time" label="上传时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button>在线阅读</el-button> -->
          <el-button size='small' type="danger" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,4,6,7]"
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
      tableData: [],
      currentPage: 1, //默认页码为1
      pagesize: 6, //默认一页显示10条
    };
  },
  mounted() {
    this.$post("/api/file/getFile").then(res => {
      this.tableData = res;
    });
  },
  methods: {
    handleSizeChange(size) {
      //一页显示多少条
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      //页码更改方法
      this.currentPage = currentPage;
    },
    refresh(){
      this.reload();
    },
    download(row) {
      let url = "http://localhost:3000/api/file/down?filename=" + row.name;
      // window.open(url);//会有闪现，造成不好的用户体验
      this.downloadByIframe(url)//用户体验好但可能耗费浏览器资源，部分浏览器可能不支持
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
  width: 60%;
}
.head-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 25%;
}
</style>
