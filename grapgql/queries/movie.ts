import { gql } from '@apollo/client';

export const POPULAR_MOVIES = gql `
  query PopularMovies($page: Int) {
    popularMovies(page: $page) {
      page
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

export const MOVIES = gql `
  query Movies($query: String!, $page: Int) {
    movies(query: $query, page: $page) {
      page
      results {
        tmdbId
        title
        posterPath
        releaseDate
        voteAverage
      }
      totalPages
    }
  }
`;

export const MOVIE = gql `
  query Movie($tmdbMovieId: Int!) {
    movie(tmdbMovieId: $tmdbMovieId) {
      title
      posterPath
      backdropPath
      releaseDate
      voteAverage
      overview
      credit {
        cast {
          character
          name
          order
        }
      }
    }
  }
`;
