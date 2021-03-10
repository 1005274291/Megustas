import React,{useState,useEffect} from 'react';
import Hookfruit from "./hooksreducer"
import HookContext from "./hookcontext"
function App() {
  const [data,setData]=useState(new Date())
  const [fruits,setFruits]=useState(["apple","pear"])
  const delCur=delIdex=>{
    const tem=[...fruits]
    tem.splice(delIdex,1)
    setFruits(tem)
  }
  useEffect(()=>{
    const timeId=setInterval(()=>{
      setData(new Date())
    },1000)
    return ()=>clearInterval(timeId)
  },[data])
  return (
    <div className="App">
      <h1>{data.toLocaleTimeString()}</h1>
      <ul>
        {
          fruits.map((item,index)=>{
          return <li key={index} onClick={()=>delCur(index)}>{item}</li>
          })
        }
      </ul>
      <AddFruit addFruit={(item)=>setFruits([...fruits,item])}></AddFruit>
      <Hookfruit></Hookfruit>
      <HookContext></HookContext>
    </div>
  );
}
function AddFruit({addFruit}){
  const [name,setName]=useState("")
  return(
    <div>
      <input value={name} onChange={e=>setName(e.target.value)}></input>
      <button onClick={()=>addFruit(name)}>点击增加</button>
    </div>
  )
}

export default App;
