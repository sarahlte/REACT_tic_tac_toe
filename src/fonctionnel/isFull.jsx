export default function isFull(squares){
    for(let i = 0; i < squares.length; i++){
      if(squares[i] === null){
        return false;
      }
    }
    return true;
  }
  