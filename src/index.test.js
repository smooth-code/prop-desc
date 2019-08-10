import PropDesc from '.'

describe('PropDesc', () => {
  describe.each([
    [
      'array',
      {
        propType: PropDesc.array,
        type: 'array',
        valid: [{ value: ['a'] }],
        invalid: [true],
        metadata: 'array',
      },
    ],
    [
      'bool',
      {
        propType: PropDesc.bool,
        type: 'boolean',
        valid: [true],
        invalid: ['foo'],
        metadata: 'boolean',
      },
    ],
    [
      'func',
      {
        propType: PropDesc.func,
        type: 'function',
        valid: [() => {}],
        invalid: ['foo'],
        metadata: 'function',
      },
    ],
    [
      'number',
      {
        propType: PropDesc.number,
        type: 'number',
        valid: [1],
        invalid: ['foo'],
        metadata: 'number',
      },
    ],
    [
      'object',
      {
        propType: PropDesc.object,
        type: 'object',
        valid: [{}],
        invalid: ['foo'],
        metadata: 'object',
      },
    ],
    [
      'string',
      {
        propType: PropDesc.string,
        type: 'string',
        valid: ['foo'],
        invalid: [0],
        metadata: 'string',
      },
    ],
    [
      'symbol',
      {
        propType: PropDesc.symbol,
        type: 'symbol',
        valid: [Symbol()],
        invalid: [0],
        metadata: 'symbol',
      },
    ],
    [
      'any',
      {
        propType: PropDesc.any,
        type: 'any',
        valid: [1],
        invalid: [],
        metadata: 'any',
      },
    ],
    [
      'arrayOf',
      {
        propType: PropDesc.arrayOf(PropDesc.string),
        type: 'node',
        valid: [{ value: ['string'] }],
        invalid: [{ value: [200] }],
        metadata: '[string]',
      },
    ],
    [
      'element',
      {
        propType: PropDesc.element,
        type: 'element',
        valid: [null],
        invalid: [false],
        metadata: 'element',
      },
    ],
    [
      'elementType',
      {
        propType: PropDesc.elementType,
        type: 'elementType',
        valid: [() => {}],
        invalid: [false],
        metadata: 'elementType',
      },
    ],
    [
      'instanceOf',
      {
        propType: PropDesc.instanceOf(Array),
        type: 'instanceOf',
        valid: [{ value: [] }],
        invalid: ['nop'],
        metadata: 'instanceOf',
      },
    ],
    [
      'objectOf',
      {
        propType: PropDesc.objectOf(PropDesc.string),
        type: 'objectOf',
        valid: [{ x: 'a' }],
        invalid: [{ x: 2 }],
        metadata: '{string}',
      },
    ],
    [
      'node',
      {
        propType: PropDesc.node,
        type: 'node',
        valid: [null],
        invalid: [{}],
        metadata: 'node',
      },
    ],
    [
      'oneOf',
      {
        propType: PropDesc.oneOf(['foo', 'bar']),
        type: 'enum',
        valid: ['foo'],
        invalid: ['x'],
        metadata: 'foo | bar',
      },
    ],
    [
      'oneOfType',
      {
        propType: PropDesc.oneOfType([PropDesc.string, PropDesc.bool]),
        type: 'oneOfType',
        valid: ['foo'],
        invalid: [10],
        metadata: 'string | boolean',
      },
    ],
    [
      'shape',
      {
        propType: PropDesc.shape({ foo: PropDesc.string }),
        type: 'shape',
        valid: [{ foo: 'bar' }],
        invalid: [{ foo: 10 }],
        metadata: '{ foo: string }',
      },
    ],
    [
      'exact',
      {
        propType: PropDesc.exact({ foo: PropDesc.string }),
        type: 'exact',
        valid: [{ foo: 'bar' }],
        invalid: [{ foo: 'bar', x: '10' }],
        metadata: '{ foo: string }',
      },
    ],
  ])('#%s', (name, config) => {
    it.each(config.valid)(`should not log error with "%o"`, value => {
      const propTypes = { prop: config.propType }
      console.error = jest.fn()
      PropDesc.checkPropTypes(
        propTypes,
        { prop: value && value.value ? value.value : value },
        'prop',
        'MyComponent',
      )
      expect(console.error).not.toBeCalled()
    })

    if (config.invalid.length) {
      it.each(config.invalid)(`should log error with "%o"`, value => {
        const propTypes = { prop: config.propType }
        console.error = jest.fn()
        PropDesc.checkPropTypes(
          propTypes,
          { prop: value && value.value ? value.value : value },
          'prop',
          'MyComponent',
        )
        expect(console.error).toBeCalled()
      })
    }

    it('should generate metadata', () => {
      expect(config.propType.__meta.toString()).toBe(config.metadata)
    })
  })
})
