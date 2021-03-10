import React, { Component } from "react"
import classnames from "classnames"
const treeData = {
    key: 0,//表示唯一性
    title: "全国",//节点名称显示
    children: [//子节点数组
        {
            key: 1,
            title: "北方区域",
            children: [
                {
                    key: 2,
                    title: "黑龙江省",
                    children: [
                        {
                            key: 3,
                            title: "哈尔滨",
                        }
                    ]
                },
                {
                    key: 4,
                    title: "北京",
                }
            ]
        },
        {
            key: 5,
            title: "南方区域",
            children: [
                {
                    key: 6,
                    title: "上海",
                },
                {
                    key: 7,
                    title: "广东省",
                }
            ]
        }
    ]
}

export default class TreePage extends Component {
    render() {
        return (
            <div>
                <h1>TreePage</h1>
                <TreeNode data={treeData}></TreeNode>
            </div>
        )
    }
}

class TreeNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }
    handleExpanded = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    render() {
        const { title, children } = this.props.data
        const { expanded } = this.state
        const hasChildren = children && children.length > 0
        return (
            <div>
                <div className="nodeInner" onClick={this.handleExpanded}>
                    {hasChildren&&<i className={classnames("tri", expanded ? "tri-open" : "tri-close")}></i>}
                    <span>{title}</span>
                </div>
                {
                    hasChildren&&expanded&&(
                        <div className="children">
                            {
                                children.map(item=>{
                                    return<TreeNode key={item.key} data={item}></TreeNode>
                                })
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}