import React from 'react';

// these PropTypes are passed down from `prop-types`
// so if you're using PropTypes only for dependency Injection
// you can save yourself extra line in the package.json
import { inject, PropTypes } from '../..';

@inject({
  // keep it `isRequired`-free to allow mock injection via props
  Tracking: PropTypes.func
})
export default class extends React.Component {
  static propTypes = {
    // you can add `isRequired` to the component's propTypes definition
    Tracking: PropTypes.func.isRequired
  }

  render() {
    const { Tracking } = this.props;

    return (
      <div style={{ marginTop: '5px', border: '1px dashed #00ff00', padding: '10px' }}>
        <h3>Endpoint</h3>
        Uses injected `Log` component without direct dependency on one
        <br />
        <Tracking params={{ foo: 'baz' }}><a>About: foo baz</a></Tracking>
      </div>
    );
  }
}
