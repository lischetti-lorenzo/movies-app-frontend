import { Card, CardMedia, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserRating } from './ui/UserRating';

interface Props {
  title: string
  posterPath: string
  isFav: boolean
  handleLikeBtnClick: () => void
  date: string
  rating: number
  overview: string
}

export default function ItemDetail ({
  title,
  posterPath,
  isFav,
  handleLikeBtnClick,
  date,
  rating,
  overview
}: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component='img'
          alt={title}
          image={posterPath ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${posterPath}` : ''}
        />
      </Card>
      <Stack direction={'column'} ml={{ sm: '0', md: '4%'}} width={'100%'} my={{ xs: '4%', md: 'auto' }}>
        <Stack direction='row'>
          <Typography
            variant='h4'
            component='div'
            fontWeight={'400'}
            mr={3}
          >
            {title}
          </Typography>

          <button
            onClick={handleLikeBtnClick}
          >
            {isFav ? (
              <FavoriteIcon fontSize='large' />
            ) : (
              <FavoriteBorderIcon fontSize='large' />
            )}
          </button>
        </Stack>

        <Typography
          gutterBottom
          variant='body1'
          component='div'
          color='text.secondary'
          mb={3}
        >
          {date}
        </Typography>

        <UserRating value={rating} sx={{ mb: '2%' }} />

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
          {overview}
        </Typography>
      </Stack>
    </>
  );
}
