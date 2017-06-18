const Visited = () => {
  const values = new Set()

  const has = value => values.has(value)
  const add = value => values.add(value)

  return { has, add }
}

export default Visited