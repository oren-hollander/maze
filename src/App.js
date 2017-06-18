import React, { Component } from 'react'
import './App.css'
import MazeView from './MazeView'
import Coord from './maze/Coord'
import Maze from './maze/Maze'
import randomMaze from './maze/randomMaze'
import Random from './maze/Random'
import recursiveDFS from './maze/recursiveDFS'
import spy from './spy/spy'
import callLog from './spy/callLog'
import Queue from './maze/Queue'
import Stack from './maze/Stack'
import Visited from './maze/Visited'

const maze = randomMaze(Random())(10, 10)
// const maze = [
  // [0, 0, 0],
  // [1, 1, 0], 
  // [0, 0, 0]
// ]

const log = callLog()

const lMaze = spy('Maze', Maze(maze), ['cell', 'width', 'height'], log)

const lib = {
  Queue: () => spy('Queue', Queue(), ['enqueue', 'dequeue'], log),
  Stack: () => spy('Stack', Stack(), ['push', 'pop'], log),
  Visited: () => spy('Visited', Visited(), ['add', 'has'], log)
}

recursiveDFS(lib, lMaze, Coord(0, 0), Coord(1, 2))
console.log('seq', log.calls())
class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{margin: '10px'}}>
          <MazeView maze={maze} start={Coord(0, 0)} end={Coord(1, 2)} sequence={log.calls()}/>
        </div>
      </div>
    )
  }
}

export default App
