<template>
  <div>
      <h1>这是admin路由</h1>
      <p>只有登录过才能进来</p>
  </div>
</template>

<script>
export default {
    // layout:"blank"指定哪一个布局
    middleware:["auth"]
}
</script>

<style>

</style>