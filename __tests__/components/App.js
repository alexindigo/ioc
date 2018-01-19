import React from 'react';
import { provide, types } from '../..';
import Tracking from './Tracking';

import Component1 from './Component1';

@provide({
  @types.func.isRequired
  Tracking
})
export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Component1 />
      </div>
    );
  }
}
