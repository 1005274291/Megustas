<template>
  <div>
      <label v-if="label">{{label}}</label>
      <slot></slot>
      <!-- 校验信息 -->
      <p v-if="errmsg">{{errmsg}}</p>
  </div>
</template>

<script>
import Schema from "async-validator"
export default {
    props:{
        label:{
            type:String,
            default:""
        },
        prop:{
            type:String
        }
    },
    data(){
        return{
            errmsg:""
        }
    },
    inject:["form"],
    mounted(){
        //监听校验事件，并执行监听
        this.$on("validate",()=>{
            this.validate()
        })
        
    },
    methods:{
        validate(){
            //执行组件校验
            //1.获取校验规则
            const rules=this.form.rules[this.prop]
            //2.获取数据
            const value=this.form.model[this.prop]
            //3.执行校验
            const desc={
                [this.prop]:rules//key是username value是校验规则数组
            }
            const scheme=new Schema(desc)
            //参数1是值，2是回调函数
            //返回的Promise值是boolean
            return scheme.validate({[this.prop]:value},err=>{
                if(err){
                    //有错
                    this.errmsg=err[0].message
                }
                else{
                    //没错
                    this.errmsg=""
                }
            })
        }
    }
}
</script>

<style>

</style>