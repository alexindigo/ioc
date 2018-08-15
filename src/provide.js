import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';
import { TypedObject } from './types';

export default function provide(injectables) {

  const injectableTypes = {};
  const injectableValues = {};

  Object.keys(injectables).forEach((name) => {
    if (injectables[name] instanceof TypedObject) {
      injectableTypes[name] = injectables[name].type;
      injectableValues[name] = injectables[name].value;
    } else {
      // try to guess simple prop-type
      injectableTypes[name] = getPropType(injectables[name]);
      injectableValues[name] = injectables[name];
    }
  });

  return function(Component) {
    class provideHoc extends React.Component {

      static displayName = `Provide(${getDisplayName(Component)})`

      static childContextTypes = injectableTypes

      getChildContext() {
        return injectableValues;
      }

      render() {
        const propsWithInjectables = { ...injectableValues, ...this.props };
        return (
          <Component {...propsWithInjectables} />
        );
      }
    }

    // copy all non-React static methods
    hoistNonReactStatic(provideHoc, Component);

    // add next.js specific method
    if (Component.getInitialProps) {
      provideHoc.getInitialProps = async function(context, injected = null) {
        injected = { ...injected, ...injectableValues };
        return Component.getInitialProps(context, injected);
      };
    }

    return provideHoc;
  };
}

// -- Subroutines

function getPropType(value) {
  let type = getType(value);

  // in propTypes `function` is `func`
  if (type === 'function') {
    type = 'func';
  }

  return PropTypes[type];
}

/*
 * Got it from `prop-types` package
 * to help with auto-guessing propType
 */
function getType(value) {

  const type = typeof value;

  if (Array.isArray(value)) {
    return 'array';
  }

  if (value instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }

  if (isSymbol(type, value)) {
    return 'symbol';
  }

  return type;
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}
