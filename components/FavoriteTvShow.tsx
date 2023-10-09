/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Pagination } from '../grapgql/queries/types';
import { CircularProgress } from '@mui/material';
import FavoritesList from './FavoritesList';
import { TvShow } from '../types/tv-show.types';
import { DISLIKE_TVSHOW, FAVORITE_TVSHOWS, FavoriteTvShowsResult, LikeTvShowInput } from '../grapgql/queries/tvShow';
import { ITEMS_PER_PAGE } from '../constants/pagination';

export default function FavoriteTvShow () {
  const [ skip, setSkip ] = useState(0);
  const [ items, setItems ] = useState<TvShow[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ itemToRemoveId, setItemToRemoveId ] = useState<number | null>(null);

  const { loading, data, fetchMore } = useQuery<FavoriteTvShowsResult, Pagination>(FAVORITE_TVSHOWS, {
    variables: { take: ITEMS_PER_PAGE, skip: 0 }
  });

  const [ dislikeTvShow ] = useMutation<{ unlikeTvShow: number }, LikeTvShowInput>(DISLIKE_TVSHOW, {
    update(cache, { data: { unlikeTvShow }}) {
      cache.modify({
        fields: {
          favoriteTvShows(existingItems = [], { readField }) {
            return existingItems.filter((itemRef) => readField('tmdbId', itemRef) !== unlikeTvShow)
          },
          tvShow(item = null, { readField }) {
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
    if (itemToRemoveId) dislikeTvShow({ variables: { tvShowId: itemToRemoveId }});
  }, [itemToRemoveId]);

  useEffect(() => {
    if (data?.favoriteTvShows) {
      setSkip(skip + ITEMS_PER_PAGE);
      setItems(data.favoriteTvShows);
      if (loadingPage) setLoadingPage(false);
    }
  }, [data?.favoriteTvShows]);

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
          nextPage={() => fetchMore({ variables: { skip }})}
          setItemToRemove={setItemToRemoveId}
        />
      )}
    </>
  );
}
