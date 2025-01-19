import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";

export default function Square({ value, onSquareClick, id }) {
  if (value == 'X'){
      return (
        <div id={'a'+id} className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
          <img src={cross} alt="X"/>
        </div>
      );
  } else if (value == 'O') {
    return (
      <div id={'a'+id} className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </div>
    );
  } 
  else if (value == 'VX'){
    return (
      <div id={'a'+id} className="square darkgrey-btn w-28 h-28  primary-filter" onClick={onSquareClick}>
        <img src={cross} alt="X" />
      </div>
    );
  }
  else if (value == 'VO'){
    return (
      <div id={'a'+id} className="square darkgrey-btn w-28 h-28 secondary-filter" onClick={onSquareClick}>
        <img src={circle} alt="O" />
      </div>
    );
  }
  else {
    return (
      <div id={'a'+id} className="square darkgrey-btn w-28 h-28" onClick={onSquareClick}>
        {value}
      </div>
    );
  }

}