<template>
  <div>
      <!-- 自定义组件要实现v-model必须实现：value，@input -->
      <input v-bind="$attrs" :value="value" @input="onInput">
      <!-- $attrs存储的是声明为props之外的属性 -->
  </div>
</template>

<script>
export default {
    inheritAttrs:false,
    // 防止顶层继承属性
    props:{
        value:{
            type:String,
            default:""
        }
    },
    methods:{
        onInput(e){
            //通知父组件数值变化
            this.$emit("input",e.target.value)
            //通知item校验
            this.$parent.$emit("validate")
        }
    }
}
</script>

<style>

</style>