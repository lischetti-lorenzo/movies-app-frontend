import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { CircularProgress, Stack, Box } from '@mui/material';
import { SearchBar } from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListItems } from './ListItems';
import { TvShow } from '../types/tv-show.types';
import { POPULAR_TVSHOWS } from '../grapgql/queries/tvShow';

export default function TvShowsList() {
  const [ currentTvShowsPage, setCurrentTvShowsPage ] = useState(1);
  const [ tvShows, setTvShows ] = useState<TvShow[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);

  const [ tvShowsQuery, {loading, data: tvShowsQueryResult} ] = useLazyQuery(POPULAR_TVSHOWS);

  useEffect(() => {
    if (tvShowsQueryResult?.popularTvShows && currentTvShowsPage === tvShowsQueryResult.popularTvShows.page) {
      setCurrentTvShowsPage(currentTvShowsPage + 1);
      setTvShows([...tvShows, ...tvShowsQueryResult.popularTvShows.results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [tvShowsQueryResult])

  useEffect(() => {
    tvShowsQuery({ variables: { page: currentTvShowsPage } });
  }, []);

  return (
    <>
      {loadingPage ? (
        <CircularProgress />
      ) 
      : (
        <Stack direction={'column'}>
          <SearchBar
            placeholder='Search Tv Shows'
            className='mx-auto mb-5'
          />
          <InfiniteScroll
            dataLength={tvShows.length}
            next={() => tvShowsQuery({ variables: { page: currentTvShowsPage } })}
            hasMore={
              tvShowsQueryResult?.popularTvShows && currentTvShowsPage < tvShowsQueryResult.popularTvShows.totalPages}
            loader={<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}><CircularProgress /></Box>}
            style={{ overflowY: 'hidden' }}
          >
            <ListItems items={tvShows} />
          </InfiniteScroll>
        </Stack>
      )}
    </>
  )
}
