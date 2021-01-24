import React, { Component } from 'react';
import UUid from "uuidjs"
import { Link, BrowserRouter as Router, Route, Switch, Redirect, Prompt } from "react-router-dom";
import './App.css';

const fakeApi = {
  list: [
    {
      name: "华为(HUAWEI)MateBook 13 2020款 锐龙版 全面屏轻薄笔记本电脑 (AMD R5 16+512GB 集显 Office 2K )银",
      price: "4699.00",
      img: "http://img12.360buyimg.com/n1/s450x450_jfs/t1/99299/22/9675/324500/5e12d181E5f37cfe8/347f1957a13dc20e.jpg",
      id: UUid.generate()
    },
    {
      name: "联想（Lenovo）天逸510Pro英特尔酷睿i5个人商务台式机电脑整机（i5-9400F 8G 1T+256G SSD 2G独显 ）23英寸",
      price: "4899.00",
      img: "http://img11.360buyimg.com/n1/s450x450_jfs/t29275/348/1199492920/180021/e1a5e7d6/5cd905ceNae9f3a11.jpg",
      id: UUid.generate()
    },
    {
      name: "Apple iPhone XS Max (A2104) 256GB 金色 移动联通电信4G手机 双卡双待",
      price: "7199.00",
      img: "http://img12.360buyimg.com/n1/s450x450_jfs/t1/86645/26/13817/338041/5e5c6d9cE57c0c1a1/a2b9e97fde8b3b34.jpg",
      id: UUid.generate()
    },
    {
      name: "【轻正装系列】报喜鸟新款男士商务羊毛西服套装 平驳领青年西装 灰色 44A(165/88)",
      price: "2990.00",
      img: "//img13.360buyimg.com/n1/s350x449_jfs/t1/108685/21/7321/193568/5e5a4722E1521315f/b333a3dfd80ae0e2.jpg!cc_350x449.jpg",
      id: UUid.generate()
    },
    {
      name: "报喜鸟2019秋季新款男士商务休闲单西 修身羊毛便西时尚都市西装【商场同款】 灰咖人字纹 48A",
      price: "3980.00",
      img: "//img14.360buyimg.com/n1/s350x449_jfs/t1/109074/11/7429/256163/5e5a4720E148660d2/a56e3ca980bdd789.jpg!cc_350x449.jpg",
      id: UUid.generate()
    },
    {
      name: "FANBOX 阿玛尼（ Emporio Armani）满天星手表 女新款玫瑰金钢制表带镶钻石英轻奢女士腕表情人节礼物 AR11244",
      price: "3740.00",
      img: "//img14.360buyimg.com/n1/jfs/t1/108721/17/7443/252134/5e5cd4acEc299779d/fb4f123d7ff84378.jpg",
      id: UUid.generate()
    }
  ],
  shoppingcar: [],
  getlist: function (callback) {
    callback(this.list)
  },
  getdetail: function (id, callback) {
    callback(this.list.filter(e => e.id == id)[0])
  },
  addshopingcar: function (id, callback) {
    this.shoppingcar.push(
      this.list.filter(e => e.id == id)[0]
    )
    callback({ code: 200, msg: "添加成功" })
  },
  getshoppingcar: function (callback) {
    callback(this.shoppingcar)
  }
}

class Nav extends Component {
  render() {
    return (
      <Route
        path="/"
        children={(routerprops) => {
          var isrender = routerprops.location.pathname == "/" ? false : true
          var pathname = routerprops.location.pathname
          var pagename = ""
          switch (pathname) {
            case "/":
              pagename = "首页"
              break;
            case "/shoppingcar":
              pagename = "购物车"
              break
            case "/list":
              pagename = "商品列表"
              break
            default:
              pagename = "商品详情"
              break;
          }
          return (
            <div className="nav">
              {
                isrender ? (<button className="goback" onClick={routerprops.history.goBack}>{"<"}</button>) : ""
              }
              <p className="page-title">{pagename}</p>
            </div>
          )
        }}
      ></Route>
    )
  }
}

