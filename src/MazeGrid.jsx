import { useState } from 'react';
import './MazeGrid.css'
import { useEffect } from 'react';

function MazeGrid() {
  const [maze, setMaze] = useState([]);
  const width = 11;
  const height = 11;
  
  useEffect(() => {
    genMaze(width, height);
  }, [])

  const bfs = (start) => {
    const queue = [start];
    const visited = new Set(`${start[0]},${start[1]}`);

    const visit = ([x, y]) => {
      if (maze[y, x] == 'path') {
        console.log(`found path to end ${x},${y}`);
        return true;
      }
      return false;
    }

    const step = () => {
      if (queue.length === 0) {
        return;
      }

      const [x, y] = queue.shift();
      console.log('step');
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] == 'path' || maze[ny][nx] == 'end') {
            if(visit(nx, ny)) {
              return true;
            }
            queue.push([nx, ny]);
          }
        }
      }
    }

    step();
    return false;
  }

  const dfs = (start) => {
    const stack = [start];
    const visited = new Set(`${start[0]},${start[1]}`);

    const visit = ([x, y]) => {
      console.log(`visiting ${x},${y}`);

      if (maze[y, x] == 'path') {
        console.log(`found path to end ${x},${y}`);
        return true;
      }
      return false;
    }

    const step = () => {
      if (stack.length === 0) {
        return;
      }

      const [x, y] = stack.pop();
      console.log('step');
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] == 'path' || maze[ny][nx] == 'end') {
            if(visit(nx, ny)) {
              return true;
            }
            queue.push([nx, ny]);
          }
        }
      }
    }
    
    step();
    return false;
  }

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
      <button className='button' onClick={() => genMaze(width, height)}>Refresh Maze</button>
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
