import { CardContent, CardMedia, Grid, Typography, Card, Stack } from '@mui/material';
import { Movie } from '../types/movie.types';
import { TvShow } from '../types/tv-show.types';
import Link from 'next/link';
import GradeIcon from '@mui/icons-material/Grade';

export function ListItems<T extends Movie | TvShow> ({ items }: { items: T[]}) {
  return (
    <Grid container sx={{ overflowY: 'hidden' }}>
      {items.map((item: Movie | TvShow) => (
        <Grid
          key={item.tmdbId}
          item={true}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{ marginBottom: '2%', alignContent: 'center', display: 'flex', justifyContent: 'center' }}
        >                      
          <Card sx={{ maxWidth: 345 }}>
            <Link href={`/item/${item.tmdbId}`}>
              <CardMedia
                component='img'
                alt={(item as Movie).title ?? (item as TvShow).name}
                image={item.posterPath ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.posterPath}` : ''}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {(item as Movie).title ?? (item as TvShow).name}
                </Typography>
                <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2' color='text.secondary'>
                    {(item as Movie).releaseDate ?? (item as TvShow).firstAirDate}
                  </Typography>
                  <Typography variant='body1' color='text.secondary' sx={{ display: 'flex' }}>
                    <GradeIcon sx={{ mr: 0.5 }} /> {item.voteAverage }
                  </Typography>
                </Stack>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
