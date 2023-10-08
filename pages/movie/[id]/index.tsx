import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar';
import { Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { MOVIE } from '../../../grapgql/queries/movie';
import { Movie } from '../../../types/movie.types';
import GradeIcon from '@mui/icons-material/Grade';
import { UserRating } from '../../../components/ui/UserRating';

interface MovieResult {
  movie: Movie;
}

export default function Movie () {
  const router = useRouter();
  const id = +router.query.id;

  const { data, loading } = useQuery<MovieResult, { tmdbMovieId: number }>(MOVIE, { variables: { tmdbMovieId: id }});
  const movie = data?.movie;

  return (
    <>
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack
          direction={'row'}
          sx={{ width: '65%', typography: 'body1', height: '100%', marginTop: '2%', marginX: 'auto' }}
        >
          <Stack
            direction={'row'}
            style={{ width: '100%' }}
          >
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component='img'
                alt={movie.title}
                image={movie.posterPath ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.posterPath}` : ''}
              />
            </Card>
            <Stack direction={'column'} ml={5} width={'100%'} my={'auto'}>
              <Typography
                gutterBottom
                variant='h4'
                component='div'
                fontWeight={'400'}
                mb={0}
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
                mb={3}
              >
                {movie.overview}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}
