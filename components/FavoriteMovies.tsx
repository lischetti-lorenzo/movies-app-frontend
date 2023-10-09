/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DISLIKE_MOVIE, FAVORITE_MOVIES, FavoriteMoviesResult, LikeMovieInput } from '../grapgql/queries/movie';
import { Pagination } from '../grapgql/queries/types';
import { Movie } from '../types/movie.types';
import { CircularProgress } from '@mui/material';
import FavoritesList from './FavoritesList';

export default function FavoriteMovies () {
  const [ skip, setSkip ] = useState(0);
  const [ items, setItems ] = useState<Movie[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ itemToRemoveId, setItemToRemoveId ] = useState<number | null>(null);

  const [ favoriteMovies, { loading, data } ] = useLazyQuery<FavoriteMoviesResult, Pagination>(FAVORITE_MOVIES, {
    variables: { take: 10, skip },
    onCompleted: () => {
      if (data?.favoriteMovies) {
        setSkip(skip + 10);
        setItems([...items, ...data.favoriteMovies]);
        if (loadingPage) setLoadingPage(false);
      }
    }
  });

  const [ dislikeMovie ] = useMutation<{ unlikeMovie: number }, LikeMovieInput>(DISLIKE_MOVIE, {
    update(cache, { data: { unlikeMovie }}) {
      cache.modify({
        fields: {
          favoriteMovies(existingItems = [], { readField }) {
            console.log('Favs: ', existingItems)
            return existingItems.filter((itemRef) => readField('tmdbId', itemRef) !== unlikeMovie)
          }
        }
      });
    }
  });

  useEffect(() => {
    favoriteMovies();
  }, []);

  useEffect(() => {
    if (itemToRemoveId) dislikeMovie({ variables: { movieId: itemToRemoveId }});
  }, [itemToRemoveId]);

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
          nextPage={() => favoriteMovies({ variables: { take: 10, skip }})}
          setItemToRemove={setItemToRemoveId}
        />
      )}
    </>
  );
}
