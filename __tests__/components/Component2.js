import React from 'react';
import Endpoint from './Endpoint';

export default () => (
  <div style={{ marginTop: '5px', border: '1px dashed #0000ff', padding: '10px' }}>
    <h3>Component2</h3>
    Knows nothing about any custom `Logger` component or prop
    <Endpoint />
  </div>
);
