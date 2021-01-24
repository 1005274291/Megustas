let Vue
class VueRouter{
    constructor(options){
        this.$options=options
        //创建一个路由path和route映射
        this.routeMap={}
        //将来当前路由current需要响应式
        this.app=new Vue({
            data:{
                current:"/"
            }
        })
        //创建router-link和router-view全局组件
        this.initComponent()
    }
    init(){
        //绑定浏览器事件
        this.bindEvents()
        //解析路由配置
        this.createRouteMap(this.$options)
    }
    bindEvents(){
        window.addEventListener("hashchange",this.onHashChange.bind(this))
        window.addEventListener("load",this.onHashChange.bind(this))
    }
    onHashChange(){
        //从http://localhost/#/home 拿到/home
        this.app.current=window.location.hash.slice(1)||"/"
    }
    createRouteMap(options){
        options.routes.forEach(item=>{
            this.routeMap[item.path]=item
        })
    }
    initComponent(){
        //声明两个全局组件
        Vue.component("router-link",{
            props:{
                to:String
            },
            render(h){
                //目标是：<a :href="to">xxx</a>
                return h("a",{attrs:{href:"#"+this.to}},this.$slots.default)
            }
        })
        //为路由组件占位的组件
        Vue.component("router-view",{
            render:(h)=>{
                const Comp =this.routeMap[this.app.current].component
                return h(Comp)
            }
        })
    }
}

//把VueRouter变为插件
VueRouter.install=function(_Vue){
    //把接收到的_Vue实例保存下来使用
    Vue=_Vue
    //混入任务
    Vue.mixin({
        beforeCreate(){
            //在Vue初始化的时候被调用  实现对Vue的扩展
            //this是Vue组件实例
            //但是只希望执行一次
            if(this.$options.router){
                //只有根组件有router
                Vue.prototype.$router=this.$options.router
                //对router进行初始化
                this.$options.router.init()
            }
        }
    })
}
export default VueRouter