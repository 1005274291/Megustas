import React,{Component} from 'react';
import proptypes from "prop-types"
class Button extends Component{
    constructor(props){
        super(props)
        console.log("constructor")
    }
    static contextTypes={//子组件检查接收上下文类型
        title:proptypes.string
    }
    static propTypes={//检查接收参数类型
        title:proptypes.string
    }
    static defaultProps={//设置默认参数
        title:"这个是默认标题"
    }
    static getDerivedStateFromProps(nextprops,prevstate){
        console.log("静态生命周期函数")
        //函数返回结果会添加到state的内容
        return null
    }
    //constructor
    //加载生命周期
    componentWillMount(){
        console.log("组件将要加载")
        //发起ajax
    }
    //render
    componentDidMount(){
        console.log("组件已经加载")
        //操作DOM
        //设置定时器
        //发起ajax
    }
    //更新生命周期
    componentWillReceiveProps(nextprops){
        console.log("组件将要接受参数") 
    }
    shouldComponentUpdate(nextprops,nextState){
        console.log("组件是否应该更新")
        return true
    }
    componentWillUpdate(nextprops,nextState){
        console.log("组件将要更新")
    }
    getSnapshotBeforeUpdate(){
        console.log("在更新前获取截图")
        return "来自render前的截图"
    }
    componentDidUpdate(prevprops,prevstate,info){
        console.log("组件已经更新完毕！")
        console.log(info)//更新前获取截图函数的返回值
        //操作DOM
    }
    //卸载生命周期
    componentWillUnmount(){
        console.log("组件将要卸载")
        //取消定时器
    }
    render(){
        console.log(this.context.title)
        console.log("render")
        return(
        <div>
        {this.props.children}
        <button type={"button"} onClick={()=>this.setState({})}>{this.props.title}</button>
        <button type={"button"} onClick={()=>this.forceUpdate()}>{this.props.name}</button>
        </div>
        )
    }
}
export default Button