# react-list-keys 🔑

!["Build Status"](https://travis-ci.org/chrants/react-list-keys.svg?branch=master "Build status")

🗝 Predictable, Natural Solution for unique React list keys 🔑

This project was promoted in 
*[Why you should love React list keys, and how to crush them](https://medium.com/@tschoepe.christian/why-you-should-love-react-list-keys-and-how-to-crush-them-b61fe90ca3ed)*,
a companion article on Medium.

For certain cases where there is no natural key for an item in a list it
can be frustrating to create an artificial key for it.
For example, if something hasn't been saved to the server yet and so has
no ID, a unique artificial key for each item would have to be created to
appease React's list rendering.
`react-list-keys` solves this problem by doing key generation for you.

> **Note**: If your object already has some sort of unique value that could be used
> as a key for React, it is prefered to use that one. This library's intention is
> to supplement items without natural keys.

```bash
npm install react-list-keys
```

```jsx
import React from 'react';
import ReactKeyGen from 'react-list-keys';

class MyComponent extends React.Component {
  state = {
    items: [],
    keyGen: new ReactKeyGen(),
  }

  componentWillMount() {
    this.addItem({ title: 'apple' });
    this.addItem({ title: 'banana' });
  }

  addItem = (item) => {
    this.setState(state => ({
      items: [
        ...state.items,
        state.keyGen.keyed(item), // item with a `_key`
      ]
    }));
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li key={item._key}>{item.title}</li> // use the `_key` as a key
        ))}
      </ul>
    );
  }
}
```

## How it works

`react-list-keys` adds a `_key` property to your objects that can be used
directly as a key in React lists.

*Example:*

```javascript
const keyGen = new ReactKeyGen();
const a = keyGen.keyed({ apples: 1, oranges: 'are great', bananas: null });
a._key // 1
```

The `_key` property added to the object is *unenumerable*. This means that
submitting this object via fetch, destructuring the object, etc will not show
the `_key` prop, yet it is there.

```javascript
const b = { ...a }; // or Object.assign({}, a);
b._key // undefined
```

While this might seem like a weakness, it's actually very important so that it
does not change the structure of your data upon submission or other things.

If you would like to do this object shallow copying, you can do it simply with
the provided utility function. In the example above, this would be:

```javascript
const c = keyGen.copy(a);
c._key // 1
c === a // false
```

## API

`react-list-keys` exports both an `export default class ReactKeyGen` for multiple key generation
instances for different types of data and a single instance `export keyGen` for zero-configuration
key generation.

```jsx
// ReactKeyGen can be used to have several key generators for different types of data.
import ReactKeyGen from 'react-list-keys';

// For example on a component-by-component basis or say for a type of data in redux or mobx.
class ListComponent extends React.Component {
  state = {
    items: [],
    myKeyGen: new ReactKeyGen(),
  }

  addItem = (item) => {
    this.setState(state => ({
      items: [
        ...state.items,
        state.keyGen.keyed(item), // item with a `_key`
      ]
    }));
  }

  // ...
}
```

```jsx
// Or you can use the exported keyGen, which is simply an instance of ReactKeyGen for
// zero-configuration key generation.
import { keyGen } from 'react-list-keys';

class ListComponent2 extends React.Component {
  state = {
    items: [],
  }

  addItem = (item) => {
    this.setState(state => ({
      items: [
        ...state.items,
        keyGen.keyed(item), // item with a `_key`
      ]
    }));
  }

  // ...
}

```

## Contributing

Submit an issue for any ideas, problems, or suggestions. Pull requests are very welcome
in the spirit of open source!
