import { head, tail } from 'lodash/fp'

const Queue = () => {
  let values = []

  const enqueue = value => {
    values = [...values, value]
  }

  const dequeue = () => {
    const result = head(values)
    values = tail(values)
    return result
  }

  return { enqueue, dequeue }
}

export default Queue