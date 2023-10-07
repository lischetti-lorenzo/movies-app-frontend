/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie.types';
import { useLazyQuery } from '@apollo/client';
import { MOVIES, POPULAR_MOVIES } from '../grapgql/queries/movie';
import { CircularProgress, Stack, Box } from '@mui/material';
import { SearchBar } from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListItems } from './ListItems';

export default function MoviesList() {
  const [ currentMoviesPage, setCurrentMoviesPage ] = useState(1);
  const [ movies, setMovies ] = useState<Movie[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ searchText, setSearchText ] = useState('');
  const [ readyToQuery, setReadyToQuery ] = useState(false);

  const [ popularMoviesQuery, { loading, data: popularMoviesQueryResult } ] = useLazyQuery(POPULAR_MOVIES);
  const [ moviesQuery, { loading: loadingMovies, data: moviesQueryResult } ] = useLazyQuery(MOVIES);

  useEffect(() => {
    popularMoviesQuery({ variables: { page: currentMoviesPage } });
  }, []);

  useEffect(() => {
    if (popularMoviesQueryResult?.popularMovies && currentMoviesPage === popularMoviesQueryResult.popularMovies.page) {
      setCurrentMoviesPage(currentMoviesPage + 1);
      setMovies([...movies, ...popularMoviesQueryResult.popularMovies.results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [popularMoviesQueryResult])

  useEffect(() => {
    if (moviesQueryResult?.movies && currentMoviesPage === moviesQueryResult.movies.page) {
      setCurrentMoviesPage(currentMoviesPage + 1);
      setMovies([...movies, ...moviesQueryResult.movies.results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [moviesQueryResult])

  useEffect(() => {
    setCurrentMoviesPage(1);
    setMovies([]);
    setReadyToQuery(true);
  }, [searchText]);

  useEffect(() => {
    if (readyToQuery) {
      if (searchText === '') {      
        popularMoviesQuery({ variables: { page: currentMoviesPage } });
      } else {
        moviesQuery({ variables: { page: currentMoviesPage, query: searchText } });
      }
      setReadyToQuery(false);
    }
  }, [searchText, readyToQuery]);

  const hasMoreCondition = (): boolean => {
    if (searchText !== '') {
      return moviesQueryResult?.movies && currentMoviesPage <= moviesQueryResult.movies.totalPages;
    }

    return popularMoviesQueryResult?.popularMovies && currentMoviesPage <= popularMoviesQueryResult.popularMovies.totalPages;
  }

  return (
    <>
      {loadingPage ? (
        <CircularProgress />
      ) 
      : (
        <Stack direction={'column'}>
          <SearchBar
            placeholder='Search Movies'
            className='mx-auto mb-5'
            setSearchText={setSearchText}
          />
          <InfiniteScroll
            dataLength={movies.length}
            next={() => {
              return searchText !== '' ?
                moviesQuery({ variables: { page: currentMoviesPage, query: searchText } }) :
                popularMoviesQuery({ variables: { page: currentMoviesPage } })
            }}
            hasMore={hasMoreCondition()}
            loader={<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}><CircularProgress /></Box>}
            style={{ overflowY: 'hidden' }}
          >
            <ListItems items={movies} />
          </InfiniteScroll>
        </Stack>
      )}
    </>
  )
}
