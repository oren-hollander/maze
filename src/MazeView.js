import React, { Component } from 'react'
import { map, isEqual, head, tail } from 'lodash/fp'
import Cell from './Cell'
import { START, END, NORMAL } from './cellType'
import Coord from './maze/Coord'

const mapWithIndex = map.convert({cap: false})

const cellSize = 50
const gap = 7
const px = size => `${size}px`

export default class MazeView extends Component {

  constructor(props) {
    super(props)
    this.animateSolution = this.animateSolution.bind(this)
    this.state = {
      sequence: []
    }
  }

  animateSolution = () => {
    this.setState({
      sequence: this.props.sequence
    }, this.delayStep)   
  }

  delayStep() {
    if(this.state.sequence.length > 0){
      setTimeout(() => {
        this.step()
      }, 200)
    }
  }

  step() {
    this.setState(prevState => ({sequence: tail(prevState.sequence)}), this.delayStep)
  }

  render() {
    const {maze, start, end} = this.props

    const getCellType = coord => 
      isEqual(start, coord) 
        ? START 
        : isEqual(end, coord)
          ? END
          : NORMAL 
    
    const isCellMarked = coord => this.state.sequence.length > 0 && isEqual(coord, head(this.state.sequence)) 

    return (
      <div>
        <div style={{
          justifyContent: 'center',
          display: 'grid', 
          gridGap: `${px(gap)} ${px(gap)}`,
          gridTemplateColumns: px(cellSize), 
          gridTemplateRows: px(cellSize),
          gridAutoColumns: px(cellSize),            
          gridAutoRows: px(cellSize)
        }}>
        {
          mapWithIndex(
            (row, rowIndex) => mapWithIndex(
              (value, colIndex) => {
                const coord = Coord(colIndex, rowIndex)
                return <Cell coord={coord} wall={value === 1} type={getCellType(coord)} marked={(isCellMarked(coord))}/>
              }, 
              row
            ),
            maze
          )
        }
        </div>
        <div>
          {JSON.stringify(this.state.sequence)}
        </div>
        <div>
          <button disabled={this.state.sequence.length > 0} onClick={this.animateSolution}>Animate Solution</button>
        </div>
      </div>
    )
  }
}