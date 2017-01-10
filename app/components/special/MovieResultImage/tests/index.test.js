/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MovieResultImage from '../index';

// TODO: Write a test which will cover image loading
describe('<MovieResultImage />', () => {
  let renderComponent;
  let sizes;
  const props = {
    alt: 'test',
    image: {
      aspect_ratio: '0.6666',
      file_path: '/s1EBTUtrX4tKuawlapyDLig3sF9.jpg',
    },
  };
  beforeEach(() => {
    renderComponent = shallow(<MovieResultImage {...props} />, {});
    sizes = props.image.aspect_ratio < 1 ? ['w185', 'w780', 'original'] : ['w45', 'w780', 'original'];
  });

  it('Should render all required components', (done) => {
    const expected = renderComponent;
    setTimeout(() => {
      expect(expected.find('img')).to.have.length(1);
      expect(expected.find('LazyImage')).to.have.length(1);
      expect(expected.find('LoadingIndicator')).to.have.length(0);
      expect(expected.find('ProgressiveImage')).to.have.length(1);
      done();
    }, 0);
  });

  it('Should pick appropriate size from ratio', () => {
    const expected = renderComponent;
    expect(expected.find('LazyImage').prop('src').includes(sizes[0])).to.eql(true);
  });
});
