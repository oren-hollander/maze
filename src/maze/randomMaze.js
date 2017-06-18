import { map, range, concat, shuffle, constant, chunk } from 'lodash/fp'

const randomMaze = rand => (x, y) => {
  const cellCount = x * y
  const wallCount = rand.int(cellCount)
  const freeCount = cellCount - wallCount

  const walls = map(constant(1), range(0, wallCount))
  const freeCells = map(constant(0), range(0, freeCount))
  const cells = shuffle(concat(walls, freeCells))
  const maze = chunk(x, cells)
  return maze
}

export default randomMaze