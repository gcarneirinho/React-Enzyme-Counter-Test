import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';
import { TestScheduler } from '@jest/core';
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * 
 * @param {function} setup 
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper} 
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if(state) wrapper.setState(state);
  return wrapper;
}

/**
 * 
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within. 
 * @param {string} val - Value of data-test attribute for search. 
 * @return {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('should run without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr( wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
})
test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper,'increment-button');
  expect(button.length).toBe(1);
})
test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.length).toBe(1);
})
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
})
test('clicking button increments the counter display', () => {
  const counter = 7;
  const wrapper = setup(null, {counter});

  // find button and click
  const button = findByTestAttr(wrapper,'increment-button');
  button.simulate('click');

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
})
