# ioc [![NPM Module](https://img.shields.io/npm/v/ioc.svg)](https://www.npmjs.com/package/ioc)

IoC library for React, with support for NextJS

[![Build](https://img.shields.io/travis/alexindigo/ioc/master.svg)](https://travis-ci.org/alexindigo/ioc)

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
        <SharedComponent1 some={} props={}>
         <a>Link Text</a>
        </SharedComponent1>
      </div>
    );
  }
}
```

### Next.js

[Next.js](https://npmjs.org/next) example could be found in [their examples repository](https://github.com/zeit/next.js/tree/canary/examples/with-ioc).

## Testing

Individual component testing is pretty simple, just provide your dependencies as `props`
and add `.dive()` step to your shallow render, as with any High Order Component.

```js
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Component from './components/Component';

describe('With Enzyme', () => {
  it('Component renders with props', () => {
    // no need to SharedComponent1 Link component much for shallow rendering
    const injected = shallow(<Component SharedComponent1={() => {}} />);
    const component = injected.dive();
    expect(component.find('h1').text()).toEqual('My Component');
    expect(component.find('SharedComponent1').find('a').text()).toEqual('Link Text');
  });
});

describe('With Snapshot Testing', () => {
  it('Component renders with props', () => {
    const component = renderer.create(<Component SharedComponent1={(props) => <div comment="mocked SharedComponent1 component">{props.children}</div>} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

For more details check out [tests](__tests__).

## License

IoC is released under the [MIT](License) license.
