import React ,{Component}from 'react';
import {Dropdown} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
const {
    Toggle,
    Menu,
    Item
}=Dropdown
class Demo extends Component{
    state={
        selected:""
    }
    render(){
        return(
            <div>
                <Dropdown onSelect={e=>this.setState({selected:e})}>
                    <Toggle>
                        {this.state.selected? this.state.selected :"请选择"}
                    </Toggle>
                    <Menu>
                        <Item eventKey="baidu">百度</Item>
                        <Item eventKey="meituan">阿里</Item>
                        <Item eventKey="tengxun">腾讯</Item>
                    </Menu>
                </Dropdown>
            </div>
        )
    }
}
export default Demo