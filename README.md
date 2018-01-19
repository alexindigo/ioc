# ioc

IoC library for React, with support for NextJS

*Notice of change of ownership: Starting version 1.0.0 this package has changed it's owner and goals. Previous version (0.1.0) is still available on npm via `npm install ioc@0.1.0`. Thank you.*

## Install

_* Expects to be installed alongside React_

yarn:
```sh
$ yarn add ioc
```

npm:
```sh
$ npm install --save ioc
```

## Usage

Add provider at the top of your React app:

App.js
```js
import React from 'react';
import { provide, types } from 'ioc';
import SharedComponent1 from './components/SharedComponent1';
import SharedLibrary from './lib/SharedLibrary';

@provide({
  @types.func.isRequired
  SharedComponent1,

  @types.object
  SharedLibrary
})
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...state };
  }

  render() {
    return (
      // the app
    );
  }
}
```

Add consumer at the individual components:

node_modules/@my-components/SomeGenericComponent.js
```js
import React from 'react';
import { inject, PropTypes } from 'ioc';

@inject({
  SharedComponent1: PropTypes.func.isRequired
})
export default class extends React.Component {
  render() {
    const { SharedComponent1 } = this.props;

    return (
      <div>
        Showing stuff:
        <SharedComponent1 some={} props={} />
      </div>
    );
  }
}
```
