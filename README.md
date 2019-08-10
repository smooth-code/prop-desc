# prop-desc

[![License](https://img.shields.io/npm/l/prop-desc.svg)](https://github.com/smooth-code/prop-desc/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/prop-desc/latest.svg)](https://www.npmjs.com/package/prop-desc)
[![Build Status](https://img.shields.io/travis/smooth-code/prop-desc.svg)](https://travis-ci.org/smooth-code/prop-desc)
[![DevDependencies](https://img.shields.io/david/dev/smooth-code/prop-desc.svg)](https://david-dm.org/smooth-code/prop-desc?type=dev)

React prop-types with metadata inside ✨

It is a drop-in replacement for prop-types that includes metadata to generate documentation from prop-types consistently.

```sh
npm install prop-desc prop-types
```

## Example

```js
import React from 'react'
import PropTypes from 'prop-desc'

function MyComponent() {
  // ... do things with the props
}

MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
}

console.log(PropTypes.getMetadata(MyComponent.propTypes))
```

## Why?

Generating documentation from prop types is useful but not easy. A project call [react-docgen](https://github.com/reactjs/react-docgen) try to introspect code to extract type but it remains static and does not work with complex prop types (in other files). prop-desc solves this and permits to generate consistent documentation from your prop-types.

# License

MIT
