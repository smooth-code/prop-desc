import PropTypes from 'prop-types'

function typeToString(prop) {
  const meta = prop.__meta
  if (!meta) return 'unknown'
  const propName = meta.type.name
  if (propName === 'arrayOf') {
    return `[${typeToString(meta.type.value)}]`
  }
  if (propName === 'objectOf') {
    return `{${typeToString(meta.type.value)}}`
  }
  if (propName === 'shape' || propName === 'exact') {
    return `{ ${Object.entries(meta.type.value)
      .map(([name, type]) => `${name}: ${typeToString(type)}`)
      .join(' , ')} }`
  }
  if (propName === 'union') {
    return `${meta.type.value.map(type => typeToString(type)).join(' | ')}`
  }
  if (propName === 'enum') {
    return `${meta.type.value.map(type => type.value).join(' | ')}`
  }
  return propName
}

const createType = typeDesc => {
  const checkPropType = (...args) => typeDesc.propType(...args)
  checkPropType.__meta = {
    ...typeDesc,
    toString() {
      return typeToString(checkPropType)
    },
  }
  Object.defineProperties(checkPropType, {
    isRequired: {
      get() {
        return createType({
          ...typeDesc,
          propType: typeDesc.propType.isRequired,
          required: true,
        })
      },
    },
    defaultTo: {
      get() {
        return value =>
          createType({ ...typeDesc, defaultValue: { value: String(value) } })
      },
    },
    desc: {
      get() {
        return description => createType({ ...typeDesc, description })
      },
    },
  })
  return checkPropType
}

const type = (propType, name, { value = null } = {}) => {
  return createType({
    propType,
    type: {
      name,
      value,
    },
    required: false,
    defaultValue: undefined,
  })
}

export const getMetadata = descriptors =>
  Object.keys(descriptors).reduce(
    (props, key) => ({
      ...props,
      [key]: descriptors[key].__meta,
    }),
    {},
  )

export const array = type(PropTypes.array, 'array')
export const bool = type(PropTypes.bool, 'boolean')
export const func = type(PropTypes.func, 'function')
export const number = type(PropTypes.number, 'number')
export const object = type(PropTypes.object, 'object')
export const string = type(PropTypes.string, 'string')
export const symbol = type(PropTypes.symbol, 'symbol')
export const any = type(PropTypes.any, 'any')
export const arrayOf = value =>
  type(PropTypes.arrayOf(value), 'arrayOf', { value })
export const element = type(PropTypes.element, 'element')
export const elementType = type(PropTypes.elementType, 'elementType')
export const instanceOf = value =>
  type(PropTypes.instanceOf(value), 'instanceOf', { value })
export const node = type(PropTypes.node, 'node')
export const objectOf = value =>
  type(PropTypes.objectOf(value), 'objectOf', { value })
export const oneOf = values =>
  type(PropTypes.oneOf(values), 'enum', {
    value: values.map(value => ({ value })),
  })
export const oneOfType = types =>
  type(PropTypes.oneOfType(types), 'union', { value: types })
export const shape = shape =>
  type(PropTypes.shape(shape), 'shape', {
    value: shape,
  })
export const exact = shape =>
  type(PropTypes.exact(shape), 'exact', {
    value: shape,
  })

const PropDesc = {
  array,
  bool,
  func,
  number,
  object,
  string,
  symbol,
  any,
  arrayOf,
  element,
  elementType,
  instanceOf,
  node,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  exact,
  getMetadata,
  checkPropTypes: PropTypes.checkPropTypes,
  resetWarningCache: PropTypes.resetWarningCache,
}

PropDesc.PropTypes = PropDesc

export default PropDesc
