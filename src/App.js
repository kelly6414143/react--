import React, {Component} from 'react';
import './App.css';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = (props)=>{
    return(
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    )
}

class Board extends Component{

  renderSquare(i){
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
      />
      )
  }

  render(){


    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      
    )
  }
}

class Game extends Component{

  constructor(props){
    super(props)
    this.state = {
      history:[{
          squares : Array(9).fill(null),
        }
      ],
      stepNumber : 0,
      xisNext : true,
      status : ''
    }
  }

  handleClick(i){
  
    const history = this.state.history.slice(0, this.state.stepNumber+1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xisNext?'X':'O'
    this.setState(
      {
        history: [...history,{squares:squares}],
        stepNumber : history.length,
        xisNext: !this.state.xisNext
      }
      )
  }

  jumpTo(step){
    if(document.getElementsByClassName("show").length>0){
      document.getElementById("block").classList.remove('show')
    }
    this.setState(
      {
      stepNumber : step,
      xisNext : (step % 2) === 0
    },
    ()=>{
      this.setState(
        {
          history:  this.state.history.slice(0, this.state.stepNumber+1)
        }
      )
    }
    )
  }

  changeStatus(el){
    this.setState(
        {
          status : el
        }
      )
  }


  render(){
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step,move)=>{
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status = ""

    if(winner){
      status = `winner: ${winner}`
      document.getElementById("block").classList.add('show')
    }else{
      status = `Next player: ${this.state.xisNext?'X':'O'}`
      if(!current.squares.includes(null)){
        document.getElementById("block").classList.add('show')
      }
    }

    return (
      <div className="game">
        <div id="block">
          <div className="center">
            <p>{winner?'winner : '+winner:"平手"}</p>
            <button onClick={()=> this.jumpTo(0)}>重新開始</button>
          </div>
        </div>
        <div className="game-board">
            <Board
              squares = {current.squares}
              onClick = {(i)=> this.handleClick(i)}
            ></Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        PRACTICE REACT
      </header>
      <content>
        <Game/>
      </content>

    </div>
  );
}


export default App;
