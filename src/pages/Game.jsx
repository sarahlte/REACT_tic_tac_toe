import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg"

function Square({ value, onSquareClick }) {
  if (value == 'X'){
      return (
        <button className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
          <img src={cross} alt="X" />
        </button>
      );
  } else if (value == 'O') {
    return (
      <button className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </button>
    );
  } else {
    return (
      <button className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(() => {
    const board = localStorage.getItem('board');
    if(board){
      let squaresBoard = []
      for(let i = 0; i < board.length; i++){
        if(board[i-1] == 'X' && board[i] == ','  && i != board.length - 1){
          squaresBoard.push('X')
        } 
        else if (board[i-1] == 'O' && board[i] == ',' && i != board.length - 1) {
          squaresBoard.push('O')
          
        } 
        else if (board[i] == 'X' && i == board.length - 1) {
          squaresBoard.push('X')
        }
        else if (board[i] == 'O' && i == board.length - 1) {
          squaresBoard.push('O')
        }
        else if (board[i] == ','){
          squaresBoard.push(null)
        } 
      }
      if(squaresBoard.length != 9){
        return (Array(9).fill(null))
      }
      return squaresBoard
    } else {
      return (Array(9).fill(null))
    }
  });
  const [ties, setTies] = useState(localStorage.getItem('ties') ? localStorage.getItem('ties') : 0);
  const [p1Victory, setP1] = useState(localStorage.getItem('victory1') ? localStorage.getItem('victory1') : 0);
  const [p2Victory, setP2] = useState(localStorage.getItem('victory2') ? localStorage.getItem('victory2') : 0);
  const [player1, setPlayer1] = useState(localStorage.getItem('player1') ? localStorage.getItem('player1') : null)
  const [player2, setPlayer2] = useState(localStorage.getItem('player2') ? localStorage.getItem('player2') : null)
  const [game, setGame]= useState(localStorage.getItem('mode') && localStorage.getItem('difficulty') ? {mode: localStorage.getItem('mode'), difficulty: localStorage.getItem('difficulty')} : {mode: null, difficulty: null});
  const [ranking, setRanking] = useState(localStorage.getItem('ranking')? localStorage.getItem('ranking') : []);

  //setRanking(JSON.stringify(ranking));

  useEffect(()=> {
    localStorage.setItem('ranking', ranking);
  }, [ranking])

  useEffect(()=> {
    player1 != null ? localStorage.setItem('player', player1) : null;
  }, [player1])

  useEffect(()=> {
    player2 != null ? localStorage.setItem('player2', player2) : null;
  }, [player2])

  useEffect(()=> {
    p2Victory != null ? localStorage.setItem('victory2', p2Victory): null;
  }, [p2Victory])

  useEffect(()=> {
    p1Victory != null ? localStorage.setItem('victory1', p1Victory): null;
  }, [p1Victory])

  useEffect(()=> {
    ties != null ? localStorage.setItem('ties', ties): null;
  }, [ties])

  useEffect(()=> {
    localStorage.setItem('board', squares);
  }, [squares])

  function reset(){
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setTies(0);
    setP1(0);
    setP2(0);
    setPlayer1(null);
    setPlayer2(null);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isFull(squares)) {
      return;
    }
    const nextSquares = squares;
    if (xIsNext) {
      nextSquares[i] = "X";
      if(game.mode == 'bot'){
        let n = Math.floor(Math.random() * 8);
        while (nextSquares[n] != null){
          n = Math.floor(Math.random() * 8);
        }
        nextSquares[n] = "O"
      }
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    game.mode == 'multiplayer' ? setXIsNext(!xIsNext) : null;

    let board = [];
    for(let i = 0; i < squares.length; i++){
      if(squares[i] == null){
        board.push('')
      } else {
        board.push(squares[i])
      }
    }
    localStorage.setItem('board', squares);
  }

  function setPlayersName(e){
    e.preventDefault();
    const player1 = document.querySelector('#player1').value;
    if(game.mode == 'multiplayer'){
      const player2 = document.querySelector('#player2').value;
      if(player2 != ''){
        setPlayer2(player2);
      }
    } else {
      setPlayer2('CPU')
    }
    if(player1 != ''){
      setPlayer1(player1);
    }
  }

  const winner = calculateWinner(squares);
  const tie = isFull(squares);
  let status;
  let player;
  let nextP1 = p1Victory;
  let nextP2 = p2Victory;
  let nextTies = ties;
  if (winner) {
    status = 'WINNER';
    if (winner == 'X') {
      nextP1 = parseInt(nextP1) + 1;
      player = <img src={cross} alt="" className='w-4 mr-2' />;
    } 
    else {
      nextP2 = parseInt(nextP2) + 1;
      player = <img src={circle} alt="" className='w-4 mr-2'/>;
      setTimeout(()=>{setSquares(Array(9).fill(null))}, 5000);
    }
  } else if (tie){
    nextTies = parseInt(nextTies) + 1;
    status = 'TIE';
    player = '';
  } else {
    status = 'TURN '
    player = xIsNext ? <img src={cross} alt="" className='w-4 mr-2' /> : <img src={circle} alt="" className='w-4 mr-2'/>
  }
  if(winner || tie){
      setTimeout(()=> {
        setP1(nextP1);
        setP2(nextP2);
        setTies(nextTies);
        setSquares(Array(9).fill(null))
      }, 2000)
  }

  const rankingJsonParse = JSON.parse(ranking);
  console.log(squares);

  if(game.mode == 'multiplayer'){
    if(player1 && player2){
      return (
        <>
          <div className='flex items-center justify-center my-5'>
              <div className='flex w-28'>
                  <img src={cross} alt="X" className='w-8'/>
                  <img src={circle} alt="O" className='w-8'/>
              </div>
              <div className="status darkgrey-btn w-28 flex text-center items-center justify-center"> 
                {player} 
                <p>{status}</p> 
              </div>
              <div className='w-28 flex justify-end'>
                <button className='lightgrey-btn h-min' onClick={reset}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </div>
    
          </div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />        
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
          </div>
          <div className='game-info flex justify-center items-center mt-5'>
            <div className='div primary-score w-28'>
              <p className='text-center'>X ({player1})</p>
              <p className='text-center font-bold'>{p1Victory}</p>
            </div>        
            <div className='div tie-score w-28'>
              <p className='text-center'>TIES</p>
              <p className='text-center font-bold'>{ties}</p>
            </div>
            <div className='div secondary-score w-28'>
              <p className='text-center'>O ({player2})</p>
              <p className='text-center font-bold'>{p2Victory}</p>
            </div>
          </div>
        </>
      );
    }
    else {
      return (
        <>
          <form className='flex flex-col items-center justify-center my-5' onSubmit={setPlayersName}>
            <div className='flex flex-col items-start justify-center my-3'>
              <label htmlFor="player1" className='my-2 player1-label' >Player 1</label>
              <div className="flex w-72 flex-col">
                <div className="w-full max-w-sm min-w-[200px]">
                  <input name='player1' id='player1' className="player1-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center my-3'>
              <label htmlFor="player2" className='my-2 player2-label'>Player 2</label>
              <div className="flex w-72 flex-col">
                <div className="w-full max-w-sm min-w-[200px]">
                  <input name='player2' id='player2' className="player2-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                </div>
              </div>
            </div>
            <button className="lightgrey-btn my-3" type="submit">
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Play
            </button>
          </form>
        </>
      );
    }
  } 
  else if (game.mode == 'bot') {
    if(player1){
      return (
        <>
          <div className='flex items-center justify-center my-5'>
              <div className='flex w-28'>
                  <img src={cross} alt="X" className='w-8'/>
                  <img src={circle} alt="O" className='w-8'/>
              </div>
              <div className="status darkgrey-btn w-28 flex text-center items-center justify-center"> 
                {player} 
                <p>{status}</p> 
              </div>
              <div className='w-28 flex justify-end'>
                <button className='lightgrey-btn h-min' onClick={reset}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </div>
    
          </div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />        
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
          </div>
          <div className='game-info flex justify-center items-center mt-5'>
            <div className='div primary-score w-28'>
              <p className='text-center'>X ({player1})</p>
              <p className='text-center font-bold'>{p1Victory}</p>
            </div>        
            <div className='div tie-score w-28'>
              <p className='text-center'>TIES</p>
              <p className='text-center font-bold'>{ties}</p>
            </div>
            <div className='div secondary-score w-28'>
              <p className='text-center'>O ({player2})</p>
              <p className='text-center font-bold'>{p2Victory}</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <form className='flex flex-col items-center justify-center my-5' onSubmit={setPlayersName}>
            <div className='flex flex-col items-start justify-center my-3'>
              <label htmlFor="player1" className='my-2 player1-label' >Player 1</label>
              <div className="flex w-72 flex-col">
                <div className="w-full max-w-sm min-w-[200px]">
                  <input name='player1' id='player1' className="player1-input w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                </div>
              </div>
            </div>
            <button className="lightgrey-btn my-3" type="submit">
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Play
            </button>
          </form>
        </>
      ); 
    }
  }

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isFull(squares){
  for(let i = 0; i < squares.length; i++){
    if(squares[i] === null){
      return false;
    }
  }
  return true;
}
