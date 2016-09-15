import MovieSearchResult from '../index';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ResultImage from 'components/ResultImage';

describe('<MovieSearchResult />', () => {
  let renderComponent;
  const props = {
    result: {
      movie: {
        poster_path: 'test',
        original_title: 'test',
        vote_count: 2,
        vote_average: 4,
        overview: 'test',
        backdrop_path: 'test',
      },
    },
  };
  beforeEach(() => {
    renderComponent = shallow(<MovieSearchResult {...props} />, {});
  });

  it('Should contain title, rate, description, runtime, genres, crew, image, filters sections', () => {
    const resultImage = renderComponent.contains(<ResultImage text={props.title} />);
    expect(resultImage).to.eql(true);
  });
  // TODO: it should contain title, rate, description, runtime, genres, crew, image, filters sections
  // TODO: render should contain message when voteAverage is null
});
