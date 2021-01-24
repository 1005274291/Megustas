import React,{Component} from 'react';
import './App.css';
import AvatarEditor from "react-avatar-editor"
import image from "./1.jpg"
import axios from "axios"
class App extends Component{
  state={
    scale:1,
    img:"",
    list:[]
  }
  onClicksave=()=>{
    if (this.editor) {
      const canvas =this.editor.getImage().toDataURL()//将像素点变为base64编码
      fetch(canvas)
        .then(res=>res.blob())//变为二进制编码
        .then(blob=>{
          var img =window.URL.createObjectURL(blob)//变为图片地址
          this.setState({img:img})
        })
    }
  }
  componentDidMount(){
    //下面是axios
    var myAxios =axios.create({
      baseURL:"http://jsonplaceholder.typicode.com",
      headers:{
        "content-type":"application/json"
      // },transformRequest:[//请求前对数据进行处理，会丢失axios对数据默认的处理
      //   data=>{
      //     console.log(data)
      //     data.userId=1
      //     return JSON.stringify(data)
      //   }],
      },transformResponse:[//接收数据前对数据进行处理，会丢失axios对数据默认的处理
          res=>(
            JSON.parse(res)
          )
        ]
      })
    myAxios.interceptors.request.use(//请求前对请求头进行处理
      config=>{
        config.headers["x-powered-by"]="axios"
        return config
      }
    )
    myAxios.interceptors.response.use(//获取数据前对数据进行修改
      res=>{
        return res.data
      }
    )
    myAxios.get("/todos",{})
      .then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    myAxios.post("/posts",{
      title:"foo",
      body:"bar"
    }).then(res=>{
      console.log(res)
    })
    //下面是ajax
    // $.ajax({
    //   method:"get",
    //   url:"http://jsonplaceholder.typicode.com/todos"})
    //   .then(res=>{
    //     console.log(res)
    //     this.setState({
    //       list:res
    //     })
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    //下面是fetch
    // var getTodos=new Request(
    //   "http://jsonplaceholder.typicode.com/todos",
    //   {
    //     method:"get",
    //   credentials:"include"
    //   }
    // )
    // var headers=new Headers()
    // headers.set("content-type","application/json")
    // fetch(getTodos,{
    //   headers:headers
    // }).then(res=>{
    //   console.log(res)//返回Request对象
    //   return res.json()
    // }).then(json=>{
    //   console.log(json)
    // }).catch(err=>{
    //   console.log(err)
    // })
  }
  render(){
    const {scale,img,list}=this.state
    return(
      <div>
        <AvatarEditor 
        ref={node=>this.editor=node}
        image={image}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        rotate={0}
        ></AvatarEditor>
        <div><img src={img} alt=""/></div>
        <div>
          <input type="range" value={scale} onChange={(e)=>this.setState({scale:e.target.value})}/>
          <button onClick={this.onClicksave}>保存</button>
        </div>
        <div>
          {
            list.map((v,k)=>(
              <li key={k}>
                {v.title}
              </li>
            ))
          }
        </div>
      </div>
    )
  }
}

export default App;
