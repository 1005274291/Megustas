<template>
  <div>
    <wrapForm :model="model" :rules="rules" ref="loginForm">
      <myForm label="用户名" prop="username">
        <myInput v-model="model.username"></myInput>
      </myForm>
      <myForm label="密码" prop="password">
        <myInput v-model="model.password" type="password"></myInput>
      </myForm>
      <myForm>
          <button @click="onLogin">登录</button>
      </myForm>
    </wrapForm>
    {{model}}
  </div>
</template>

<script>
import myInput from "./input";
import myForm from "./formitem";
import wrapForm from "./form";
import Notice from "../notice/index"
import create from "../../utils/create"
export default {
  components: {
    myInput,
    myForm,
    wrapForm
  },
  data() {
    return {
      model: {
        username: "Tom",
        password: ""
      },
      rules:{
          username:[{required:true,msg:"用户必填"}],
          password:[{required:true,msg:"密码必填"}]
      }
    };
  },
  methods:{
      onLogin(){
        let notice
          this.$refs.loginForm.validate((isValid)=>{
              if(isValid){
                  // alert("登录")
                  notice=create(Notice,{
                    title:"xxx",
                    msg:"登录成功",
                    duration:1000
                  })
              }else{
                  // alert("有错")
                  notice=create(Notice,{
                    title:"xxx",
                    msg:"有错",
                    duration:1000
                  })
              }
              notice.show()
          })
      }
  }
};
</script>

<style>
</style>