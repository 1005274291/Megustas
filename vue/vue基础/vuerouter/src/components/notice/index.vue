<template>
  <div v-if="isShow">
      <h1>{{title}}</h1>
      <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:""
        },
        msg:{
            type:String,
            default:""
        },
        duration:{
            type:Number,
            default:500
        }
    },
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        show(){
            this.isShow=true
            setTimeout(()=>{
                this.hide()
            },this.duration)
        },
        hide(){
            this.isShow=false
            this.remove()
        }
    }
}
</script>

<style>

</style>