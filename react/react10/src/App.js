import React ,{Component}from 'react';
import {Alert,Container,Col,Row,ButtonToolbar,Button} from "react-bootstrap"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Dropdowndemo from "./dropdown"
import Progress from "./progress"
import Modal from "./modal"
import Transition from "./transition"
class App extends Component{
  render(){
    return(
      <div>
        {/* 标签为危险 */}
        <Alert variant="danger">
          这是一个危险的警告
        </Alert>
        {/* 全屏 */}
        <Container>
          <Row>
            <Col xs="12" md="3">1</Col>
            <Col xs="12" md="3">2</Col>
            <Col xs="12" md="3">3</Col>
            <Col xs="12" md="3">4</Col>
          </Row>
        </Container>
        <ButtonToolbar>
          {/* as="div" 修改为div */}
          <Button variant="primary" active={true}>主要的按钮</Button>
        </ButtonToolbar>
        <Container>
          <Dropdowndemo></Dropdowndemo>
        </Container>
        <Progress></Progress>
        <Modal></Modal>
        <Transition></Transition>
      </div>
    )
  }
}

export default App;
