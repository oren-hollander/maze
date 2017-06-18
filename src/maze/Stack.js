import { last, init } from 'lodash/fp'

const Stack = () => {
  let values = []

  const push = value => {
    values = [...values, value]
  }

  const pop = () => {
    const result = last(values)
    values = init(values)
    return result
  }

  return { push, pop }
}

export default Stack