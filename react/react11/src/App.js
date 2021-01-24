import React, { Component } from 'react';
import './App.css';

const checkGame=function(game){
  var arr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for (let i =0;i<arr.length;i++){
    let [index_1,index_2,index_3]=arr[i]
    if(game[index_1] !==null &&game[index_1]==game[index_2]&&game[index_2]==game[index_3]){
      return arr[i]
    }
  }
  return false
}

// 游戏历史记录
class History extends Component {
  render(){
    const{isXnext,winner,history,jump,nowstep,game}=this.props
    let title=""
    let winnerstr=game[winner[0]]//winner=[0,1,2]这样胜利的下标
    if(winner){//有赢家
      title=`Winner is ${winnerstr}`
    }else{//下一个操作玩家
      if(isXnext){
        title=`Next Player is "X"`
      }else{
        title=`Next Player is "O"`
      }
    }
    return(
      <div className="history">
        <h3>{title}</h3>
        <hr/>
        <ul>
          {history.map((item,index)=>(
            <li key={index}>
              <button onClick={()=>jump(index)} 
              style={index==nowstep?{color:"red"}:{}}
              >回到第{index}步</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
// 游戏格子
class Square extends Component {
  render(){
    return(
    <div className="box" 
    onClick={this.props.handleClick} 
    style={this.props.isHightLight?{color:"red"}:{}}
    >{this.props.index}</div>
    )
  }
}
//游戏面板
class Board extends Component {
  
  getSquare(i){
    const {game,handleClick,winner}=this.props
    var isHightLight=false
    if(winner){
      var set=new Set(winner)
      isHightLight=set.has(i)
    }
    return(
        <Square index={game[i]} handleClick={()=>handleClick(i)}
        isHightLight={isHightLight}
        ></Square>
      )
  }
  render(){
    return(
      <div className="box-wrap">
        {this.getSquare(0)}
        {this.getSquare(1)}
        {this.getSquare(2)}
        {this.getSquare(3)}
        {this.getSquare(4)}
        {this.getSquare(5)}
        {this.getSquare(6)}
        {this.getSquare(7)}
        {this.getSquare(8)}
      </div>
    )
  }
}
// 游戏容器
class Game extends Component {
  constructor(){
    super()
    this.state={
      history:[Array(9).fill(null)],//数组的每一项是个game的1*9的数组
      isXnext:true,
      nowstep:0
    }
  }
  handleClick(i){
    // 传递点击小方块的位置
    const {isXnext,nowstep}=this.state
    let {history}=this.state
    history=history.slice(0,nowstep+1)
    let game=history[nowstep].slice()//浅复制
    //游戏是否已经有赢家了
    if(checkGame(game)){
      return
    }
    if(game[i]){//小方块已经被点击过
      return
    }
    if(isXnext){//判断下一个玩家是谁
      game[i]="X"
    }else{
      game[i]="O"
    }
    this.setState(
      {
        history:history.concat([game]),
        isXnext:!isXnext,
        nowstep:nowstep+1
      }
    )
  }
  jump(index){
    var isXnext=index%2==0?true:false
    var nowstep=index
    this.setState({
      isXnext:isXnext,
      nowstep:nowstep
    })
  }
  render() {
    const {history,isXnext,nowstep}=this.state
    const game=history[nowstep]
    return (
      <div className="game">
        <Board game={game} 
        winner={checkGame(game)} 
        handleClick={(index)=>this.handleClick(index)}
        ></Board>
        <History game={game} 
        nowstep={nowstep} 
        jump={(index)=>this.jump(index)} 
        isXnext={isXnext} 
        winner={checkGame(game)} 
        history={history}
        ></History>
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Game></Game>
      </div>
    )
  }
}

export default App;
