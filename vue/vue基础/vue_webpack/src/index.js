import Vue from "vue"
import Main from "./main.vue"
var el= new Vue({
    el:"#root",//入口节点
    render:function(createElement){
        return createElement(Main)//渲染入口节点
    }
})