<template>
    <div>
        <div>队伍名字:{{title}}</div>
        <div>票数:{{count}}</div>
        <button @click="handleClick">投票</button>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                count: 0
            }
        },
        methods: {
            handleClick: function () {
                this.count = this.count + 1
            }
        },
        props: ["title"],
    }
</script>