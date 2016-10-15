export function rankMovies(upcomingResults, pending, range) {
  // Concat pending and upcomingMovies
  const requestedToSort = pending ? pending.concat(upcomingResults) : upcomingResults;

  // Pick best movies
  const sorted = requestedToSort.sort((itemA, itemB) => {
    const minimalVoteCount = 100;
    return (itemB.vote_count / (itemB.vote_count + minimalVoteCount) * itemB.vote_average + ( minimalVoteCount / (itemB.vote_count + minimalVoteCount)) * 5) - (itemA.vote_count / (itemA.vote_count + minimalVoteCount) * itemA.vote_average + (50 / (itemA.vote_count + 50)) * 5)
  });

  const isEnoughtPages = (range.pages - range.pagesCache.length) > 10;
  // just take 10 first instead of 20
  if (sorted.length > 10 && isEnoughtPages) sorted.length -= 10;

  return sorted;
}
