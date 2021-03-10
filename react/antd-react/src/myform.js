import React, { Component } from 'react';

function myFormCreate(Cmp){
    return class extends Component{
        constructor(props){
            super(props)
            this.options={}//存储配置字段项
            this.state={}//存储字段值
        }
        handleChange=event=>{
            const {name,value}=event.target
            this.setState({
                [name]:value
            })
        }
        getFieldDecorator=(field,option)=>{
            this.options[field]=option
            return InputCmp=>(
                <div>
                    {
                        React.cloneElement(InputCmp,{
                            name:field,
                            value:this.state[field]||"",
                            onChange:this.handleChange
                        })
                    }
                </div>
            )
        }
        getFieldsValue=()=>{
            return {...this.state}
        }
        validateFields=callback=>{//接收一个回调函数
            const tem={...this.state}//要返回的state
            const err=[]//错误序列
            for(let i in this.options){//例如i为name
                if(this.options[i].hasOwnProperty("rules")){
                    if(!tem[i]){
                        //对应的字段没有值
                        err.push({
                            [i]:"error"
                        })
                    }
                }
            }
            if(err.length>0){
                //存在错误
                callback(err,tem)
            }else{
                //没有错误
                callback(undefined,tem)
            }
        }
        render(){
            return(
                <div>
                    <Cmp {...this.props} getFieldDecorator={this.getFieldDecorator} getFieldsValue={this.getFieldsValue} validateFields={this.validateFields}></Cmp>
                </div>
            )
        }
    }
}

class MyForm extends Component{
    submit=()=>{
        const {getFieldsValue,validateFields}=this.props
        console.log("submib",getFieldsValue())
        validateFields((err,value)=>{
            if(err){
                console.log("err",err)
            }else{
                console.log("成功",value)
            }
        })
    }
    render(){
        const {getFieldDecorator} =this.props
        const nameRule={
            required:true,
            message:"please input your name"
        }
        const passwordRule={
            required:true,
            message:"please input your password"
        }
        return(
            <div>
                <h1>MyFormPage</h1>
                {getFieldDecorator("name",{rules:[nameRule]})(<input type="text"></input>)}
                {getFieldDecorator("password",{rules:[passwordRule]})(<input type="password"></input>)}
                <button onClick={this.submit}>提交</button>
            </div>
        )
    }
}

export default myFormCreate(MyForm)