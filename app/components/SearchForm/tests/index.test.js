import SearchForm from '../index';

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

describe('<SearchForm />', () => {


  it('Simulates onChange event on #feeling select input', () => {
    //Mount SearchForm component
    const wrapper = mount(<SearchForm />);
    //Find specific selector
    const feelingSelector = wrapper.find('#feeling');

    //Set default feeling state
    wrapper.setState({ feeling: 'sad' });
    //Simulate a change on selector
    feelingSelector.simulate('change', { target: { value: 'emotional' } });

    //condition
    expect(wrapper.state('feeling')).to.equal('emotional');
  });


});