<template>
  <div class="flex">
    <br /><br />
    <h1>{{ title }}</h1>
    <br /><br />
    <div class="box">
      <el-input style="width: 20rem" v-model="username" placeholder="请输入内容" prefix-icon="el-icon-user-solid"></el-input>
      <el-input style="width: 20rem" v-model="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
      <el-button style="width: 20rem" type="danger" @click="login">登录</el-button>
    </div>
    <!-- tip栏 -->
    <transition-group name="fade">                       
      <div key="1" v-if="tipShow" class="tip" @click="showTip"></div>
      <div key="2" v-if="tipShow" class="font" @click="showTip">Tip</div>
    </transition-group>
    
    <!-- 提示内容 -->
    <el-dialog
      title="小提示"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="dia"
    >
      <p>网站不涉及任何公司内部数据，只是将个人负责工作部分抽出做栗子QAQ</p>
      <p>UI配色采用<strong>Sketch</strong>完成,强烈推荐给各位小伙伴</p>
      <p>用户名：admin 密码：admin</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="know">我知道啦～</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipShow: false,
      dialogVisible: true,
      title: "辽宁省国际工程咨询中心",
      username: "",
      password: "",
    };
  },
  methods: {
    know(){
      this.dialogVisible = false
      this.tipShow = true
    },
    showTip(){
      this.dialogVisible = true
      this.tipShow = false
    },
    handleClose(done) {
      this.$notify({
          title: '不可关闭',
          message: '请确保阅读过提示内容后，点击‘我知道啦',
          type: 'warning'
      });
    },
    login() {
      if (this.username == "") {
        this.$message.error("请输入用户名~");
      } else if (this.password == "") {
        this.$message.error("请输入密码～");
      } else {
        //请求
        this.$post("/api/admin/login", {
          username: this.username,
          password: this.password,
        }).then((res) => {
          //处理response
          if (res == "用户名错误") {
            this.$message.warning("用户名错误");
          } else if (res == "密码错误") {
            this.$message.warning("密码错误");
          } else {
            this.$message.success("登录成功");
            this.$router.push("/main");
          }
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,.fade-leave-active{
  transition: opacity .3s;
}
.dia{
  p{
    font-size: 16px;
    margin-bottom: 30px;
  }
}
.tip{
  border-radius: 50px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
  box-shadow: 0px 1px 1px 0px rgba(59, 58, 58, 0.5);
  width: 100px;
  height: 100px;
  animation: rotate 2s linear infinite;
}
.tip:hover{
  cursor:pointer;
}
.font:hover{
  cursor: pointer;
}
.font{
  position: absolute;
  right: 30px;
  bottom: 30px;
    font-size: 20px;
    margin: 35px 35px;
    font-weight: bolder;
    color: white;
}
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  .box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 35rem;
  height: 22rem;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }
}
@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
