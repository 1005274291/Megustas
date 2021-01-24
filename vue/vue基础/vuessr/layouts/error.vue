<template>
  <div>
      <h1 v-if="error.statusCode===404">页面不存在</h1>
      {{error}}
      <nuxt-link to="/">首页</nuxt-link>
  </div>
</template>

<script>
export default {
    props:["error"],
    layout:"blank"
}
</script>

<style>

</style>