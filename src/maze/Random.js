import { flow, head, tail } from 'lodash/fp'

const Random = () => {
  
  const float = n => Math.random() * n
  
  const int = n => flow(
    float,
    Math.floor
  )(n)

  return { float, int }
}

export const TestRandom = values => {
  let sequence = values

  const next = () => {
    const value = head(sequence)
    sequence = tail(sequence)
    return value
  }

  return { float: next, int: next }  

}

export default Random


