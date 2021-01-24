import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储状态
    count:0
  },
  mutations: {
    //改状态的函数  通过commit调用
    add(state,num=1){
      state.count+=num
    }
  },
  getters:{
    //计算属性 派生属性
    score(state){
      return "计算属性:"+state.count
    }
  },
  actions: {
    //处理复杂业务逻辑
    //例如异步操作 通过dispatch
    asyncAdd({commit}){
      new Promise((resove)=>{
        setTimeout(()=>{
          commit("add")
          resove({OK:1})
        },1000)
      })
    }
  },
  modules: {
    //a:count 加载子模块 通过$store.state.a.count
    //通过设置namespaced:true 创建独立的命名空间 通过"a/score"来访问
  }
})
