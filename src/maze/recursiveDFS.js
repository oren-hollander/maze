import { flow, isEqual } from 'lodash/fp'

const inBounds = (maze, x, y) => x >= 0 && x < maze.width() && y >= 0 && y < maze.height()

const addNeighbour = (maze, {x, y}) => neighbours => inBounds(maze, x, y) ? [...neighbours, {x, y}] : neighbours

const north = ({x, y}) => ({x, y: y - 1})
const south = ({x, y}) => ({x, y: y + 1})
const east = ({x, y}) => ({x: x + 1, y})
const west = ({x, y}) => ({x: x - 1, y})

const getNeighbours = (maze, cell) => flow(
  addNeighbour(maze, north(cell)),
  addNeighbour(maze, east(cell)),
  addNeighbour(maze, south(cell)),
  addNeighbour(maze, west(cell))
)([])
  
const isSolvable = (lib, maze, start, end) => {
  if(maze.cell(start.x, start.y) === 1 || maze.cell(end.x, end.y) === 1)
    return false

  return solve(maze, start, end, lib.Visited())
}

const hashCoord = ({x, y}) => `(${x},${y})`

const solve = (maze, start, end, visited) => {
  if(visited.has(hashCoord(start))){
    return false
  }

  if(maze.cell(start.x, start.y) === 1){
    return false
  }

  if(isEqual(start, end)){
    return true
  }
  
  const neighbours = getNeighbours(maze, start)
  for(let i = 0; i < neighbours.length; i++){
    visited.add(hashCoord(start))
    if(solve(maze, neighbours[i], end, visited))
      return true
  }

  return false
}

export default isSolvable