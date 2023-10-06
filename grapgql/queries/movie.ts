import { gql } from '@apollo/client';

export const POPULAR_MOVIES = gql `
  query PopularMovies($page: Int) {
    popularMovies(page: $page) {
      totalPages
      results {
        tmdbId
        title
        posterPath
        releaseDate
        voteAverage
      }
    }
  }
`;
