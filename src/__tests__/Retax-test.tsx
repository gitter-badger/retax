jest.unmock('../Retax');

import * as React from 'react';

import { shallow } from 'enzyme';
import Retax from '../Retax';

describe('Retax', () => {
  it('should work', () => {
    const wrapper = shallow(
      <Retax />
    );

    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('Hay.');
  });

  it('should render all the card components', () => {
    const wrapper = shallow(
      <Retax text="It works!" />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('It works!');
  });
});
