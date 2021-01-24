export default function({$axios,store}){
    $axios.onRequest(config=>{
        if(store.state.user.token){
            config.headers.Authorization="Jun"+store.state.user.token
        }
        return config
    })
}