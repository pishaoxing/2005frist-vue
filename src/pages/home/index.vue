<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">学员项目管理</el-menu-item>
              <el-menu-item index="1-2">学员资料</el-menu-item>
               <el-menu-item index="1-3">学员宿舍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple shouqi">
                <i class="iconfont icon-shouqi" @click="isCollapse=!isCollapse"></i>
                 <span class="aa">图标</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                学员管理系统 
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-avatar  class="yuan" shape="circle"
                           :size="40"
                           fit="fill" :src="circleUrl">{{circleUrl}}</el-avatar>
                <span>欢迎您:</span>
                <span class="nickname"><b>{{userInfo.nickname}}</b></span>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getloginlog } from "@/api";

import {mapState} from "vuex";
export default {
  computed:{
     ...mapState(['userInfo'])
  },
  data() {
    return {
      isCollapse: false,
      circleUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4088434008,2654880355&fm=11&gp=0.jpg",
    };
  },
  methods: {
    quit(){
       //退出登入
       //1，清除token和userInfo
       //2，退出至登入页
       localStorage.removeItem("2005-token"),
       localStorage.removeItem("2005-userInfo")

       this.$router.push("/login")
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    getloginlog().then(res => {
      console.log(res);
    });
  }
};
</script>
<style>
.circleUrl{
  width:10px;
  height:10px;
}
.aa{
  text-align: center;
  cursor:pointer;
}
.aa:hover{
  color:purple;
}
  .yuan{
    vertical-align: middle;
    margin-right:10px;
    cursor:pointer;
  }
  .nickname {
    margin-left: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
  }
  .quit {
    color: hotpink;
    cursor: pointer;
    margin-left: 10px;
  }
  .shouqi {
    padding-left: 10px;
    text-align: left;
  }
  .icon-shouqi,
  .icon-zhankai {
    font-size: 36px;
    cursor: pointer;
    color: #fff;
  }
.el-header {
    background: linear-gradient(135deg, #4c67ff, #5635df);
    -webkit-box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.29);
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.29);
    padding-left: 0;
    background-color: #41b883;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background: linear-gradient(135deg, #5635df, #4c67ff);
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 头部 */
.el-row {
  margin-bottom: 20px;
  /* ethlast-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 500px;
  }
</style>
