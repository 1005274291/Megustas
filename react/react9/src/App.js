import React, { Component } from 'react';
import './App.css';


class Title extends Component{
  render(){
    const {title}=this.props
    return(
      React.createElement(
        "h1",//创建标签类型
        {onClick:e=>{window.alert(title)}},//创建标签属性
        title//创建标签内容
      )
    )
  }
}
class App extends Component {
  state = {
    html: "<div>这是HTML</div>"
  }
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{
          __html: this.state.html
        }}
        >
        </div>
        <Title title="这是jsx"></Title>
        {
          React.createElement(
            Title,//接收组件
            {
              title:"这是来自 createElement"//给组件传参
            },
            ""//组件的children
          )
        }
      </div >
    )}
}

export default App;
