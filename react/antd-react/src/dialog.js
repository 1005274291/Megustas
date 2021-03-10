import React, { Component } from 'react';
import {createPortal} from "react-dom" //传送门
export default class DiaLog extends Component{
    constructor(props){
        super(props)
        this.state={
            showDialog:false
        }
    }
    handleShowDialog=()=>{
        this.setState({
            showDialog:!this.state.showDialog
        })
    }; 
    render(){
        return(
            <div>
                <h1>DiaLog</h1>
                <button onClick={this.handleShowDialog}>DiaLog toggle</button>
                {this.state.showDialog?<Module hide={this.handleShowDialog}>这是一个弹窗</Module>:null}
            </div>
        )
    }
}
class Module extends Component{
    constructor(props){
        super(props)
        const doc=window.document
        this.node=doc.createElement("div")
        doc.body.appendChild(this.node)
    }
    componentWillUnmount(){
        window.document.body.removeChild(this.node)
    }
    render(){
        // console.log(this.props.children)
        return createPortal(
            <div style={{width:200,height:200,border:"1px solid #333"}}>
                <h1>模态框</h1>
                {this.props.children}
                <button onClick={this.props.hide}>关闭</button>
            </div>,
            this.node//将上面的div放到这个node所在的区域
        )
    }
}