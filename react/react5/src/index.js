import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {createStore,applyMiddleware} from "redux"
import {connect,Provider} from "react-redux"
import reducer from "./reducers"
import {add_one} from "./action"

var logger=store=>next=>action=>{
    console.group("logger")
    console.log(action)
    next(action)
    console.log(store.getState())
    console.groupEnd("logger")
}
var store =createStore(reducer,applyMiddleware(logger))

class App extends Component{
    render(){
        const {count,add_one}=this.props
        return(<div>
            {count}
            <button onClick={add_one}>
                点一下+1
            </button>
        </div>)
    }
}

var mapstate=function (state,ownprops) {
    return{
        count:state.reducer.count
    }
}
var mapdispatch=function(dispatch,ownprops){
    return{
        add_one:function(){
            dispatch(add_one())
        }
    }
}
App=connect(mapstate,mapdispatch)(App)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
