/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';

import Genres from 'components/special/MovieGenres';
import MovieTitle from 'components/special/MovieTitle';
import CrewList from 'components/special/MovieCrewList';
import HeartRate from 'components/special/MovieHeartRate';
import MovieRuntime from 'components/special/MovieRuntime';
import MovieDescription from 'components/special/MovieDescription';

import MovieArticle from '../index';


describe('<MovieArticle />', () => {
  let renderComponent;
  const props = {
    movie: {
      poster_path: '/s1EBTUtrX4tKuawlapyDLig3sF9.jpg',
      adult: false,
      overview: 'With King Richard off to the Crusades...',
      release_date: '1973-11-08',
      genre_ids: [16, 22],
      genres: ['animation', 'action'],
      id: 11886,
      runtime: 95,
      original_title: 'Robin Hood',
      original_language: 'en',
      title: 'Robin Hood',
      backdrop_path: '/gidtawc8Mne3Dc5UrkvXhoIZqCZ.jpg',
      popularity: 1.911253,
      vote_count: 589,
      video: false,
      vote_average: 6.83,
      credits: {
        cast: [
          {
            profile_path: '',
          },
          {
            profile_path: '',
          },
          {
            profile_path: '',
          },
        ],
        crew: [
          {
            profile_path: '',
          },
          {
            profile_path: '',
          },
          {
            profile_path: '',
          },
        ],
      },
    },
  };
  const crewItems = [
    { image: props.movie.credits.cast[0].profile_path, alt: 'test', title: 'Director', sectionSize: '1/3' },
    { image: props.movie.credits.cast[1].profile_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
    { image: props.movie.credits.cast[2].profile_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
  ];
  const votes = {
    voteAverage: props.movie.vote_average,
    voteCount: props.movie.vote_average,
  };
  const components = [
    <MovieTitle movieTitle={props.movie.title} />,
    <HeartRate votes={votes} />,
    <MovieDescription description={props.movie.overview} limit={160} />,
    <MovieRuntime time={props.movie.runtime} />,
    <Genres items={props.movie.genres} />,
    <CrewList items={crewItems} />,
  ];
  beforeEach(() => {
    renderComponent = shallow(<MovieArticle {...props} />, {});
  });

  it('Should contain & render all related to movie components', () => {
    components.forEach((item => {
      const expected = renderComponent.containsMatchingElement(item);
      expect(expected).to.eql(true);
    }));
  });

  it('Movie should always be provided', () => {
    const expected = mount(<MovieArticle {...props} />, {});
    expect(expected.props().movie).to.not.eql(undefined);
  });
});
