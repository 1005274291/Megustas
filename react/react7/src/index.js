import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware} from "redux"
import {Provider,connect} from "react-redux"
import chunk from "redux-thunk"
import $ from "jquery"
var reducer =function (state,action) {
    if (!state) {
        return {
            data:[],
            loading:false
        }
    }
    switch (action.type) {
        case "LOAD_DATA":
            return{
                ...state,
                loading:true
            }
        case "DONE_LOAD":
            return{
                ...state,
                loading:false,
                data:action.data
            }
        default:
            return state
    }
}
var store =createStore(reducer,applyMiddleware(chunk))

var loaddata=(keywords)=>{
    return function(dispatch,getState){
    dispatch({type:"LOAD_DATA"})
    $.ajax({
        method:"get",
        url:"http://jsonplaceholder.typicode.com/todos",
        success:(res)=>{
          console.log(res)
          dispatch({type:"DONE_LOAD",data:res})  
        }
      })
}
}
class App extends Component{
    render(){
        const{loading,data,loadData}=this.props
        console.log(loading,data)
        return(
            <div>
                <button onClick={()=>{
                    loadData()
                }
                }>
                    load data
                </button>
                <hr/>
                <div>
                    {loading ?"loading":"all data showing"}
                </div>
                {
                    loading ? "" :(
                        <ul>
                            {data.map((v,k)=>(
                                <li key={k}>
                                    {v.title}
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        )
    }
}

var mapState=function(state,ownprops){
    console.log(state)
    return{
        loading:state.loading,
        data:state.data
    }
}

var mapdispatch=function(dispatch,ownprops){
    return{
        loadData:function(){
            dispatch(loaddata("123我爱你"))
        }
    }
}
App =connect(mapState,mapdispatch)(App)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
serviceWorker.unregister();
