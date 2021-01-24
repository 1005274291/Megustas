import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "./button"
import proptypes from "prop-types"
//类方法写组件
// class Nav extends Component{
//   constructor(){
//     super()
//   }
//   render(){
//     return(
//     <div style={{color:"white",backgroundColor:"black"}}>
//       大广播
//       </div>)
//   }
// }
//受控组件
class Input extends Component{
  constructor(){
    super()
    this.state={
      value:""
    }
  }
  handleinput(e){
    //e.target.value    target:html标签
    //e.nativeEvent     原生事件
    if (e.target.value.length>10) {
      return
    }
    this.setState({
      value:e.target.value
    })
  }
  render(){
    return(
      <input type="text" onInput={(e)=>this.handleinput(e)} value={this.state.value}/>
    )
  }
}

const Nav =function(props){
  return(
  <div style={{color:"white",backgroundColor:"black"}}>{props.title}{props.children}</div>
  )
}
//函数方法写组件
// const Button=function () {
//   return(
//     <button type="button">组件按钮</button>
//   )
// }
class Button1 extends Component{
  constructor(props){
    super(props)
  }
  render(){
    var thecolor=this.props.thecolor
    return(
      <div>
        <button style={{color:thecolor}} onClick={()=>this.props.handleclick("red")}>红色</button>
        <button style={{color:thecolor}} onClick={()=>this.props.handleclick("green")}>绿色</button>
      </div>
    )
  }
}
class Title extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const thecolor=this.props.thecolor
    return(
      <h3 style={{color:thecolor}}>标题</h3>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      like:false,
      thecolor:"yellow"
    }
  }
  static childContextTypes={//父组件传递上下文时的类型检查
    title:proptypes.string
  }
  getChildContext(){           //像子组件传递上下文
    return {
      title:"大标题"
    }
  }
  handleclick(color){
    this.setState({
      like:!this.state.like,
      thecolor:color
    })
  }
  render(){
    return(
      <div>
        <h3>APP</h3>
        <Title thecolor={this.state.thecolor}></Title>
        <Button1 thecolor={this.state.thecolor} handleclick={(color)=>{this.handleclick(color)}}></Button1>
        <Nav title={"标题"}>
          <h3>这是一个传递的children</h3>
          <h3>这是一个传递的children2</h3>
          <h3>这是一个传递的children3</h3>
          </Nav>
        <Button name={"点一下呗"}>
          <h3>这是Button组建的一个children</h3>
          <h3>这是Button组建的一个children</h3>
        </Button>
        <Input></Input>
    <button type="button" style={this.state.like ? {color:"red"}:{color:"green"}}
    onClick={()=>this.handleclick()}
    >{this.state.like?"已赞":"喜欢"}
      </button>   
      </div>
    )
  };
}

export default App;
