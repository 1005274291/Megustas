//创建指定组件实例并挂载于body上
import Vue from "vue"
export default function create(Component,props){
    //0.先创建vue实例
    const vm=new Vue({
        render(h){
            //render方法提供给我们一个createElement函数，它可以渲染vnode
            return h(Component,{props})
        }
    }).$mount()
    //1.上面vm帮我们创建组件实例
    //2.通过$children获取该组件实例 也就是Component
    const copm =vm.$children[0]
    //3.追加至body
    document.body.appendChild(vm.$el)
    //4.清理函数
    copm.remove=()=>{
        document.body.removeChild(vm.$el)//移除dom
        vm.$destroy()//移除组件实例

    }
    //5.返回组件实例
    return copm
}