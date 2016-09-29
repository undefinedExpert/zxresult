export function rankMovies(upcomingResults, pendingMovies) {
  // Concat pendingMovies and upcomingMovies
  const requestedToSort = pendingMovies ? pendingMovies.concat(upcomingResults) : upcomingResults;

  // Pick best movies
  const sorted = requestedToSort.sort((itemA, itemB) => {
    const minimalVoteCount = 50;
    return (itemB.vote_count / (itemB.vote_count + minimalVoteCount) * itemB.vote_average + ( minimalVoteCount / (itemB.vote_count + minimalVoteCount)) * 5) - (itemA.vote_count / (itemA.vote_count + minimalVoteCount) * itemA.vote_average + (50 / (itemA.vote_count + 50)) * 5)
  });

  // just take 5 first instead of 20
  sorted.length -= 15;

  return sorted;
}
