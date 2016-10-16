// import { MovieSearchResult } from '../index';
// import styles from '../styles.css';
// import { shallow } from 'enzyme';
// import { expect } from 'chai';
// import React from 'react';
// import ResultImage from 'components/ResultImage';
// import HeartRate from 'components/HeartRate';
// import Genres from 'components/Genres';
// import { IoClock } from 'react-icons/lib/io/';
//
// describe('<MovieSearchResult />', () => {
//   let renderComponent;
//   const props = {
//     result: {
//       movie: {
//         poster_path: 'test',
//         original_title: 'test',
//         vote_count: 2,
//         vote_average: 4,
//         overview: 'test',
//         backdrop_path: 'test',
//       },
//     },
//   };
//   const movie = props.result.movie;
//   beforeEach(() => {
//     renderComponent = shallow(<MovieSearchResult {...props} />, {});
//   });
//
//   it('Should contain title, rate, description, runtime, genres, crew, image, filters sections', () => {
//     const title = renderComponent.contains(
//       <h1 className={styles.title}>{movie.original_title} <span className={styles.date}>(2016)</span></h1>
//     );
//     expect(title).to.eql(true);
//
//     const rate = renderComponent.contains(
//       <HeartRate voteAverage={movie.vote_average} />
//     );
//     expect(rate).to.eql(true);
//
//     const description = renderComponent.contains(
//       <p>{movie.overview}</p>
//     );
//     expect(description).to.eql(true);
//
//     const runtime = renderComponent.contains(
//       <span><IoClock className={styles.icon} size={50} /> 2h 31min</span>
//     );
//     expect(runtime).to.eql(true);
//
//     const genres = renderComponent.contains(
//       <Genres />
//     );
//     expect(genres).to.eql(true);
//
//     const crew = renderComponent.find('SingleCrew');
//     expect(crew.length).to.eql(3);
//
//     const resultImage = renderComponent.contains(
//       <ResultImage
//         path={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
//         alt={`${movie.original_title} poster`}
//       />
//     );
//     expect(resultImage).to.eql(true);
//   });
//
//   // TODO: render should contain message when voteAverage is null
// });
