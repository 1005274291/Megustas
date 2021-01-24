<template>
  <div class="container">
    <h2>商品列表</h2>
    <ul>
      <li v-for="item in goods" :key="item.id">
        <nuxt-link :to="`/detail/${item.id}`">{{item.text}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head(){
    return{
      title:"课程列表",
      meta:[{name:"description",hid:"description",content:"set oage meta"}]
    }
  },
  // async asyncData({$axios,error}){
  //前后端都会执行 时间点在beforeCreate之前 传递一个上下文对象  fetch和asyncData一样 返回的数据填充到store中
  //   //获取私有属性 类似于data 优先级高于data 里面不能使用this 组件实例不存在
  //   try {
  //     const {ok,goods}=await $axios.$get("/api/goods")//拿到响应结果
  //     if(ok){
  //       return{goods}
  //     }
  //     //错误处理
  //     error({statusCode:400,message:"数据查询失败"})
  //   } catch (error) {
  //     error(error)
  //   }
  // },
  data(){
    return{
      goods:[
        {
          id:1,
          text:"Web全栈架构师",
          price:8999
        },
        {
          id:2,
          text:"Python全栈架构师",
          price:10005
        }
      ]
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
