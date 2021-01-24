//添加事务到备忘录
export const ADD_TODO="add"
export const add_todo=function(id,newtodo){
    return{
        type:ADD_TODO,
        id,
        newtodo
    } 
}
//切换完成事务的状态
export const TOGGLE_TODO ="toggle"
export const toggle_todo=function(id){
    return{
        type:TOGGLE_TODO,
        id
    }
}
//切换列表的显示状态
export const SWITCH_LIST="switch"
export const switch_list=function(newfilter){
    return{
        type:SWITCH_LIST,
        newfilter
    }
}

