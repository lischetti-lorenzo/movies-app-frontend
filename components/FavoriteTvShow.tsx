/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Pagination } from '../grapgql/queries/types';
import { CircularProgress } from '@mui/material';
import FavoritesList from './FavoritesList';
import { TvShow } from '../types/tv-show.types';
import { DISLIKE_TVSHOW, FAVORITE_TVSHOWS, FavoriteTvShowsResult, LikeTvShowInput } from '../grapgql/queries/tvShow';

export default function FavoriteTvShow () {
  const [ skip, setSkip ] = useState(0);
  const [ items, setItems ] = useState<TvShow[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ itemToRemoveId, setItemToRemoveId ] = useState<number | null>(null);

  const [ favoriteTvShows, { loading, data } ] = useLazyQuery<FavoriteTvShowsResult, Pagination>(FAVORITE_TVSHOWS, {
    variables: { take: 10, skip },
    onCompleted: () => {
      if (data?.favoriteTvShows) {
        setSkip(skip + 10);
        setItems([...items, ...data.favoriteTvShows]);
        if (loadingPage) setLoadingPage(false);
      }
    }
  });

  const [ dislikeMovie ] = useMutation<{ unlikeTvShow: number }, LikeTvShowInput>(DISLIKE_TVSHOW);

  useEffect(() => {
    favoriteTvShows();
  }, []);

  useEffect(() => {
    if (itemToRemoveId) dislikeMovie({ variables: { tvShowId: itemToRemoveId }});
  }, [itemToRemoveId]);

  const hasMoreCondition = (): boolean => {
    return items.length < data?.totalFavoriteTvShows;
  }
  return (
    <>
      {loadingPage ? (
        <CircularProgress />
      ) : (
        <FavoritesList
          items={items}
          hasMore={hasMoreCondition()}
          nextPage={() => favoriteTvShows({ variables: { take: 10, skip }})}
          setItemToRemove={setItemToRemoveId}
        />
      )}
    </>
  );
}
