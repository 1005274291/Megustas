<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Hello msg="这事msg吗" @add-feature="dosomething"/>
  </div>
</template>

<script >
// @ is an alias to /src
import Hello from '@/components/Hello.vue'
export default {
  name: 'Home',
  components: {
    Hello
  },
  methods:{
    dosomething(feature){
      alert(feature.name)
    }
  }
}
</script>
