<template>
  <div>
      <h3>vuex test</h3>
      <p>{{$store.state.count}}</p>
      <p>{{$store.getters.score}}</p>
      <button @click="add">add</button>
      <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>

<script>
export default {
    methods:{
        add(){
            this.$store.commit("add",2)
            //调用store中mutations的函数名
        },
        async asyncAdd(){//派发actions中的函数
            const result=await this.$store.dispatch("asyncAdd")
            if(result.OK===1){
                alert("操作成功！")
            }
        }
    }
}
</script>

<style>

</style>