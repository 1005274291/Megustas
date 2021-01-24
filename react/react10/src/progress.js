import React ,{Component}from 'react';
import {ProgressBar} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
class Demo extends Component{
    state={
        now:0
    }
    componentDidMount(){
        this.time=window.setInterval(()=>{
            var {now}=this.state
            if(now<=100){
                this.setState({
                    now :now+1
                })
            }else{
                window.clearInterval(this.time)
            }
        },200)
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
    render(){
        return(
            <div>
                <ProgressBar now={this.state.now} label={`${this.state.now}%`}></ProgressBar>
            </div>
        )
    }
}
export default Demo