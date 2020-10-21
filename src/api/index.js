import axios from "./config";

//登入请求
export const login = (username, password)=>axios({
    url:"/users/login",
    method:'post',
    data:{
        username,
        password
    }
})


export const getloginlog =()=>axios.get("/getloginlog")