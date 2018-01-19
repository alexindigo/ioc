import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default function inject(injectables) {
  return function(Component) {

    class InjectHoc extends React.Component {

      static contextTypes = injectables

      static displayName = `Inject(${getDisplayName(Component)})`

      render() {
        const injectedProps = {};
        Object.keys(injectables).forEach((injectedKey) => {
          injectedProps[injectedKey] = this.context[injectedKey];
        });

        const propsWithInjectables = { ...injectedProps, ...this.props };
        return (
          <Component {...propsWithInjectables} />
        );
      }
    }

    // copy all non-React static methods
    hoistNonReactStatic(InjectHoc, Component);

    // add next.js specific method
    if (Component.getInitialProps) {
      InjectHoc.getInitialProps = async function(context, injected = {}) {

        // filter out requested values from the provided "payload"
        const injectedProps = {};
        Object.keys(injectables).forEach((injectedKey) => {
          injected[injectedKey] && (injectedProps[injectedKey] = injected[injectedKey]);
        });
        return Component.getInitialProps(context, injectedProps);
      };
    }

    return InjectHoc;
  };
}
