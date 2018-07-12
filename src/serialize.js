const isCircular = require('is-circular')

const FLAT_TYPES = [
  'string', 'number', 'boolean', 'undefined', 'symbol'
]

const walk = obj => Object.keys(obj)
  .reduce((acc, key) => {
    let value = obj[key]
    if (
      FLAT_TYPES.includes(typeof value) ||
      value === null
    ) {
      acc.push(`${key}=${typeof value === 'symbol' ? value.toString() : value}`)
    } else if (typeof value === 'object') {
      walk(value).forEach(v => {
        acc.push(`${key}.${v}`)
      })
    }

    return acc
  }, [])

const serialize = obj => {
  if (isCircular(obj)) {
    throw new Error('Cannot serialize circular object.')
  }
  return walk(obj).join('\n')
}

module.exports = serialize