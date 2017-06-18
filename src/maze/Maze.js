
const Maze = maze => {
  
  const cell = (col, row) => maze[row][col]
  const height = () => maze.length
  const width = () => maze[0].length

  return { cell, width, height }
}

export default Maze