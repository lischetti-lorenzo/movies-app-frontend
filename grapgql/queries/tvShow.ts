import { gql } from '@apollo/client';

export const POPULAR_TVSHOWS = gql `
  query PopularTvShows($page: Int) {
    popularTvShows(page: $page) {
      page
      totalPages
      results {
        tmdbId
        firstAirDate
        name
        voteAverage
        posterPath
      }
    }
  }
`;
