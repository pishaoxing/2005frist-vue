//动态路由
let DynamicRoutes = [
    {
        path: '/',
        component: () => import(/*webpackChunkName:'Home' */ "../pages/home"),
        children: []
    },
]
export default DynamicRoutes