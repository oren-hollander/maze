import randomMaze, { shuffleCol } from './randomMaze'
import { TestRandom } from './Random'
import { identity } from 'lodash/fp'

jest.unmock('lodash')
const lodash = require.requireActual('lodash/fp')
lodash.shuffle = identity

expect.extend({
  toBeCellValue: received => 
    received === 0 || received === 1 
      ? 
        {
          message: () => (`expected ${received} not to be divisible by ${argument}`),
          pass: true
        }
      : 
        {
          message: () => (`expected ${received} to be divisible by ${argument}`),
          pass: false
        }
})

test('random maze', () => {
  const maze = randomMaze(TestRandom([2]))(2, 2)
  expect(maze[0].length).toBe(2)
  expect(maze[1].length).toBe(2)
  expect(maze[0][0]).toBeCellValue()
  expect(maze[0][1]).toBeCellValue()
  expect(maze[1][0]).toBeCellValue()
  expect(maze[1][1]).toBeCellValue()
})