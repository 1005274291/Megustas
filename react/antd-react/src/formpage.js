import React, { Component } from 'react';
import { Button ,Form,Input} from "antd"
import {UserAddOutlined,VerifiedOutlined} from "@ant-design/icons"

const FormItem=Form.Item//组件复合
const nameRule={
    required:true,
    message:"please input your name"
}
const passwordRule={
    required:true,
    message:"please input your password"
}
export default class FormPage extends Component {
    formRef=React.createRef()
    submit=()=>{
        console.log(this.formRef.current.getFieldsValue())
    }
    render() {
        return (
            <div>
                <Form ref={this.formRef}>
                    <FormItem name="name" label="姓名" rules={[nameRule]}>
                        {/* prefix是输入框最左面标识 */}
                        <Input prefix={<UserAddOutlined></UserAddOutlined>}></Input>
                    </FormItem>
                    <FormItem name="password" label="密码" rules={[passwordRule]}>
                        {/* prefix是输入框最左面标识 */}
                        <Input type="password" prefix={<VerifiedOutlined></VerifiedOutlined>}></Input>
                    </FormItem>
                    <FormItem label="登录">
                        <Button htmlType="submit" type="ghost" onClick={this.submit}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}