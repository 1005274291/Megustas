import React, { Component } from 'react';
import {Link, BrowserRouter as Router ,Route,Switch,Redirect,Prompt} from "react-router-dom";
import logo from './logo.svg';
import './App.css';


class Indexview extends Component{
  render(){
    return(
      <div>首页</div>
    )
  }
}
class Blogview extends Component{
  render(){
    return(
      <div>博客</div>
    )
  }
}
class Form extends Component{
  state={
    value:""
  }
  render(){
    const {value}=this.state
    const {history}=this.props
    if(value){
      // history.block("如果跳转您的表单数据将丢失")
    }
    return(
      <div>
        <Prompt when={value ? true:false} message="如果跳转您的表单数据将丢失"></Prompt>
        <input type="text" value={value} onChange={()=>{}} onInput={
          (e)=>{
            this.setState({value:e.target.value})
          }
        }></input>
      </div>
    )
  }
}
const routers=[
  {
    path:"/",
    exact:true,
    component:Indexview
  },
  {
    path:"/blog",
    exact:true,
    component:Blogview
  },
  {
    path:"/form",
    exact:true,
    component:Form
  }
]

class Customlink extends Component{
  render(){
    const {to,label} =this.props
    return(
      <Route path={to} exact children={(routerprops)=>{
        console.log(routerprops)
        var isactive=routerprops.match ? true:false
      return <Link to={to} style={{color:isactive ? "red":"black"}}>{label}</Link>
      }}>
      </Route>
    )
  }
}
class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Customlink to="/" label="首页"></Customlink>
            </li>
            <li>
              <Customlink to="/blog" label="博客"></Customlink>
            </li>
            <li>
              <Customlink to="/form" label="登录"></Customlink>
            </li>
          </ul>
          <hr/>
          {
            routers.map((v,k)=>{
              return <Route key={k} path={v.path} exact={v.exact} component={v.component}></Route>
            })
          }
        </div>
      </Router>
    )
  }
}

export default App;
