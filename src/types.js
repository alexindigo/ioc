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
  return (target, name) => {
    target[name] = new TypedObject(typeValidator, target[name]);
    return target;
  };
}

// augment types with PropTypes values
Object.keys(PropTypes).forEach((key) => {
  types[key] = typedObjectFactory(PropTypes[key]);

  // add isRequired
  if (PropTypes[key].isRequired) {
    types[key].isRequired = typedObjectFactory(PropTypes[key].isRequired);
  }
});
