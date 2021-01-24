<template>
    <div>
        <h3>请听题</h3>
        <p>你要给我盖楼吗？</p>
        <button @click="$emit('confirm')">我要！</button><button @click="$emit('cancel')">我不要！</button>
    </div>
</template>
<script>
export default {
    data:function () {
        return{

        }
    },
    methods:{},
    props:[]
}
</script>