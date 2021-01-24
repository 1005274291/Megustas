import React from "react"
import Adapter from "enzyme-adapter-react-16"
import {shallow,render,mount,configure} from "enzyme"
import Link from "../link"

configure({
    adapter:new Adapter()
})
test("Link组件的文本应该等于传入的props.label",()=>{//测试描述
    var link =shallow(<Link label="百毒不侵"></Link>)//浅渲染函数，组件内部看作字符串
    expect(
        link.text()//实际得到的结果
    ).toEqual("百毒不侵")//期盼得到的结果

    var link_2=render(<Link label="百毒不侵"></Link>)//渲染更深层次的，不能模拟点击cheerio
    expect(
        link_2.find("#label").text()//可以当作jq选择器
    ).toEqual("百毒不侵")
    
})

test("点击link的时候，其类名应该为active",()=>{
    var link =shallow(<Link label="百毒不侵"></Link>)
    link.simulate("click")//模拟点击事件
    expect(link.props().className).toEqual("active")//获取定义组件的属性上的类名

    var link_2 =mount(<Link label="百毒不侵"></Link>) //渲染整个组件和全部的生命周期
    link_2.simulate("click")
    expect(
        link_2.getDOMNode().className//获取到DOM
    ).toEqual("active")
})