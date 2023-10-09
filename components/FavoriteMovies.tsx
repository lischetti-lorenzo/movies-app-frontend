/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DISLIKE_MOVIE, DislikeMovieResult, FAVORITE_MOVIES, FavoriteMoviesResult, LikeMovieInput } from '../grapgql/queries/movie';
import { Pagination } from '../grapgql/queries/types';
import { Movie } from '../types/movie.types';
import { CircularProgress } from '@mui/material';
import FavoritesList from './FavoritesList';
import { ITEMS_PER_PAGE } from '../constants/pagination';

export default function FavoriteMovies () {
  const [ skip, setSkip ] = useState(0);
  const [ items, setItems ] = useState<Movie[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ itemToRemoveId, setItemToRemoveId ] = useState<number | null>(null);

  const { loading, data, fetchMore } = useQuery<FavoriteMoviesResult, Pagination>(FAVORITE_MOVIES, {
    variables: { take: ITEMS_PER_PAGE, skip: 0 }
  });

  const [ dislikeMovie ] = useMutation<DislikeMovieResult, LikeMovieInput>(DISLIKE_MOVIE, {
    update(cache, { data: { unlikeMovie }}) {
      cache.modify({
        fields: {
          favoriteMovies(existingItems = [], { readField }) {
            return existingItems.filter((itemRef) => readField('tmdbId', itemRef) !== unlikeMovie)
          },
          movie(item = null, { readField }) {
            if (item === null) return;
            return {
              ...item,
              favorite: false
            };
          }
        }
      });
    }
  });

  useEffect(() => {
    if (itemToRemoveId) dislikeMovie({ variables: { movieId: itemToRemoveId }});
  }, [itemToRemoveId]);

  useEffect(() => {
    if (data?.favoriteMovies) {
      setSkip(skip + ITEMS_PER_PAGE);
      setItems(data.favoriteMovies);
      if (loadingPage) setLoadingPage(false);
    }
  }, [data?.favoriteMovies]);

  const hasMoreCondition = (): boolean => {
    return items.length < data?.totalFavoriteMovies;
  }

  return (
    <>
      {loadingPage ? (
        <CircularProgress />
      ) : (
        <FavoritesList
          items={items}
          hasMore={hasMoreCondition()}
          nextPage={() => fetchMore({ variables: { skip }})}
          setItemToRemove={setItemToRemoveId}
        />
      )}
    </>
  );
}
