import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Cast } from '../types/media.types';

export default function ActorsList ({ actors }: { actors: Cast[]}) {
  return (
    <Stack
      direction='column'
      sx={{
        width: '85%',
        height: '100%',
        marginTop: '3%',
        marginX: 'auto',
        mb: 5
      }}
    >
      <Typography
        variant='h4'
        component='div'
        fontWeight={'400'}
      >
        Cast
      </Typography>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        sx={{
          width: '100%',
          height: '100%',
          marginTop: '2%',
          overflow: 'scroll'
        }}
        style={{ overflowX: 'auto', overflowY: 'hidden' }}
      >
        {actors.map(actor => {
          return (
            <Card sx={{ minWidth: 220, maxWidth: 345, minHeight: '200', mr: 2 }} key={actor.order}>
              <CardMedia
                component='img'
                image={actor.profilePath ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${actor.profilePath}` : ''}
                alt={actor.name}
                height={'370px'}
                className='actorProfilePicture'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {actor.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {actor.character}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </Stack>
  )
}
