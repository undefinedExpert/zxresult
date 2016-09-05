import SelectList from '../index';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<SelectList />', () => {
  let renderComponent;
  const props = {
    items: [
      { value: 'test1', list: [], options: { onChangeHandler: sinon.spy(), title: 'Test1' } },
      { value: 'test2', list: [], options: { onChangeHandler: () => {}, title: 'Test2' } },
      { value: 'test3', list: [], options: { onChangeHandler: () => {}, title: 'Test3' } },
    ],
  };
  beforeEach(() => {
    renderComponent = shallow(<SelectList items={props.items} />, {});
  });

  it('Should render at least 3 items', () => {
    const expected = renderComponent.find('Select');
    expect(expected.length).to.be.eql(props.items.length);
  });

  it('Should run onChangeHandler while the select change', () => {
    const select = renderComponent.find('Select[title="Test1"]');
    select.simulate('change');
    expect(select.prop('onChange').calledOnce).to.eql(true);
  });
});
