<template>
  <div id="app">
    {{count}}
    <button @click="handleClick">投票+1</button>
    <h1>你的好友姜小军说：{{confirmText}}</h1>
    <cm v-on:confirm="conf=true" v-on:cancel="conf=false"></cm>
  </div>
</template>

<script>
import confirm from "./components/confirm"
export default {
  data:function(){
    return{
      count:0,
      conf:null
    }
  },
  methods:{
    handleClick:function(){
      this.count=this.count+1
    }
  },
  computed:{
    confirmText:function(){
      var conf=this.conf
      if(conf==null){
        return "未作答"
      }else{
        if(conf==true){
          return "我要！"
        }else{
          return "我不要！"
        }
      }
    }
  },
  components:{
    cm:confirm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
