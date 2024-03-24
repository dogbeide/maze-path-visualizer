import { useState } from 'react';
import './MazeGrid.css'
import { useEffect } from 'react';

function MazeGrid() {
  const [maze, setMaze] = useState([]);
  const mazeX = 11;
  const mazeY = 11;
  
  useEffect(() => {
    genMaze(mazeX, mazeY);
  }, [])

  const genMaze = (rows, cols) => {
    let matrix = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push('wall');
      }
      matrix.push(row);
    }

    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    const isCellValid = (x, y) => {
      // const isValid = x >= 0 && y >= 0 && x < cols && y < rows && matrix[y][x] == 'wall';
      // console.log(`${x},${y} = ${isValid}`);
      // return isValid;
      return x >= 0 && y >= 0 && x < cols && y < rows && matrix[y][x] == 'wall';
    }

    const carvePath = (x, y) => {
      matrix[y][x] = 'path';

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx*2;
        const ny = y + dy*2;

        if(isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = 'path';
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1);
    matrix[1][0] = 'start';
    matrix[rows-2][cols-1] = 'end';

    setMaze(matrix);
  }

  return (
    <div className='maze-container'>
      <button className='button' onClick={() => genMaze(mazeX, mazeY)}>Refresh Maze</button>
      <div className='maze'>
        {maze.map((row, rowIdx) => (
          <div key={rowIdx} className='row'>
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MazeGrid
