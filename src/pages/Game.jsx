import { useState } from 'react';
import { useEffect } from 'react';
import Board from '../components/Game/Board';
import Form from '../components/Game/Form';
import newRanking from '../fonctionnel/newRanking';
import calculateWinner from '../fonctionnel/calculateWinner';
import winnerBoard from '../fonctionnel/winnerBoard'
import isFull from '../fonctionnel/isFull';
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg"

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(localStorage.getItem('board')? JSON.parse(localStorage.getItem('board')) : Array(9).fill(null));
  const [ties, setTies] = useState(localStorage.getItem('ties') ? localStorage.getItem('ties') : 0);
  const [p1Victory, setP1] = useState(localStorage.getItem('victory1') ? localStorage.getItem('victory1') : 0);
  const [p1Moves, setP1Moves] = useState(localStorage.getItem('p1moves') ? localStorage.getItem('p1moves') : JSON.stringify([]));
  const [p2Victory, setP2] = useState(localStorage.getItem('victory2') ? localStorage.getItem('victory2') : 0);
  const [p2Moves, setP2Moves] = useState(localStorage.getItem('p2moves') ? localStorage.getItem('p2moves') : JSON.stringify([]));
  const [player1, setPlayer1] = useState(localStorage.getItem('player1') ? localStorage.getItem('player1') : null)
  const [player2, setPlayer2] = useState(localStorage.getItem('player2') ? localStorage.getItem('player2') : null)
  
  const game = localStorage.getItem('mode') && localStorage.getItem('difficulty') ? {mode: localStorage.getItem('mode'), difficulty: localStorage.getItem('difficulty')} : {mode: null, difficulty: null};

  useEffect(()=> {
    player1 != null ? localStorage.setItem('player1', player1) : null;
    player2 != null ? localStorage.setItem('player2', player2) : null;
    p1Victory != null ? localStorage.setItem('victory1', p1Victory): null;
    p1Moves != null ? localStorage.setItem('p1moves', p1Moves): null;
    p2Victory != null ? localStorage.setItem('victory2', p2Victory): null;
    p2Moves != null ? localStorage.setItem('p2moves', p2Moves): null;
    ties != null ? localStorage.setItem('ties', ties): null;
  }, [player1, player2, p1Victory, p1Moves, p2Victory, p2Moves,ties])


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

    const isWinner = calculateWinner(newSquares);

    if (xIsNext) {
      if (game.mode == "bot" && newSquares.filter((square)=> square == null).length > 1 && !isWinner) {
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
            document.querySelector(`#a${movesP2[0]}`).classList.remove('last-round')
            movesP2.shift();
            movesP2.push(n)
            setP2Moves(JSON.stringify(movesP2))
            const lastRound = document.querySelector(`#a${movesP2[0]}`);
            lastRound.classList.add('last-round');
          } else {
            movesP2.push(n)
            setP2Moves(JSON.stringify(movesP2))
            if(movesP2.length === 3){
              const lastRound = document.querySelector(`#a${movesP2[0]}`);
              lastRound.classList.add('last-round');
            }
          }
        }
      }
      if (game.difficulty == 'hard'){
        let movesP1 = JSON.parse(p1Moves)
        if(movesP1.length === 3){
          const firstMove1 = movesP1[0]
          newSquares[firstMove1] = null;
          document.querySelector(`#a${firstMove1}`).classList.remove('last-round');
          movesP1.shift();
          movesP1.push(i);
          setP1Moves(JSON.stringify(movesP1));
          const lastRound = document.querySelector(`#a${movesP1[0]}`);
          lastRound.classList.add('last-round');
        } else {
          movesP1.push(i);
          setP1Moves(JSON.stringify(movesP1));
          if(movesP1.length === 3){
            const lastRound = document.querySelector(`#a${movesP1[0]}`);
            lastRound.classList.add('last-round');
          }
        }
      }
    } 
    else if (game.difficulty == 'hard' && !xIsNext){
      let movesP2 = JSON.parse(p2Moves)
      if(movesP2.length === 3){
        const firstMove2 = movesP2[0]
        newSquares[firstMove2] = null;
        document.querySelector(`#a${firstMove2}`).classList.remove('last-round');
        movesP2.shift();
        movesP2.push(i)
        setP2Moves(JSON.stringify(movesP2))
        const lastRound = document.querySelector(`#a${movesP2[0]}`);
        lastRound.classList.add('last-round');
      } else {
        movesP2.push(i)
        setP2Moves(JSON.stringify(movesP2))
        if(movesP2.length === 3){
          const lastRound = document.querySelector(`#a${movesP2[0]}`);
          lastRound.classList.add('last-round');
        }
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


  const winner = calculateWinner(squares);
  const tie = isFull(squares);
  let status;
  let player;
  let nextP1 = p1Victory;
  let nextP2 = p2Victory;
  let nextTies = ties;
  if (winner) {
    status = 'WINNER';
    if (winner == 'VX' || winner == 'X') {
      nextP1 = parseInt(nextP1) + 1;
      player = <img src={cross} alt="" className='w-4 mr-2' />;
    } 
    else {
      player = <img src={circle} alt="" className='w-4 mr-2'/>;
      if(game.mode == 'bot'){
        if(p1Victory > 0){
          newRanking(player1, p1Victory)
          setP1(0);
          console.log(p1Victory);
        } 
        nextP1 = 0
        nextP2 = 0
        nextTies = 0
      } else {
        nextP2 = parseInt(nextP2) + 1;
        setTimeout(()=>{console.log('test'); setSquares(Array(9).fill(null))}, 5000);
      }
    }
    winnerBoard(squares);
  } else if (tie){
    nextTies = parseInt(nextTies) + 1;
    status = 'TIE';
    player = '';
  } else {
    status = 'TURN '
    player = xIsNext ? <img src={cross} alt="" className='w-4 mr-2' /> : <img src={circle} alt="" className='w-4 mr-2'/>
  }
  if(winner || tie){
    console.log(document.querySelectorAll('.square'))
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square) => {square.classList.remove('last-round');})
    setTimeout(()=> {
      setP1(nextP1);
      setP2(nextP2);
      setTies(nextTies);
      if(game.difficulty == 'hard'){
        setP1Moves(JSON.stringify([]))
        setP2Moves(JSON.stringify([]))
      }
      setSquares(Array(9).fill(null))
    }, 2000)
  }

  if(game.mode == 'multiplayer'){
    if(player1 && player2){
      return (
        <>
          <Board player={player} player1={player1} player2={player2} p1Victory={p1Victory} p2Victory={p2Victory} ties={ties} squares={squares} handleClick={handleClick} status={status} onClickReset={reset}></Board>
        </>
      );
    }
    else {
      return (
        <>
          <Form mode={game.mode} setPlayersName={setPlayersName}></Form>
        </>
      );
    }
  } 
  else if (game.mode == 'bot') {
    if(player1){
      return (
        <>
          <Board player={player} player1={player1} player2={player2} p1Victory={p1Victory} p2Victory={p2Victory} ties={ties} squares={squares} handleClick={handleClick} status={status} onClickReset={reset}></Board>
        </>
      );
    } else {
      return (
        <>
          <Form mode={game.mode} setPlayersName={setPlayersName}></Form>
        </>
      );
    }
  }
}
