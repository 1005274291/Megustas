import React, { Component } from 'react';
import { Collapse, Button ,Fade} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
class Demo extends Component {
    state = {
        in: true
    }
    render() {
        return (
            <div>
                <Button onClick={()=>this.setState({in:!this.state.in})}>测试渐变抽屉</Button>
                {/* 渐变过度 */}
                <Fade in={this.state.in} unmountOnExit={true}>
                {/* 抽屉 */}
                <Collapse in={this.state.in} unmountOnExit={true}>
                    {/* unmountOnExit收起抽屉时将DOM卸载 */}
                    <div>我是collapse</div>
                </Collapse>
                </Fade>
            </div>
        )
    }
}
export default Demo