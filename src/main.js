import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/styles/base.css';
import '@/assets/styles/el-reset.css';

import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);



//路由前置钩子(导航守卫)，如果没有登录成功，你访问其它页面是不可以的，设置只能访问到login页面

//如果登录成功后，获取了token，那么就可以直接跳转到各个页面

//前提：判断是否登陆了，并且获取了token值

// 注意，注意：路由守卫过于依赖token值，当有用户自定义token的时候，会有bug出现，用响应拦截 用户非法访问解决
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  //条件：用户登入之后localStorage中有token

  let token = localStorage.getItem('2005-token');
  if (token) {
    //如果是要跳转到注册页面或者是登入页面直接放行
    //有token值，表示已经登入了，所以直接next()放行
    next()
  } else {//没有token，那么此时没有登入
    //没有登入，当时要想跳转到注册或者登入页面，直接放行
    if (to.path === "/login") {
      next()
    } else {
      //访问的不是登入页面，那么直接让其跳转到登入页
      next({ path: "/login" })
    }

  }
})



import "./utils/recursionRoutes"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
