import React, { Component } from 'react';
import {Link, BrowserRouter as Router ,Route,Switch,Redirect,Prompt} from "react-router-dom";
import './App.css';

class Home extends Component{
  render(){
    return(
    <div><h3>这是首页</h3></div>
    )
  }
}
class Form extends Component{
  render(){
    return(
      <div>
        <Prompt when={true} message="爱我别走"></Prompt>
        <input type="text"/>
      </div>
    )
  }
}
class Shopping extends Component{
  render(){
    var {history}=this.props
    return(
      <div>
        <button onClick={history.goBack}>返回上一级页面</button>
      </div>
    )
  }
}
class Detail extends Component{
  render(){
    console.log(this.props)
    return(
    <div>这是 id={this.props.match.params.id}详情页
    {/* <Link to="/shopping_car">跳转到购物车</Link> */}
    <button onClick={()=>this.props.history.replace("/shopping_car")}>跳转到购物车</button>
    </div>
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
            <Link to="/">首页</Link>
            </li>
            <li>
            <Link to="/blog">博客</Link>
            </li>
            <li>
            <Link to="/blogdwadwa">神奇网页</Link>
            </li>
            <li>
            <Link to="/blogdwadwdwadawda">神奇网页</Link>
            </li>
            <li>
            <Link to="/form">输入</Link>
            </li>
            <li>
            <Link to="/detail/1">台灯 id:1</Link>
            </li>
          </ul>
          <hr/>
          <Switch>
          <Redirect from="/blogdwadwa" to="/blog"></Redirect>
          <Route path="/" exact component={Home}></Route>
          <Route path="/blog" render={()=><div>这是博客</div>}></Route>
          <Route path="/form" component={Form}></Route>
          <Route render={()=><div>404</div>}></Route>
          </Switch>
          {/* <Route path="/detail/:id" render={(routerprops)=>{
            console.log(routerprops)
            return <div>详情</div>}
        }
          ></Route> */}
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/shopping_car" component={Shopping}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
