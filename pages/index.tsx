/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { POPULAR_MOVIES } from '../grapgql/queries/movie'
import { POPULAR_TVSHOWS } from '../grapgql/queries/tvShow';
import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Box, CircularProgress, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ListItems } from '../components/ListItems';
import { Movie } from '../types/movie.types';
import { TvShow } from '../types/tv-show.types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const [ loading, setLoading ] = useState(true);
  const [ currentTab, setCurrentTab ] = useState('1');
  const [ currentMoviesPage, setCurrentMoviesPage ] = useState(1);
  const [ currentTvShowsPage, setCurrentTvShowsPage ] = useState(1);
  const [ popularMovies, setPopularMovies ] = useState<Movie[]>([]);
  const [ popularTvShows, setPopularTvShows ] = useState<TvShow[]>([]);
  const [ moviesQuery, {loading: moviesLoading, data: moviesQueryResult} ] = useLazyQuery(POPULAR_MOVIES, {
    onCompleted: () => {
      if (moviesQueryResult?.popularMovies && currentMoviesPage === moviesQueryResult.popularMovies.page) {
        setCurrentMoviesPage(currentMoviesPage + 1);
        setPopularMovies([...popularMovies, ...moviesQueryResult.popularMovies.results]);
        setLoading(false);
      }
    }
  });
  const [ tvShowsQuery, {loading: tvShowsLoading, data: tvShowsQueryResult} ] = useLazyQuery(POPULAR_TVSHOWS, {
    onCompleted: () => {
      if (tvShowsQueryResult?.popularTvShows && currentTvShowsPage === tvShowsQueryResult.popularTvShows.page) {
        setCurrentTvShowsPage(currentTvShowsPage + 1);
        setPopularTvShows([...popularTvShows, ...tvShowsQueryResult.popularTvShows.results]);
        setLoading(false);
      }
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, tab: string) => {
    setCurrentTab(tab);
  }

  useEffect(() => {
    const triggerMoviesQuery = currentTab === '1' && popularMovies.length === 0;
    const triggerTvShowsQuery = currentTab === '2' && popularTvShows.length === 0
    setLoading(true);
    if (triggerMoviesQuery) {
      moviesQuery({ variables: { page: currentMoviesPage }});
    }
    if (triggerTvShowsQuery) {
      tvShowsQuery({ variables: { page: currentTvShowsPage }});
    }

    if (!triggerMoviesQuery && !triggerTvShowsQuery) setLoading(false);
  }, [currentTab]);

  return (
    <>
      <NavBar />
      <Box sx={{ width: '100%', typography: 'body1', height: '100%' }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 2, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <TabList onChange={handleTabChange} centered>
              <Tab label='Movies' value='1' />
              <Tab label='Tv Shows' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1' sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              {loading ? (
                <CircularProgress />
              ) 
              : (
                <InfiniteScroll
                  dataLength={popularMovies.length}
                  next={() => moviesQuery({ variables: { page: currentMoviesPage } })}
                  hasMore={
                    moviesQueryResult?.popularMovies && currentMoviesPage < moviesQueryResult.popularMovies.totalPages}
                  loader={<CircularProgress />}
                  style={{ overflowY: 'hidden' }}
                >
                  <ListItems items={popularMovies} />
                </InfiniteScroll>                
              )}
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              {loading ? (
                <CircularProgress />
              ) 
              : (
                <InfiniteScroll
                  dataLength={popularTvShows.length}
                  next={() => tvShowsQuery({ variables: { page: currentTvShowsPage } })}
                  hasMore={
                    tvShowsQueryResult?.popularTvShows && currentTvShowsPage < tvShowsQueryResult.popularTvShows.totalPages}
                  loader={<CircularProgress />}
                  style={{ overflowY: 'hidden' }}
                >
                  <ListItems items={popularTvShows} />
                </InfiniteScroll>  
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
