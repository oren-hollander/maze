const callLog = () => {
  
  let calls = []
  
  const log = (source, result, args) => {
    calls = [...calls, {ts: Date.now(), source, result, args}]
  }

  return { log, calls: () => calls }
}

export default callLog