import React, { Component } from 'react';
import {Button} from "antd"
const foo = Cmp => props => {
    return (
        <div style={{ border: "solid 1px #333" }}>
            <Cmp {...props}></Cmp>
        </div>
    )
}

class Child extends Component {
    render() {
        return <div>child</div>
    }
}
@foo//装饰器
class HocPage extends Component {
    render() {
        return (
            <div>
                <h1>HocPage</h1>
                <Child></Child>
                <Button type="primary">antd按钮</Button>
            </div>
        )
    }
}

export default HocPage