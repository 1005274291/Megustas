//具名导出vuex选项即可
export const state=()=>{
    return{
        token:"jiang"
    }
}
export const mutations={
    init(state,token){
        state.token=token
    }
}
export const getters={
    isLogin(state){
        return !!state.token
    }
}
export const actions={
    login({commit,getters},u){
        return this.$axios.$post("api/login",u).then(({token})=>{
            if(token){
                commit("init",token)
            }
            return getters.isLogin
        })
    }
}