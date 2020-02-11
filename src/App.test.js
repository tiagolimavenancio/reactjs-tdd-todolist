import React from 'react'
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  it('contains a header with the Hello World', () => {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<h1>Hello world!</h1>)).toEqual(true);
  })
})