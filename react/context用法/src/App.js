import React, { Component } from 'react';
const Context = React.createContext()
const Provider = Context.Provider
const Consumer = Context.Consumer

const store = {
  home: { city: "beijing" },
  user: {
    name: "junjun"
  }
}

//高阶组件
const consumerHandle = Cmp => props => {
  console.log(props)
  return (
    <Consumer>{ctx => <Cmp {...props} {...ctx} />}</Consumer>
  )
}
function App() {
  const Hoo = consumerHandle(Home)
  return (
    <div className="App">
      <Provider value={store}>
        <h1>下面的是高阶组件</h1>
        <Hoo title={"这是props"} />
      </Provider>
    </div>
  );
}

class Layout extends Component {
  componentDidMount() {
    const { title = "商城" } = this.props
    document.title = title
  }
  render() {
    const { children, showTabBar = true } = this.props
    const a = []
    console.log(children)
    if (children.$$typeof) {
      a.push(children)//不具名的child  标签
    } else {
      //具名的child   对象value是标签
      for (let key in children) {
        a.push(children[key])
      }
    }
    return (
      <div>
        {
          a.map((item, index) => {
            return <div key={index}>{item}</div>
          })
        }
        {showTabBar && <div>henhao</div>}
      </div>
    )
  }
}

function Home(props) {
  console.log(props)
  return (
    <Layout title="商城首页" showTabBar={true}>
      {/* <div>
        {props.user.name}
        <h1>组件复合</h1>
      </div>
      <div>
        第二个child
      </div> */}
      {
        {
          btn:<button>按钮</button>
        }
      }
    </Layout>
  )
}

export default App;
