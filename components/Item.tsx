import Link from 'next/link';
import { Media } from '../types/media.types';
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Movie } from '../types/movie.types';
import { TvShow } from '../types/tv-show.types';
import GradeIcon from '@mui/icons-material/Grade';

interface Props {
  item: Media
  cardAction?: () => void
}

export function Item ({ item, cardAction }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`${'title' in item ? '/movie' : '/tv-show'}/${item.tmdbId}`}>
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
      {cardAction ? (
        <CardActions>
          <Button size='small' onClick={cardAction}>Remove favorite</Button>
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
}
