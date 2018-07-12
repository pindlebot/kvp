const { serialize, deserialize } = require('../')

let data = {
  pojo: {
    key: 'value'
  },
  array: [1,2,3],
  arrayOfObjects: [{
    key: {
      innerKey: 'value'
    }
  }],
  bool: true,
  undefined: undefined,
  null: null,
  number: 5,
  nested0: {
    nested1: {
      nested2: {
        nested3: {
          nested4: {
            nested5: 7
          }
        }
      }
    }
  }
}

let string = [
  'pojo.key=value',
  'array.0=1',
  'array.1=2',
  'array.2=3',
  'arrayOfObjects.0.key.innerKey=value',
  'bool=true',
  'undefined=undefined',
  'null=null',
  'number=5',
  'nested0.nested1.nested2.nested3.nested4.nested5=7',
].join('\n')

it ('should serialize objects', () => {
   expect(serialize(data)).toMatch(string)
})

it ('should serialize objects 2', () => {
  expect(serialize({
    key: 'U.S.A'
  })).toMatch(`key=U.S.A`)
})

it ('should deserialize 1', () => {
  expect(deserialize(['foo.bar.0=value', 'foo.bar.1=foo'].join('\n'))).toMatchObject({ foo: { bar: ['value', 'foo'] } })
})

it ('should deserialize 2', () => {
  expect(deserialize(string)).toMatchObject(data)
})

it ('should deserialize 3', () => {
  expect(deserialize('config.key=U.S.A')).toMatchObject({ config: { key: 'U.S.A' }})
})