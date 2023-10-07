import { useEffect, useState } from 'react';
import { Movie } from '../types/movie.types';
import { useLazyQuery } from '@apollo/client';
import { POPULAR_MOVIES } from '../grapgql/queries/movie';
import { CircularProgress, Stack, Box } from '@mui/material';
import { SearchBar } from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListItems } from './ListItems';

export default function MoviesList() {
  const [ currentMoviesPage, setCurrentMoviesPage ] = useState(1);
  const [ movies, setMovies ] = useState<Movie[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);

  const [ moviesQuery, {loading, data: moviesQueryResult} ] = useLazyQuery(POPULAR_MOVIES);

  useEffect(() => {
    if (moviesQueryResult?.popularMovies && currentMoviesPage === moviesQueryResult.popularMovies.page) {
      setCurrentMoviesPage(currentMoviesPage + 1);
      setMovies([...movies, ...moviesQueryResult.popularMovies.results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [moviesQueryResult])

  useEffect(() => {
    moviesQuery({ variables: { page: currentMoviesPage } });
  }, []);

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
          />
          <InfiniteScroll
            dataLength={movies.length}
            next={() => moviesQuery({ variables: { page: currentMoviesPage } })}
            hasMore={
              moviesQueryResult?.popularMovies && currentMoviesPage < moviesQueryResult.popularMovies.totalPages}
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
