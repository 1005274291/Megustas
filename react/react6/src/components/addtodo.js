import React,{Component}from 'react';
import {connect} from "react-redux"
import {add_todo} from "../actions"
import uuid from "uuidjs"
class Addtodo extends Component{
    render(){
        const {addtodo} = this.props
        return(
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    if(this.input.value){
                        addtodo(uuid.generate(),this.input.value)
                        this.input.value=""
                    }
                }}>
                    <input type="text" 
                    ref={
                        (node)=>{
                            this.input=node
                        }
                    }
                    ></input>
                    <button type="submit">添加到待办事项</button>
                </form>
            </div>
        )
    }
}

var mapstate=function () {
    return {}
}
var mapdispatch=function(dispatch){
    return{
        addtodo:function(id,newtodo){
            dispatch(add_todo(id,newtodo))
        }
    }
}
Addtodo =connect(mapstate,mapdispatch)(Addtodo)
export default Addtodo