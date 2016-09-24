export const mapApiMovieSearchParams = {
  genre: {
    id: 'with_genres',
  },
  page: 'page',
  decade: {
    range: {
      min: 'primary_release_date.gte',
      max: 'primary_release_date.lte',
    },
  },
  trend: {
    voteRange: {
      min: 'vote_count.gte',
      max: 'vote_count.lte',
    },
    voteAverage: {
      min: 'vote_average.gte',
      max: 'vote_average.lte',
    },
  },
};

