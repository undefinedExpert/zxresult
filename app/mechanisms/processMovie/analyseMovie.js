/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

/**
 * rankItem
 * @desc Rank movie with this mathematical model: (g / (g+m)) *s + (m / (g+m)) * S
 * s - vote average for this movie
 * g - vote count for this movie
 * m - minimal vote counts
 * S - average of all movies
 */
const rankItem = (item) => {
  const minimalVoteCount = 100;
  return (item.vote_count / (item.vote_count + minimalVoteCount) * item.vote_average + (minimalVoteCount / (item.vote_count + minimalVoteCount)) * 9);
};


/**
 * rankMovies
 * @desc Ranks and moves notSorted movies into pending list,
 * removes the weakest 10 movies from each call if we contain at least 10 pages
 */
export function rankMovies(notSorted, pending, range) {
  // Concat pending and upcomingMovies
  const requestedToSort = pending ? pending.concat(notSorted) : notSorted;

  const sorted = requestedToSort.sort((itemA, itemB) => rankItem(itemA) - rankItem(itemB));

  const isEnoughPages = (range.pages - range.pagesCache.length) > 10;
  if (sorted.length > 10 && isEnoughPages) sorted.length -= 10;

  return sorted;
}
