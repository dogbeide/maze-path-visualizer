import { useState } from 'react';
import './MazeGrid.css'
import { useEffect } from 'react';

function MazeGrid() {
  const [maze, setMaze] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [complete, setComplete] = useState(false);

  const width = 21;
  const height = 21;
  const delay = 100;
  
  useEffect(() => {
    genMaze(width, height);
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

  const updateMaze = (y, x) => {
    setMaze((prevMaze) => {
      return prevMaze.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          return rowIdx == y && cellIdx == x ? 'visited' : cell;
        })
      )
    });
  }

  const bfs = (start) => {
    const queue = [start];
    const visited = new Set(`${start[0]},${start[1]}`);

    const visit = ([x, y]) => {
      if (maze[y][x] == 'end') {
        console.log(`found path to end ${x},${y}`);
        return true;
      }

      updateMaze(y, x);
      return false;
    }

    const step = () => {
      if (queue.length === 0) {
        return false;
      }

      const [x, y] = queue.shift();
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] == 'path' || maze[ny][nx] == 'end') {
            console.log(`is path or end (${nx},${ny})`);
            
            if(visit([nx, ny])) {
              setComplete(true);
              return true;
            }
            queue.push([nx, ny]);
          }
        }
      }

      const timeoutId = setTimeout(step, delay);
      setTimeoutIds(prevTimeoutIds => [...prevTimeoutIds, timeoutId]);
    }

    return step();
  }

  const dfs = (start) => {
    const stack = [start];
    const visited = new Set(`${start[0]},${start[1]}`);

    const visit = ([x, y]) => {
      if (maze[y][x] == 'end') {
        console.log(`found path to end ${x},${y}`);
        return true;
      }

      updateMaze(y, x);
      return false;
    }

    const step = () => {
      if (stack.length === 0) {
        return false;
      }

      const [x, y] = stack.pop();
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] == 'path' || maze[ny][nx] == 'end') {
            console.log(`is path or end (${nx},${ny})`);

            if(visit([nx, ny])) {
              setComplete(true);
              return true;
            }
            stack.push([nx, ny]);
          }
          
        }
      }

      const timeoutId = setTimeout(step, delay);
      setTimeoutIds(prevTimeoutIds => [...prevTimeoutIds, timeoutId]);
    }

    return step();
  }

  const refreshMaze = () => {
    timeoutIds.forEach(clearTimeout); // timeoutId => clearTimeout(timeoutIdW)
    setTimeoutIds([]);
    setComplete(false);
    genMaze(width, height);
  }

  return (
    <div className='maze-container'>
      <div className='buttons-container'>
        <button className='button' onClick={() => refreshMaze()}>Refresh Maze</button>
        <button className='button' onClick={() => bfs([0, 1])}>Run BFS</button>
        <button className='button' onClick={() => dfs([0, 1])}>Run DFS</button>
      </div>
      <div className='maze'>
        {maze.map((row, rowIdx) => (
          <div key={rowIdx} className='row'>
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className={`cell ${cell == 'visited' && complete ? 'visited-complete' : cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MazeGrid
