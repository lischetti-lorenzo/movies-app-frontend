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

export default function Home() {
  const [ currentTab, setCurrentTab ] = useState('1');
  const [ currentMoviesPage, setCurrentMoviesPage ] = useState(1);
  const [ currentTvShowsPage, setCurrentTvShowsPage ] = useState(1);
  const [ popularMovies, setPopularMovies ] = useState<Movie[]>([]);
  const [ popularTvShows, setPopularTvShows ] = useState<TvShow[]>([]);
  const [ moviesQuery, {loading: moviesLoading, data: moviesQueryResult} ] = useLazyQuery(POPULAR_MOVIES);
  const [ tvShowsQuery, {loading: tvShowsLoading, data: tvShowsQueryResult} ] = useLazyQuery(POPULAR_TVSHOWS);

  const handleTabChange = (event: React.SyntheticEvent, tab: string) => {
    setCurrentTab(tab);
  }

  useEffect(() => {
    if (currentTab === '1' && popularMovies.length === 0) {
      moviesQuery({ variables: { page: currentMoviesPage }});
    }
    if (currentTab === '2' && popularTvShows.length === 0) tvShowsQuery({ variables: { page: currentTvShowsPage }});
  }, [currentTab]);

  useEffect(() => {
    if (moviesQueryResult?.popularMovies && currentMoviesPage === moviesQueryResult.popularMovies.page) {
      console.log('test2')
      setCurrentMoviesPage(currentMoviesPage + 1);
      setPopularMovies([...popularMovies, ...moviesQueryResult.popularMovies.results]);
    }
  }, [moviesQueryResult?.popularMovies]);

  useEffect(() => {
    if (tvShowsQueryResult?.popularTvShows && currentTvShowsPage === tvShowsQueryResult.popularTvShows.page) {
      setCurrentTvShowsPage(currentTvShowsPage + 1);
      setPopularTvShows([...popularTvShows, ...tvShowsQueryResult.popularTvShows.results]);
    }
  }, [tvShowsQueryResult?.popularTvShows]);

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
              {moviesLoading ? (
                <CircularProgress />
              ) 
              : (
                <ListItems items={popularMovies} />
              )}
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              {tvShowsLoading ? (
                <CircularProgress />
              ) 
              : (
                <ListItems items={popularTvShows} />
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
