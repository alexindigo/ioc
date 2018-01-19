import React from 'react';

export default (props) => (
  <div>
    Children elements wrapped with {Object.values(props.params)}
    {props.children}
  </div>
);
