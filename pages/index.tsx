import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MoviesList from '../components/MoviesList';
import TvShowsList from '../components/TvShowsList';

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
              <MoviesList />
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
              <TvShowsList />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
