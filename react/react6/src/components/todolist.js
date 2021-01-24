import React,{Component}from 'react';
import {connect} from "react-redux"
import {toggle_todo} from "../actions"


var filterlist=function(list,filter){
    if (filter==="all") {
        return list
    }
    if(filter ==="done"){
        return list.filter(function (todo) {
            return todo.isdone
        })
    }
    if(filter ==="will"){
        return list.filter(function (todo) {
            return !todo.isdone
        })
    }
}
class Todolist extends Component{
    render(){
        const {list,toggle,filter}=this.props
        var renderlist =filterlist(list,filter)
        return(
            <div>
                <ul>
                    {
                        renderlist.map((v,k)=>{
                        return <li
                        style={{textDecoration:v.isdone? "line-through":"none"}}
                        onClick={()=>{toggle(v.id)}} key={v.id}>{v.todo}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
var mapstate=function(state,ownprops){
    console.log(state)
    return{
        list:state.todoreducer,
        filter:state.fillterreducer.filter
    }
}
var mapdispatch=function(dispatch,ownprops){
    return{
        toggle:function(id){
            dispatch(toggle_todo(id))
        }
    }
}
Todolist =connect(mapstate,mapdispatch)(Todolist)

export default Todolist