class Bottombar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <Route path="/" exact children={(routerprops) => {
          var isactive = routerprops.match ? true : false
          return <Link className="bottom-bar-bottom" to="/" style={{ backgroundColor: isactive ? "white" : "cornflowerblue" }}>首页</Link>
        }}></Route>
        <Route path="/shoppingcar" children={(routerprops) => {
          var isactive = routerprops.match ? true : false
          return <Link className="bottom-bar-bottom" to="/shoppingcar" style={{ backgroundColor: isactive ? "white" : "cornflowerblue" }}>购物车</Link>
        }}></Route>
      </div>
    )
  }
}
class Indexview extends Component {
  render() {
    return (
      <ul>
        <li className="index-item">
          <Link to="/list" className="index-link">商品列表</Link>
        </li>
      </ul>
    )
  }
}
class Listview extends Component {
  state = {
    data: []
  }
  componentWillMount() {//组件将要加载
    fakeApi.getlist((data) => {
      this.setState({
        data: data
      })
    })
  }
  render() {
    const { data } = this.state
    return (
      <ul className="list">
        {data.map((v, k) => (
          <li key={v.id}>
            <Link className="item" to={`/detail/${v.id}`}>
              <img className="item-img" src={v.img} alt="" />
              <div className="item-wrap">
                <p className="item-name">{v.name}</p>
                <p className="item-price">{v.price}</p>
              </div>
            </Link>
          </li>
        ))
        }
      </ul>
    )
  }
}
class Detailview extends Component {
  state = {
    data: {}
  }
  componentWillMount() {
    var id = this.props.match.params.id
    fakeApi.getdetail(id, (data) => {
      this.setState({
        data: data ? data : {}
      })
    })
  }
  addcar(id) {
    fakeApi.addshopingcar(id, () => {
      this.props.history.push("/shoppingcar")
    })
  }
  render() {
    const { data } = this.state
    return (
      <div className="detail-view">
        <img className="detail-title" src={data.img} alt="" />
        <h4 className="detail-name">{data.name}</h4>
        <p className="detail-price">{data.price}</p>
        <div className="bottom-bar">
          <button className="bottom-bar-bottom" onClick={() => { this.addcar(data.id) }}>加入购物车</button>
          <button className="bottom-bar-bottom" id="by" onClick={() => { this.props.history.push("/payment") }}>立即购买</button>
        </div>
      </div>
    )
  }
}
class Carview extends Component {
  state = {
    data: [],
  }
  componentWillMount() {
    fakeApi.getshoppingcar((data) => {
      this.setState({ data: data })
    })
  }
  delatecar(name) {
    this.state.data.map((v, k) => {
      while (v.name == name) {
        this.state.data.splice(k, 1)
        break
      }
    })
    this.setState({ data: this.state.data })
  }
  getimg() {
    this.props.history.push("/payment")
  }
  render() {
    const { data } = this.state
    var total = 0
    console.log(total, data)
    return (
      <ul className="shopping-view">
        {
          data.map((v, k) => {
            total = parseInt(v.price) + total
            return (
              <li className="shopping-item">
                <Link to={`/detail/${v.id}`} key={v.id + k}>
                  <img className="item-img" src={v.img} alt="" />
                  <div className="item-wrap">
                    <p className="item-name">{v.name}</p>
                    <p className="item-price">{v.price}</p>
                  </div>
                </Link>
                <button className="delate" onClick={() => this.delatecar(v.name)}>移除商品</button>
              </li>)
          })
        }
        <div className="total">总价：{total}</div>
        <button className="payment" onClick={() => this.getimg()}>去结算</button>
      </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrap">
          <Nav></Nav>
          <div className="app-main-view">
            <Route className="main-view" path="/" exact component={Indexview}></Route>
            <Route className="main-view" path="/list" exact component={Listview}></Route>
            <Route className="main-view" path="/detail/:id" exact component={Detailview}></Route>
            <Route className="main-view" path="/shoppingcar" exact component={Carview}></Route>
            <Route className="main-view" path="/payment" exact render={() => <div className="saoma-wrap">请扫码<img className="saoma" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583238945390&di=ac6fb43c940748bd4210eb31573eabf3&imgtype=0&src=http%3A%2F%2Fpic119.nipic.com%2Ffile%2F20170104%2F3012258_150718086030_2.jpg" alt="" /></div>}></Route>
          </div>
          <Route path="/" exact component={Bottombar}></Route>
          <Route path="/shoppingcar" exact component={Bottombar}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
