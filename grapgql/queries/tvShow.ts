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

export const TV_SHOWS = gql `
  query TvShows($query: String!, $page: Int) {
    tvShows(query: $query, page: $page) {
      page
      results {
        tmdbId
        firstAirDate
        name
        voteAverage
        posterPath
      }
      totalPages
    }
  }
`;
