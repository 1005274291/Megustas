<template>
    <div>
        <p>请为你喜欢的队伍投票</p>
        <Lol-model title="IG"></Lol-model>
    </div>
</template>
<script>
    import lol from "./lol.vue"
    export default {
        props: [],//组件接收的参数
        data: function () {//组件属性
            return {

            }
        },
        methods: {//组件方法

        },
        computed:{//计算属性

        },
        components:{//要引用的组件
            "Lol-model":lol
        }
    }
</script>