import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg"

function Square({ value, onSquareClick }) {
  if (value == 'X'){
      return (
        <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
          <img src={cross} alt="X" />
        </div>
      );
  } else if (value == 'O') {
    return (
      <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </div>
    );
  } else {
    return (
      <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        {value}
      </div>
    );
  }

}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(localStorage.getItem('board')? JSON.parse(localStorage.getItem('board')) : Array(9).fill(null));
  const [ties, setTies] = useState(localStorage.getItem('ties') ? localStorage.getItem('ties') : 0);
  const [p1Victory, setP1] = useState(localStorage.getItem('victory1') ? localStorage.getItem('victory1') : 0);
  const [p1Moves, setP1Moves] = useState(localStorage.getItem('p1moves') ? localStorage.getItem('p1moves') : JSON.stringify([]));
  const [p2Victory, setP2] = useState(localStorage.getItem('victory2') ? localStorage.getItem('victory2') : 0);
  const [p2Moves, setP2Moves] = useState(localStorage.getItem('p2moves') ? localStorage.getItem('p2moves') : JSON.stringify([]));
  const [player1, setPlayer1] = useState(localStorage.getItem('player1') ? localStorage.getItem('player1') : null)
  const [player2, setPlayer2] = useState(localStorage.getItem('player2') ? localStorage.getItem('player2') : null)
  const [game, setGame]= useState(localStorage.getItem('mode') && localStorage.getItem('difficulty') ? {mode: localStorage.getItem('mode'), difficulty: localStorage.getItem('difficulty')} : {mode: null, difficulty: null});
  const [ranking, setRanking] = useState(localStorage.getItem('ranking')? localStorage.getItem('ranking') : JSON.stringify([{username: 'Kappa', score: 12}, {username: 'Pierre', score: 9},{username: 'Paul', score: 7}, {username: 'Marie', score: 6}, {username: 'Sarah', score: 3}, {username: 'Tom', score: 1}]));

  useEffect(()=> {
    localStorage.setItem('ranking', ranking);
    player1 != null ? localStorage.setItem('player1', player1) : null;
    player2 != null ? localStorage.setItem('player2', player2) : null;
    p1Victory != null ? localStorage.setItem('victory1', p1Victory): null;
    p1Moves != null ? localStorage.setItem('p1moves', p1Moves): null;
    p2Victory != null ? localStorage.setItem('victory2', p2Victory): null;
    p2Moves != null ? localStorage.setItem('p2moves', p2Moves): null;
    ties != null ? localStorage.setItem('ties', ties): null;
  }, [ranking, player1, player2, p1Victory, p1Moves, p2Victory, p2Moves,ties])


  function reset(){
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setTies(0);
    setP1(0);
    setP2(0);
    setP1Moves(JSON.stringify([]))
    setP2Moves(JSON.stringify([]))
    setPlayer1(null);
    setPlayer2(null);
    localStorage.removeItem('board');
    localStorage.removeItem('ties');
    localStorage.removeItem('victory1');
    localStorage.removeItem('victory2');
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
    localStorage.removeItem('p1moves');
    localStorage.removeItem('p2moves');
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isFull(squares)) {
      return;
    }

    const newSquares = squares.map((square, index) => {
      if (index === i) return xIsNext ? "X" : "O";
      return square;
    });


    if (xIsNext) {
      if (game.mode == "bot" && newSquares.filter((square)=> square == null).length > 1) {
        let n = Math.floor(Math.random() * 8);
        while (newSquares[n] != null) {
          n = Math.floor(Math.random() * 8);
        }
        newSquares[n] = "O";
        if(game.difficulty == 'hard'){
          let movesP2 = JSON.parse(p2Moves);
          if(movesP2.length === 3){
            const firstMove = movesP2[0]
            newSquares[firstMove]= null
            movesP2.shift();
            movesP2.push(n)
            setP2Moves(JSON.stringify(movesP2))
          } else {
            movesP2.push(n)
            setP2Moves(JSON.stringify(movesP2))
          }
        }
      }
      if (game.difficulty == 'hard'){
        let movesP1 = JSON.parse(p1Moves)
        if(movesP1.length === 3){
          const firstMove1 = movesP1[0]
          newSquares[firstMove1] = null;
          movesP1.shift();
          movesP1.push(i);
          setP1Moves(JSON.stringify(movesP1));
        } else {
          movesP1.push(i);
          setP1Moves(JSON.stringify(movesP1));
        }
      }
    } 
    else if (game.difficulty == 'hard' && !xIsNext){
      let movesP2 = JSON.parse(p2Moves)
      if(movesP2.length === 3){
        const firstMove2 = movesP2[0]
        newSquares[firstMove2] = null;
        movesP2.shift();
        movesP2.push(i)
        setP2Moves(JSON.stringify(movesP2))
      } else {
        movesP2.push(i)
        setP2Moves(JSON.stringify(movesP2))
      }
    }
    setSquares(newSquares);
    localStorage.setItem("board", JSON.stringify(newSquares));

    if ("multiplayer" === game.mode) {
      setXIsNext(!xIsNext);
    }
  }

  function setPlayersName(e){
    e.preventDefault();
    const player1 = document.querySelector('#player1').value;
    if(game.mode == 'multiplayer'){
      const player2 = document.querySelector('#player2').value;
      if(player2 != ''){
        setPlayer2(player2);
      } else {
        setPlayer2('P2');
      }
    } else {
      setPlayer2('CPU');
    }
    if(player1 != ''){
      setPlayer1(player1);
    } else if (game.mode == 'multiplayer') {
      setPlayer1("P1");
    }
  }

  function setNewRanking(){
    const rankingParse = JSON.parse(ranking);
    let newRanking = [];
    for(let i = 0; i < rankingParse.length; i++){
      if(parseInt(p1Victory) < rankingParse[i].score && parseInt(p1Victory) > rankingParse[i+1]){
        newRanking.push(rankingParse[i]);
        newRanking.push({username: player1, score: parseInt(p1Victory)});
      }
      else if (parseInt(p1Victory) == rankingParse[i].score && player1 != rankingParse[i].username) {
        newRanking.push(rankingParse[i]);
        newRanking.push({username: player1, score: parseInt(p1Victory)});
      } 
      else if (i == 0 && parseInt(p1Victory) > rankingParse[i].score){
        newRanking.push({username: player1, score: parseInt(p1Victory)});
        newRanking.push(rankingParse[i]);
      } 
      else if (i == rankingParse.length-1 && parseInt(p1Victory) < rankingParse[i].score) {
        newRanking.push(rankingParse[i]);
        newRanking.push({username: player1, score: parseInt(p1Victory)});
      }
      else {
        newRanking.push(rankingParse[i]);
      }
    }
    newRanking = JSON.stringify(newRanking)
    setRanking(newRanking)
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
      if(game.mode == 'bot'){
        if(p1Victory > 0){
          //setNewRanking()
        } 
        setTimeout(()=>{
          setNewRanking()
          setTies(0);
          setP1(0);
          setP2(0);
          setSquares(Array(9).fill(null));
        }, 5000);

      } else {
        nextP2 = parseInt(nextP2) + 1;
        player = <img src={circle} alt="" className='w-4 mr-2'/>;
        setTimeout(()=>{setSquares(Array(9).fill(null))}, 5000);
      }

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
          <div className='board'>
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
          <div className='board'>
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

