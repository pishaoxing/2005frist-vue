<template>
  <div class="container">
    <div class="about">
      <h1>千锋管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
           @keyup.enter.native="submitForm('loginForm')"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="tj" type="primary" @click="submitForm('loginForm')" 
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg_video"
      muted
      src="../../assets/video/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>
<script>
//登入逻辑的实现
//1，收集用户输入的username&password传递给后端

//2，登入通过后，将后端返回的token存到本地,跳转到主页面

//3，每次请求的时候，携带token到请求头authorization

//4，展示token校验正确的数据

//5，校验不通过，跳转到登入页

import { login } from "@/api";

import { mapMutations } from "vuex";

export default {
  /**
   * @param {Object} rule 就是一个表单验证对象
   * @param {String} value 输入值
   * @param {Function} callback 校验通过不传参，不通过传参，说明情况
   */

  data() {
    var validateUsername = (rule, value, callback) => {
      //  var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      //  if(!uPattern.test(value)){
      //    callback('4到16位(字母，数字，下划线，减号)')
      //  }else{
      //    callback()
      //  }
      if (!value) {
        callback("4到16位(字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    var validatepassWord = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请输入密码"));
      // } else if (value !== this.loginForm.username) {
      //   callback(new Error("密码输入错误"));
      // } else {
      //   callback();
      // }
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatepassWord, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          //发送请求在本地校验通过后发送
          login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              //服务器响应了。我们就关掉加载框
              loading.close();

              console.log(res);
              if (res.data.state) {
                this.$message({
                  showClose: true,
                  message: "登入成功",
                  type: "success"
                });

                //用户名密码正确
                localStorage.setItem("2005-token", res.data.token);

                //进行登录名的操作
                localStorage.setItem(
                  "2005-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改"vuex"中，['state.userInfo]的值、
                this.SET_USERINFO(res.data.userInfo);

                //跳转到主页
                this.$router.push("/");
              } else {
                //用户名或者密码错误
                // alert('用户名或密码错误')
                this.$message({
                  showClose: true,
                  message: "用户名或密码错误",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("登陆失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // created(){
    //   var _self = this;
    //     document.onkeydown = function(e){

    //     var key = window.event.keyCode;

    //     if(key == 13 || key == 100){

    //         _self.submitForm('loginForm');

    //     }

    // }
    // }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.about {
  position: relative;
  z-index: 9;
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  top: 50%;
  left: 75%;
  /* -webkit-transform: translate(-50%, -50%); */
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(83, 107, 182, 0.46);
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.el-form {
  position: absolute;
}
.el-input__inner {
  width: 250px;
  height: 40px;
}
/* .el-form-item{
     color:#ccc;
   } */
.tj {
  width: 250px;
  background: linear-gradient(90deg, #1596fb, #002dff);
}
h1 {
  text-align: center;
  padding: 50px;
  margin-top: 50px;
}
.bg_video {
  /* display: block;
      margin: auto;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5; */
  object-fit: fill;
}
</style>
