<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{foo}}</p>
    <p>{{name}}</p>
    <!-- 匿名插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="content" title="作用域插槽"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  inject:["name"],
  props: {
    msg: String
  },
  data(){
    return{
      foo:"foo"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
