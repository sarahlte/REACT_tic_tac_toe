export default function winnerBoard(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === 'X') {
        squares[a] = 'VX';
        squares[b] = 'VX';
        squares[c] = 'VX';
      }
      else if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === 'O'){
        squares[a] = 'VO';
        squares[b] = 'VO';
        squares[c] = 'VO';
      }
    }
    return squares;
  }