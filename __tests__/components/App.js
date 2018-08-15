import React from 'react';
import { provide, types } from '../..';
import TrackingProvided from './Tracking';

import Component1 from './Component1';

@provide({
  @types.func.isRequired
  Tracking: TrackingProvided
})
export default class extends React.Component {
  render() {
    const { Tracking } = this.props;

    return (
      <div>
        <h1>App</h1>
        Tracking also available as props on the provider component.
        <Tracking params={{ self: 'injected' }}><a>App: with injected</a></Tracking>
        <Component1 />
      </div>
    );
  }
}
