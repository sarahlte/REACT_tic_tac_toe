import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Square from "./Square";
import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";

export default function Board({player, player1, player2, p1Victory, p2Victory, ties, squares, handleClick,status, onClickReset}) {

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
              <button className='lightgrey-btn h-min' onClick={onClickReset}>
                  <FontAwesomeIcon icon={faRotateRight} />
              </button>
              </div>
          </div>
          <div className='board'>
          <div className="board-row">
            <Square id={0} value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square id={1} value={squares[1]} onSquareClick={() => handleClick(1)} />        
            <Square id={2} value={squares[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square id={3} value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square id={4} value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square id={5} value={squares[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square id={6} value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square id={7} value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square id={8} value={squares[8]} onSquareClick={() => handleClick(8)}/>
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
    )
}