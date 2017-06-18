import { reduce, set, get } from 'lodash/fp'

const spy = (apiName, api, functionPaths, callLog) => {

  const spyOnFunction = (name, f) => (...args) => {
    const result = f(...args)
    callLog.log(name, result, args)
    return result
  }

  const replaceWithSpy = (api, path) => 
    set(path, spyOnFunction(`${apiName}.${path}`, get(path, api)), api)

  return reduce(replaceWithSpy, api, functionPaths)
}

export default spy