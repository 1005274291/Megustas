import React, { Component, PureComponent,memo } from "react"
export default class Pure extends Component {
    state = {
        counter: 0
    }
    setCounter = () => {
        this.setState({
            counter:1
        })
    }
    render() {
        const { counter } = this.state
        return (
            <div>
                <h1>purecomponent</h1>
                <button onClick={this.setCounter}>改变</button>
                <Demo counter={counter}></Demo>
            </div>
        )
    }
}
// class Demo extends PureComponent {//浅比较 对象数组不成立
//     render() {
//         const { counter } = this.props
//         console.log("render")
//         return <div>{counter}</div>
//     }
// }
const Demo =memo(
    props=>{
        const {counter}=props
        console.log("memo,render")
        return <div>{counter}</div>
    }
)
