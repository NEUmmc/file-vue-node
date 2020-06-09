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
            <el-option
              v-for="item in fileTypes"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </span>
      
        <span>
          一级行业：
          <el-select placeholder="请选择" @change="setLevel2($event)" v-model="level1">
            <el-option
              v-for="item in level1s"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </span>
      
        <span>
          二级行业：
          <el-select placeholder="请选择" v-model="level2">
            <el-option
              v-for="item in level2s"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </span>
      
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:3000/api/file/up"
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
    <!-- <div class="input">
      <span>
        文件类型：
        <el-select  placeholder="请选择" v-model='fileType'>
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
    </div>-->
    <br />
    <br />
    <!-- <el-link :underline="false" type="primary">上传</el-link>
    <el-divider></el-divider>

    <el-upload drag action="http://localhost:3000/api/file/up" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip">上传列表</div>
    </el-upload>
    <br />
    <br />-->
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
var area2 = new Array();//二级行业相关数据 笨比方法  by lb
area2[area2.length] = new Array("1", "1", "种植业");
area2[area2.length] = new Array("1", "2", "畜牧业");
area2[area2.length] = new Array("1", "3", "林业");
area2[area2.length] = new Array("1", "4", "渔业");
area2[area2.length] = new Array("1", "5", "副业");
area2[area2.length] = new Array("2", "6", "防洪工程");
area2[area2.length] = new Array("2", "7", "农田水利工程");
area2[area2.length] = new Array("2", "8", "水力发电工程");
area2[area2.length] = new Array("2", "9", "航道和港口工程");
area2[area2.length] = new Array("2", "10", "城镇供水和排水工程");
area2[area2.length] = new Array("2", "11", "水土保持工程和环境水利工程");
area2[area2.length] = new Array("2", "12", "渔业水利工程");
area2[area2.length] = new Array("2", "13", "海涂围垦工程");
area2[area2.length] = new Array("2", "14", "综合利用水利工程");
area2[area2.length] = new Array("3", "15", "火电");
area2[area2.length] = new Array("3", "16", "水电");
area2[area2.length] = new Array("3", "17", "核电");
area2[area2.length] = new Array("3", "18", "新能源");
area2[area2.length] = new Array("4", "19", "褐煤");
area2[area2.length] = new Array("4", "20", "烟煤");
area2[area2.length] = new Array("4", "21", "无烟煤");
area2[area2.length] = new Array("4", "22", "半无烟煤");
area2[area2.length] = new Array("5", "23", "勘探");
area2[area2.length] = new Array("5", "24", "开发");
area2[area2.length] = new Array("5", "25", "集输");
area2[area2.length] = new Array("5", "26", "产品");
area2[area2.length] = new Array("5", "27", "产品添加剂");
area2[area2.length] = new Array("6", "28", "高速公路");
area2[area2.length] = new Array("6", "29", "一级公路");
area2[area2.length] = new Array("6", "30", "二级公路");
area2[area2.length] = new Array("6", "31", "三级公路");
area2[area2.length] = new Array("6", "32", "四级公路");
area2[area2.length] = new Array("7", "33", "Ⅰ级铁路");
area2[area2.length] = new Array("7", "34", "Ⅱ级铁路");
area2[area2.length] = new Array("7", "35", "Ⅲ级铁路");
area2[area2.length] = new Array("7", "36", "IV级铁路");
area2[area2.length] = new Array("7", "37", "地铁");
area2[area2.length] = new Array("7", "38", "轻轨");
area2[area2.length] = new Array("7", "39", "有轨电车");
area2[area2.length] = new Array("7", "40", "市郊铁路");
area2[area2.length] = new Array("7", "41", "单轨交通");
area2[area2.length] = new Array("7", "42", "自动导轨交通");
area2[area2.length] = new Array("7", "43", "磁悬浮交通");
area2[area2.length] = new Array("7", "44", "直线电机轨道交通");
area2[area2.length] = new Array("8", "45", "公共航空运输");
area2[area2.length] = new Array("8", "46", "通用航空");
area2[area2.length] = new Array("9", "47", "沿海运输");
area2[area2.length] = new Array("9", "48", "近海运输");
area2[area2.length] = new Array("9", "49", "远洋运输");
area2[area2.length] = new Array("9", "50", "远洋运输");
area2[area2.length] = new Array("10", "51", "电子科学与技术");
area2[area2.length] = new Array("10", "52", "计算机");
area2[area2.length] = new Array("10", "53", "信息通讯工程");
area2[area2.length] = new Array("10", "54", "网络空间安全");
area2[area2.length] = new Array("11", "55", "黑色冶金");
area2[area2.length] = new Array("11", "56", "有色冶金");
area2[area2.length] = new Array("12", "57", "石化");
area2[area2.length] = new Array("12", "58", "基础化工");
area2[area2.length] = new Array("12", "59", "化学纤维");
area2[area2.length] = new Array("12", "60", "医药");
area2[area2.length] = new Array("13", "61", "无");
area2[area2.length] = new Array("14", "62", "农业机械");
area2[area2.length] = new Array("14", "63", "重型矿山机械");
area2[area2.length] = new Array("14", "64", "工程机械");
area2[area2.length] = new Array("14", "65", "石化通用机械");
area2[area2.length] = new Array("14", "66", "电工机械");
area2[area2.length] = new Array("14", "67", "机床");
area2[area2.length] = new Array("14", "68", "汽车");
area2[area2.length] = new Array("14", "69", "仪器仪表");
area2[area2.length] = new Array("14", "70", "基础机械");
area2[area2.length] = new Array("14", "71", "包装机械");
area2[area2.length] = new Array("14", "72", "环保机械");
area2[area2.length] = new Array("14", "73", "其他机械");
area2[area2.length] = new Array("15", "74", "食品");
area2[area2.length] = new Array("15", "75", "纺织");
area2[area2.length] = new Array("15", "76", "家电");
area2[area2.length] = new Array("15", "77", "造纸");
area2[area2.length] = new Array("16", "78", "结构材料");
area2[area2.length] = new Array("16", "79", "装饰材料");
area2[area2.length] = new Array("17", "80", "居住建筑");
area2[area2.length] = new Array("17", "81", "公共建筑");
area2[area2.length] = new Array("17", "82", "工业建筑");
area2[area2.length] = new Array("17", "83", "农业建筑");
area2[area2.length] = new Array("18", "84", "城市道路及其设施");
area2[area2.length] = new Array("18", "85", "城市桥涵及其设施");
area2[area2.length] = new Array("18", "86", "城市排水设施");
area2[area2.length] = new Array("18", "87", "城市防洪设施");
area2[area2.length] = new Array("18", "88", "城市道路照明设施");
area2[area2.length] = new Array("18", "89", "城市建设公用设施");
area2[area2.length] = new Array("19", "90", "生态建设");
area2[area2.length] = new Array("19", "91", "水污染防治");
area2[area2.length] = new Array("19", "92", "大气污染防治");
area2[area2.length] = new Array("19", "93", "固体废物处置");
area2[area2.length] = new Array("19", "94", "噪音防治");
area2[area2.length] = new Array("19", "95", "污染修复工程");
area2[area2.length] = new Array("20", "96", "水文地质");
area2[area2.length] = new Array("20", "97", "工程测量");
area2[area2.length] = new Array("20", "98", "岩土工程");
area2[area2.length] = new Array("21", "99", "无");

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
      fileTypes: [
        { label: "项目建议书", value: "1" },
        { label: "可行性研究报告", value: "2" },
        { label: "资金申请报告", value: "3" },
        { label: "项目申请报告", value: "4" },
        { label: "初步设计", value: "5" },
        { label: "实施方案", value: "6" },
        { label: "规划", value: "7" },
        { label: "节能报告", value: "8" },
        { label: "课题研究", value: "9" },
        { label: "中（终）期验收", value: "10" },
        { label: "中（终）期评估", value: "11" }
      ],
      level1s: [
        { label: "农业、林业", value: "1" },
        { label: "水利水电", value: "2" },
        { label: "电力", value: "3" },
        { label: "煤炭", value: "4" },
        { label: "石油天然气", value: "5" },
        { label: "公路", value: "6" },
        { label: "铁路、城市轨道", value: "7" },
        { label: "民航", value: "8" },
        { label: "水运", value: "9" },
        { label: "电子、信息工程", value: "10" },
        { label: "冶金", value: "11" },
        { label: "石化、化工、医药", value: "12" },
        { label: "机核工业械", value: "13" },
        { label: "机械", value: "14" },
        { label: "轻工、纺织", value: "15" },
        { label: "建材", value: "16" },
        { label: "建筑", value: "17" },
        { label: "市政公用工程", value: "18" },
        { label: "生态建设和环境工程", value: "19" },
        { label: "水文地质、工程测量、岩土工程", value: "20" },
        { label: "其他", value: "21" }
      ],
      level2s: []
    };
  },
  methods: {
    submitUpload() {
      console.log(this.fileType.label+this.level1.label+this.level2.label)
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    setLevel2(prop) {
      let tempArray = [];
      this.level2s = [];
      for (var item of area2) {
        if (item[0] === prop.value) {
          // console.log(prop);
           tempArray.push({label:item[2],value:item[1]})
           this.level2s=tempArray
        }
      }
      //笨比切换实现 by lb
    },
    
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
