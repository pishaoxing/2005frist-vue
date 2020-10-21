/**
 * 
 * @param {Array} allRoutes  整个页面完整的路由，home文件下
 * @param {Array} menuList  从服务器获取的用户菜单名
 */
import allRoutes from "../router/allRoutes"


 const recursionRouters = (allRoutes,menuList)=>{
     let userRoutes = [];
     allRoutes.forEach(item=>{
         menuList.forEach(v=>{
             if(item.meta.name === v.name){//判断规格化路由表中的数据的name是否和menuList中的name名称一致
                 if(v.children&&v.children.length>0){//判断如果一个路由中包含子路由
                     item.children = recursionRouters(item.children,v.children)//采用diff算法，把最终由子路由的值直接赋值给item.children
                 }
                 userRoutes.push(item)//把符号条件的数据，直接push到userRoutes数组中，这个数组中存放的值也就是各个权限所对应的正确的渲染页面路由的值
             }
         })
     })
     return userRoutes
 }
 //验证这种方式的对错
//  let menuList =  [
//     {
//         "name": "管理首页"
//     },
//     {
//         "name": "学员管理",
//         "children": [
//             {
//                 "name": "学员项目管理"
//             }
//         ]
//     },
//     {
//         "name": "我的中心"
//     }
// ]


//  console.log(recursionRouters(allRoutes,menuList));
//main.js文件汇总引入import "./untils/recursionRouters"
 export default recursionRouters;