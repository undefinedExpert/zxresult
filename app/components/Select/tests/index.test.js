import Select from '../index';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Select />', () => {
  let renderComponent;
  const props = {
    title: 'test cos',
    value: 'test',
    valueKey: 'name',
    labelKey: 'name',
    options: [1, 2, 3],
    onChange: sinon.spy(),
  };
  beforeEach(() => {
    renderComponent = shallow(<Select {...props} />, {});
  });

  it('Should render the title', () => {
    const title = renderComponent.find('h6');
    expect(title.text()).to.eql(props.title);
  });

  it('Should run onChangeHandler while the select change', () => {
    const select = renderComponent.find('Select');
    select.simulate('change');
    expect(select.prop('onChange').calledOnce).to.eql(true);
  });

  // TODO: ReactSelect exist
  //       There is a problem where ReactSelect does not seem to exist,
  //       Instead of ReactSelect component (while shallow our SelectFilter)
  //       We can saw "<Select ... />" which is a default component from
  //       ReactSelect.
});
