import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ItemsList from '../components/ItemsList';
import { Movie } from '../types/movie.types';
import { MOVIES, POPULAR_MOVIES } from '../grapgql/queries/movie';
import { TvShow } from '../types/tv-show.types';
import { POPULAR_TVSHOWS, TV_SHOWS } from '../grapgql/queries/tvShow';

export default function Home() {
  const [ currentTab, setCurrentTab ] = useState('1');

  const handleTabChange = (event: React.SyntheticEvent, tab: string) => {
    setCurrentTab(tab);
  }

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
              <ItemsList<Movie>
                firstQuery={{ queryName: POPULAR_MOVIES, resultPropertyName: 'popularMovies' }}
                secondQuery={{ queryName: MOVIES, resultPropertyName: 'movies' }}
              />
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              <ItemsList<TvShow>
                firstQuery={{ queryName: POPULAR_TVSHOWS, resultPropertyName: 'popularTvShows' }}
                secondQuery={{ queryName: TV_SHOWS, resultPropertyName: 'tvShows' }}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
