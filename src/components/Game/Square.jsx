import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";

export default function Square({ value, onSquareClick }) {
  if (value == 'X'){
      return (
        <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
          <img src={cross} alt="X"/>
        </div>
      );
  } else if (value == 'O') {
    return (
      <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </div>
    );
  } 
  else if (value == 'VX'){
    return (
      <div className="square darkgrey-btn w-28 h-28  primary-filter" onClick={onSquareClick}>
        <img src={cross} alt="X" />
      </div>
    );
  }
  else if (value == 'VO'){
    return (
      <div className="square darkgrey-btn w-28 h-28 secondary-filter" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </div>
    );
  }
  else {
    return (
      <div className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        {value}
      </div>
    );
  }

}