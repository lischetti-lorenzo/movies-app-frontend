import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar';
import { Box, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { MOVIE, MovieResult } from '../../../grapgql/queries/movie';
import { Movie } from '../../../types/movie.types';
import { UserRating } from '../../../components/ui/UserRating';
import ActorsList from '../../../components/ActorsList';

export default function Movie () {
  const router = useRouter();
  const id = +router.query.id;

  const { data, loading } = useQuery<MovieResult, { tmdbMovieId: number }>(MOVIE, { variables: { tmdbMovieId: id }});
  const movie = data?.movie;

  return (
    <>
      <NavBar />
      {loading ? (
        <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', mt: '2%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack
            sx={{ width: '65%', height: '100%', marginTop: '2%', marginX: 'auto' }}
          >
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              style={{ width: '100%' }}
            >
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component='img'
                  alt={movie.title}
                  image={movie.posterPath ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.posterPath}` : ''}
                />
              </Card>
              <Stack direction={'column'} ml={{ sm: '0', md: '4%'}} width={'100%'} my={'auto'}>
                <Typography
                  variant='h4'
                  component='div'
                  fontWeight={'400'}
                >
                  {movie.title}
                </Typography>

                <Typography
                  gutterBottom
                  variant='body1'
                  component='div'
                  color='text.secondary'
                  mb={3}
                >
                  {movie.releaseDate}
                </Typography>

                <UserRating value={movie.voteAverage*10} sx={{ mb: '2%' }} />

                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                >
                  Overview
                </Typography>

                <Typography
                  variant='body2'
                  component='div'
                >
                  {movie.overview}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
            {movie.credit.cast.length > 0 ? (
              <ActorsList actors={movie.credit.cast} />
            ) : (
              <></>
            )}
        </>
      )}
    </>
  )
}
