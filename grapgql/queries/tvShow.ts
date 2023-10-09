import { gql } from '@apollo/client';
import { TvShow } from '../../types/tv-show.types';

export interface TvShowResult {
  tvShow: TvShow;
}

export interface LikeTvShowInput {
  tvShowId: number
}

export interface FavoriteTvShowsResult {
  favoriteTvShows: TvShow[]
  totalFavoriteTvShows: number
}

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

export const TVSHOW = gql `
  query TvShow($tmdbTvShowId: Int!) {
    tvShow(tmdbTvShowId: $tmdbTvShowId) {
      name
      posterPath
      backdropPath
      firstAirDate
      voteAverage
      overview
      favorite

      credit {
        cast {
          character
          id
          name
          order
          profilePath
        }
      }    
    }
  }
`;

export const LIKE_TVSHOW = gql `
  mutation LikeTvShow($tvShowId: Int!) {
    likeTvShow(tvShowId: $tvShowId)
  }
`

export const DISLIKE_TVSHOW = gql `
  mutation DisLikeTvShow($tvShowId: Int!) {
    unlikeTvShow(tvShowId: $tvShowId)
  }
`

export const FAVORITE_TVSHOWS = gql `
  query FavoriteTvShows($skip: Int!, $take: Int!) {
    favoriteTvShows(skip: $skip, take: $take) {
      tmdbId
      firstAirDate
      name
      voteAverage
      posterPath
    }
    totalFavoriteTvShows
  }
`;
