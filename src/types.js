import PropTypes from 'prop-types';

export { types as default, TypedObject, PropTypes };

// types decorator
function types(typeValidator) {
  return function(target, name) {
    target[name] = new TypedObject(typeValidator, target[name]);
    return target;
  };
}

// exportable object with type meta
function TypedObject(typeValidator, value) {
  this.type = typeValidator;
  this.value = value;
}

function typedObjectFactory(typeValidator) {

  // add extra step for combined types decorators
  if (typeValidator.name.match(/^create/)) {
    return (details) => (target, name) => {
      target[name] = new TypedObject(typeValidator(details), target[name]);
      return target;
    };
  }

  return (target, name) => {
    target[name] = new TypedObject(typeValidator, target[name]);
    return target;
  };
}

// augment types with PropTypes values
Object.keys(PropTypes).forEach((key) => {

  const validator = PropTypes[key];

  // only expose actual types and combined types
  if (typeof validator === 'function' && validator.name.match(/^(bound |create)/)) {
    types[key] = typedObjectFactory(PropTypes[key]);

    // add isRequired
    if (PropTypes[key].isRequired) {
      types[key].isRequired = typedObjectFactory(PropTypes[key].isRequired);
    }
  }
});
