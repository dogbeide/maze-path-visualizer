import './MazeGrid.css'

const WALL = 'wall';
const PATH = 'path';
const START = 'start';
const END = 'end';

function MazeGrid() {
  let maze = [
    [WALL, WALL, START, PATH, WALL, WALL, WALL],
    [WALL, WALL, WALL, PATH, PATH, PATH, WALL],
    [WALL, WALL, PATH, PATH, WALL, PATH, WALL],
    [WALL, WALL, WALL, WALL, WALL, END, WALL],
  ];

  return (
    <div>
      {maze.map((row, rowIdx) => (
        <div key={rowIdx} className='row'>
          {row.map((cell, cellIdx) => (
            <div key={cellIdx} className={`cell ${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MazeGrid
