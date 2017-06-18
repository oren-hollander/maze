import React from 'react'
import { START, END } from './cellType'

const gridCell = index => `${index + 1} / span 1`

const getBorder = (type, marked) => { 
  const lineStyle = marked ? 'dotted' : 'solid'

  return type === START 
    ? `8px ${lineStyle} blue`
    : type === END
      ? `8px ${lineStyle} green`
      : marked 
        ? `8px dotted red`
        : undefined
}

const Cell = ({ coord, wall, type, marked }) => {

  const style = {
    backgroundColor: wall ? 'grey' : 'lightGrey',
    border: getBorder(type, marked), 
    gridColumn: gridCell(coord.x), 
    gridRow: gridCell(coord.y)
  }

  return <div style={style}/>
}

export default Cell