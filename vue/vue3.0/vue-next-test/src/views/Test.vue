<template>
  <div class="test">
      <h1>vue3.0初体验</h1>
      <button @click="click">{{state.count}}--{{state.double}}</button>
  </div>
</template>

<script>
// template=>render function(返回vdom) 是compile-dom和core做的
import { reactive ,watchEffect,computed} from 'vue';
export default {
    //响应式 用的proxy 取代object.defineProperty
    // runtime-dom 和runtime-core 完成的是createApp等
    //computed 按需引入使tree-shaking生效
    setup(){
        const state=reactive({
            count:0,
            double:computed(()=>state.count*2)
        })
        watchEffect(()=>{
            //数据发生改变都会执行的回调函数
            console.log('数据改变了',state.count)
        })
        function click(){
            state.count+=1
        }
        return{
            state,
            click
        }
    }
}
</script>

<style lang='less' scope="this api replaced by slot-scope in 2.5.0+">
    .test{
        color: red;
    }

</style>