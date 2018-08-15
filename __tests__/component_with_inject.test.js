/* eslint-env jest */

/*
 * Individual component testing is pretty simple
 * just provide your dependencies as props
 * and add `.dive()` step to your shallow render,
 * as with any High Order Component.
 *
 * Remarks about `.html()` may apply,
 * depending if any of the children components
 * expect anything from the context
 */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Component from './components/Endpoint';

describe('With Enzyme', () => {
  it('Component renders with props', () => {
    // no need to mock Tracking component much for shallow rendering
    const injected = shallow(<Component AB={'B'} Tracking={() => {}} />);
    const component = injected.dive();
    expect(component.find('h3').text()).toEqual('Endpoint (B)');
    expect(component.find('Tracking').first().find('a').text()).toEqual('About: foo baz');
  });
});

describe('With Snapshot Testing', () => {
  it('Component renders with props', () => {
    const component = renderer.create(<Component AB={'B'} Tracking={(props) => <div comment="mocked Tracking component">{props.children}</div>} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
