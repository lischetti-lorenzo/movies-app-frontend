import { CircularProgress, Stack, Box, Grid, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Media } from '../types/media.types';
import { Item } from './Item';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  items: Media[]
  nextPage: () => void
  hasMore: boolean
  setItemToRemove: Dispatch<SetStateAction<number>>
}

export default function FavoritesList (
  { items, nextPage, hasMore, setItemToRemove }: Props
) {

  return (
    <Stack direction={'column'} sx={{ width: '100%' }}>
      <Typography
        variant='h4'
        component='div'
        fontWeight={'400'}
        mr={3}
        mb={2}
      >
        My Favorites
      </Typography>
      <InfiniteScroll
        dataLength={items.length}
        next={nextPage}
        hasMore={hasMore}
        loader={<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}><CircularProgress /></Box>}
        style={{ overflowY: 'hidden' }}
      >
        <Grid container sx={{ overflowY: 'hidden' }}>
          {items.map((item: Media) => (
            <Grid
              key={item.tmdbId}
              item={true}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ marginBottom: '2%', alignContent: 'center', display: 'flex', justifyContent: 'center' }}
            >                      
              <Item item={item} cardAction={() => setItemToRemove(item.tmdbId)}></Item>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Stack>
  )
}
