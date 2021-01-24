import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

const router= new Router({
    mode:"history",
    base:process.env.BASE_URL,//http://1.2.3.4/shop/ 会忽略shop
    routes:[
        {
            path:"/",
            name:"home",
            component:Home,
            // component:()=>import("./views/About.vue")异步加载
            // meta:{auth:true}//需要认证
            // beforeEnter(){}路由守卫
        },
        // {
        //     path:"about",
        //     component:Home,
        //     children:[{path:"/list",name:"list",component:List}
        //               {path:"/detail/:id",name:"detail",component:Detail,props:true} 
        // 模式匹配 在Detail组件中通过$route.params.id获取匹配的参数,可以设置props中的id，直接由id获取]
                                    //  $route.matched可以获取到routes的配置信息
        // }  如果想让子路由呈现，需要在Home组件嵌套<router-view/>
    ]
})
//实现路由动态添加
//异步获取路由
// api.getRouters().then(routes=>{
//     const routeConfig=routes.map(route=>mapComponent(route))
//     router.addRoutes(routeConfig)
// })
//映射关系
// const compMap={
//     "Home":()=>import("./views/Home.vue")
// }
//递归替换
// function mapComponent(route){
//     route.component=compMap[route.component]
//     if(route.chidren){
//         route.chidren=route.chidren.map(child=>mapComponent(child))
//     }
//     return route
// }

//全局守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.auth&&!window.isLogin){
        //去的连接需要认证，并且没有登录
        if(window.confirm("请登录")){
            window.isLogin=true
            next()//登录成功继续下一步
        }else{
            next("/")//登录失败回到首页
        }
    }else{
        next()//不需要登录 继续
    }
})
export default router