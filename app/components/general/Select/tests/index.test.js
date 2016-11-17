/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Title from 'components/general/Title';

import Select from '../index';


describe('<Select />', () => {
  let renderComponent;
  const props = {
    title: 'test eslotwinski',
    value: 'test',
    valueKey: 'name',
    labelKey: 'name',
    options: [1, 2, 3],
    onChange: sinon.spy(),
  };
  beforeEach(() => {
    renderComponent = shallow(<Select {...props} />, {});
  });

  it('Should render the props.title', () => {
    const title = renderComponent.contains(<Title text={props.title} />);
    expect(title).to.eql(true);
  });

  it('Should run onChange while the select change', () => {
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
