import { useState } from 'react';
import './MazeGrid.css'
import { useEffect } from 'react';

function MazeGrid() {
  const [maze, setMaze] = useState([]);
  
  useEffect(() => {
    genMaze(7, 7);
  }, [])

  const genMaze = (rows, cols) => {
    let newMaze = [];

    for (let i = 0; i < rows; i++) {
      let row = [];

      for (let j = 0; j < cols; j++) {
        let cell = Math.floor(Math.random()*2);
        switch(cell) {
          case 0:
            row.push('wall');
            break;
          case 1:
            row.push('path');
            break;
          default:
            break;
        }
      }
      newMaze.push(row);
    }

    newMaze[1][0] = 'start';
    newMaze[rows-2][cols-1] = 'end';
    setMaze(newMaze);
  }

  return (
    <div className='maze-container'>
      <button className='button' onClick={() => genMaze(7, 7)}>Refresh Maze</button>
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
