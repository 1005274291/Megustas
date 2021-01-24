<template>
  <div class="hello">
      <h1>{{msg}}</h1>
    <div>
      <input type="text" @keydown.enter="addFeature" />
    </div>
    <div v-for="feature in features" :key="feature.id">{{feature.name}}</div>
    <div>总数：{{count}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Emit,Watch } from "vue-property-decorator";
// import {State,Action,Mutation} from "vuex-class"
// class Feature{
//     constructor(public id: number,public name: string){
//         console.log(id,name)
//     }
// }
export interface Feature {
  id: number;
  name: string;
}
//泛型接口
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
function getData<T>(): Promise<Result<T>> {
  const data: any[] = [
    { id: 1, name: "类型注解" },
    { id: 2, name: "类型检查" }
  ];
  return new Promise(resolve => resolve({ ok: 1, data }));
}

// function MyComponent(options:any){
//     return function(target:Function){
//         options.data=function(){
//             return {

//             }
//         }
//         return Vue.extend(options)
//     }
// }
// @MyComponent
@Component({
  // 可以传入vue中的一切配置项
  components: {}
})
export default class Hello extends Vue {
  //括号里面的是给vue写的 下面的是写给ts
  @Prop({ type: String, default: "" })
  private msg!: string; //!的意思是告诉ts不用担心传值问题
  //属性相当于data中的值
//   @State state装饰器
//   private features!:Feature[]
//   @Action addFeatureAction:any 函数直接传参使用就行
//   @Mutation addFeatureMutation:any  函数直接传参使用
  private features: Feature[] = [];
  constructor() {
    super();
    //   this.features=[new Feature(1,"类型注解"),new Feature(2,"类型检查")]
    //   this.features=[{id:1,name:"类型注解"},{id:2,name:"类型检查"}]
  }

  //生命周期直接生命
  private async created() {
    console.log("created");
    this.features = (await getData<Feature>()).data; //await 强制返回promise的结果
  }
  @Emit() //不给Emit传参，表示事件名称是方法名
  private addFeature(event: any) {
    const feature={
        id:this.features.length+1,name: event.target.value
    }
    this.features.push(feature);
    event.target.value = "";
    //如果没有返回值，形参是事件参数，否则返回值是事件参数
    return feature
  }
  @Watch("features",{deep:true})
  private msgChange(newVal:Feature,oldVal:Feature){
      console.log(newVal,oldVal)
  }
  //利用getter和setter做计算属性
  get count() {
    return this.features.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
