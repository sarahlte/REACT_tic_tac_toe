import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

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
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [ties, setTies] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  function reset(){
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setTies(0);
    setP1(0);
    setP2(0);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isFull(squares)) {
      return;
    }
    const nextSquares = squares;
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const tie = isFull(squares);
  let status;
  let player;
  let nextP1 = p1;
  let nextP2 = p2;
  let nextTies = ties;
  if (winner) {
    status = 'WINNER';
    if (winner == 'X') {
      nextP1 += 1;
      player = <img src={cross} alt="" className='w-4 mr-2' />;
    } 
    else {
      nextP2 += 1;
      player = <img src={circle} alt="" className='w-4 mr-2'/>;
      setTimeout(()=>{setSquares(Array(9).fill(null))}, 5000);
    }
  } else if (tie){
    nextTies += 1;
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
          <p className='text-center'>X (P1)</p>
          <p className='text-center font-bold'>{p1}</p>
        </div>        
        <div className='div tie-score w-28'>
          <p className='text-center'>TIES</p>
          <p className='text-center font-bold'>{ties}</p>
        </div>
        <div className='div secondary-score w-28'>
          <p className='text-center'>O (P2)</p>
          <p className='text-center font-bold'>{p2}</p>
        </div>
      </div>
    </>
  );
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
