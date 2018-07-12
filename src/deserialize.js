const set = require('lodash.set')

const coerce = (value) => {
  if (!isNaN(value)) {
    return parseInt(value)
  }

  if (value === 'undefined') {
    return undefined
  }

  if (value === 'null') {
    return null
  }

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }
  
  return value
}

const fromString = string => {
  let [key, value] = string.split('=')
  let path = key.split('.')
  return [path, coerce(value)]
}

const walk = (acc, [path, value]) => {  
  return set(acc, path, value)
}

const deserialize = string => {
  return string.split(/\r?\n/g)
    .map(fromString)
    .reduce(walk, {})
}

module.exports = deserialize