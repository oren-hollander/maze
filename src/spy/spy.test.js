import spy from './spy'
import callLog from './callLog'

test('spy', () => {
  const log = callLog()
  
  const apiA = {
    x: () => {},
    y: () => {}    
  }
  
  const apiB = {
    x: () => {},
    y: () => {}    
  }

  const spyA = spy('a', apiA, ['x', 'y'], log)
  const spyB = spy('b', apiB, ['x', 'y'], log)

  spyA.x()
  spyB.x()
  spyA.y()
  spyB.y()

  expect(log.calls()).toEqual([
    expect.objectContaining({source: 'a.x'}), 
    expect.objectContaining({source: 'b.x'}), 
    expect.objectContaining({source: 'a.y'}), 
    expect.objectContaining({source: 'b.y'})
  ])
})