import React,{Component}from 'react';
import {connect} from "react-redux"
import Addtodo from "./components/addtodo"
import Todolist from "./components/todolist"
import Fillter from "./components/fillter"
class App extends Component{
  render(){
    return(
      <div className="App">
        <Addtodo></Addtodo>
        <Todolist></Todolist>
        <Fillter></Fillter>
      </div>
    )
  }
}

App=connect()(App)

export default App;
