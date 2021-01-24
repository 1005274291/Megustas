import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
const {
    Dialog,
    Header,
    Title,
    Body,
    Footer
} = Modal
class Demo extends Component {
    state = {
        show: false
    }
    _handleshow = () => {
        this.setState({
            show: true
        })
    }
    _handleshid = () => {
        this.setState({
            show: false
        })
    }
    render() {
        return (
            <div>
                <Button variant="outline-primary" onClick={this._handleshow}>呼出模态框</Button>
                <Modal show={this.state.show} onHide={this._handleshid}>
                    <Header closeButton>
                        <Title>FBI 警告！</Title>
                    </Header>
                    <Body>
                        <p>你把我点出来干啥啊</p>
                    </Body>
                    <Footer>
                        <Button variant="secondary" onClick={this._handleshid}>关闭</Button>
                        <Button variant="primary">确定</Button>
                    </Footer>
                </Modal>
            </div>
        )
    }
}
export default Demo