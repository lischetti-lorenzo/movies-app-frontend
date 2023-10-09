import { gql } from '@apollo/client';
import { Movie } from '../../types/movie.types';

export interface MovieResult {
  movie: Movie;
}

export interface LikeMovieInput {
  movieId: number
}

export interface FavoriteMoviesResult {
  favoriteMovies: Movie[]
  totalFavoriteMovies: number
}

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
      favorite
      credit {
        cast {
          character
          name
          order
          profilePath
        }
      }
    }
  }
`;

export const LIKE_MOVIE = gql `
  mutation LikeMovie($movieId: Int!) {
    likeMovie(movieId: $movieId)
  }
`

export const DISLIKE_MOVIE = gql `
  mutation DislikeMovie($movieId: Int!) {
    unlikeMovie(movieId: $movieId)
  }
`

export const FAVORITE_MOVIES = gql `
  query FavoriteMovies($skip: Int!, $take: Int!) {
    favoriteMovies(skip: $skip, take: $take) {
      tmdbId
      title
      posterPath
      releaseDate
      voteAverage
    }
    totalFavoriteMovies
  }
`;
