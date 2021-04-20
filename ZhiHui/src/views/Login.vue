<template>
  <div id="login">
    <div class="kuang">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark oq">智慧宿管云平台</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="请输入账号" v-model="user">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="请输入密码" type="password" v-model="pwd">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input style="width:50%;" v-model="code" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <template>
            <el-radio class="remember" v-model="radio" label="1">记住密码</el-radio>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <img @click="huantu" class="yanzhengmaimg" :src="codeSrc" alt="">
          <el-button type="primary" @click="submit()">登 录</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <p class="copy">Copyright © 2019-2020 smartdormitory.cn All Rights Reserved.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      codeSrc:'',
      user: "",
      pwd: "",
      code: "", //text框输入的验证码
      uuid:'',
      input: '',
      radio: '2'
    };
  },
  mounted(){
      var that = this;
     this.axios({
       url:'http://122.112.253.28:8095/prod-api/captchaImage',
       method:'GET',
     }).then((response) => {
        console.log('data:image/gif;base64,'+response.data.data.img)
        that.codeSrc = 'data:image/gif;base64,'+response.data.data.img;
        that.uuid = response.data.data.uuid;
     }).catch((error) => {

     })
 },
  methods: {
    huantu(){
        var that = this;
     this.axios({
       url:'http://122.112.253.28:8095/prod-api/captchaImage',
       method:'GET',
     }).then((response) => {
        that.codeSrc = 'data:image/gif;base64,'+response.data.data.img;
        that.uuid = response.data.data.uuid;
     }).catch((error) => {

     })
    },
    submit() {
      let that = this;
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8095/prod-api/admin/login",
        data: {
          code: that.code,
          username: that.user,
          password: that.pwd,
          uuid: that.uuid,
          headers:{
                    Authorization:window.sessionStorage.token
                }
        }
      }).then(result => {
        console.log(result)
        if (this.user == "") {
          this.$message.error({
            message: "用户名不能为空!",
            type: "warning"
          });
        } else if (this.pwd == "") {
          this.$message.error({
            message: "密码不能为空!",
            type: "warning"
          });
        }  else if(this.code==""){
            this.$message({
              message: "验证码不能为空",
              type: "success"
            });
          }else if(this.code!=that.code){
             this.$message({
              message: "验证码不一致!",
              type: "success"
            });
          }else{
          if (result.data.code == "200") {
            sessionStorage.setItem("token", result.data.data.tokenHead+ ' ' +result.data.data.token);
            console.log(window.sessionStorage)
            this.$message({
              message: "登录成功!",
              type: "success"
            });
            this.$router.push("/page");
          } else {
            let aw = result.data.message;
            this.$message.error({
              message: "" + aw + "!",
              type: "warning"
            });
             this.huantu();
          }
        }
      });
    },
  }
};
</script>
<style scoped>
.el-button--primary {
  border: none;
  background: #1890ff;
}
.el-button {
  width: 100%;
}
.nq {
  width: 68%;
}
.el-input {
  margin: 15px 0;
}
.qa {
  width: 89px;
  margin-left: 10px;
  vertical-align: middle;
}
.oq {
  letter-spacing: 2px;
  text-align: center;
  color: #707070;
  font-weight: bold;
  font-size: 27px;
}
.kuang {
  position: absolute;
  right: 35%;
  top: 120px;
  padding: 14px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  background: #ffffff;
  width: 380px;
  border-radius: 15px;
}
#login {
  position: relative;
  height: 100vh;
  background: url("../assets/login.png") no-repeat;
  background-size: 100%;
}
.remember {
  margin-bottom: 10px;
}
.copy {
  position: absolute;
  left: 37%;
  bottom: -615px;
  color: #f7fbff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 13px;
}
.code {
  width: 124px;
  height: 31px;
  border: 1px solid rgba(186, 186, 186, 1);
}
.yanzhengmaimg {
  cursor: pointer;
  float: right;
  margin-top: -85px;
  width: 150px;
}

</style>