import axios from "axios";

import router from "../router";

import ElementUI from 'element-ui';

//基础地址
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true;//允许请求携带认证


//创建请求拦截器，可以给每个请求都携带上想要传递的内容
axios.interceptors.request.use(config => {
    //登入&注册是不需要携带token
    if (config.url == "/users/login") {
        //不需要携带token，直接放行
        return config
    } else {
        //就是当需要携带token时
        let token = localStorage.getItem('2005-token')
        //config指的是每一个请求对象
        config.headers['authorization'] = token;
        //请求拦截器放行
        return config;
    }
})




//响应拦截，为了防止用户使用非法的token值直接去访问页面，用响应拦截处理
axios.interceptors.response.use(config=>{
    let {data} = config;
    if(data.code=='1004' || data.code =='10022'){
        //在当前的后台api中，data.code==1004代表了token校验失败，10022代表session到期失效，提示错误，并让页面跳转到登入页

        //使用ElementUI,中的样式，所以现在上面引入Element
            ElementUI.Message.error("登入信息失效，请重新登入")
        
        //使用router进行跳转到登入页面，所以也需要现在前面引入router
        router.push("/login")
    }
    return config;//放行
})


axios.create({
    timeout: 3000
})


export default axios;