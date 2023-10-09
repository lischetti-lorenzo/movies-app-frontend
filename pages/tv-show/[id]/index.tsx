import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar';
import { Box, CircularProgress, Stack } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { TvShow } from '../../../types/tv-show.types';
import ActorsList from '../../../components/ActorsList';
import { useEffect, useState } from 'react';
import ItemDetail from '../../../components/ItemDetail';
import { DISLIKE_TVSHOW, LIKE_TVSHOW, LikeTvShowInput, TVSHOW, TvShowResult } from '../../../grapgql/queries/tvShow';

export default function TvShow () {
  const router = useRouter();
  const [ tvShow, setTvShow ] = useState<TvShow | null>(null);
  const [ favorite, setFavorite ] = useState(false);
  const id = +router.query.id;

  const { data, loading } = useQuery<TvShowResult, { tmdbTvShowId: number }>(TVSHOW, { variables: { tmdbTvShowId: id }});
  const [ likeMovie ] = useMutation<boolean, LikeTvShowInput>(LIKE_TVSHOW, {
    onCompleted: () => {
      setFavorite(true);
    }
  });

  const [ dislikeMovie ] = useMutation<boolean, LikeTvShowInput>(DISLIKE_TVSHOW, {
    onCompleted: () => {
      setFavorite(false);
    }
  });

  useEffect(() => {
    setTvShow(data?.tvShow);
    setFavorite(data?.tvShow.favorite);
  }, [data]);

  const handleLikeBtnClick = () => {
    if (favorite) {
      dislikeMovie({ variables: { tvShowId: id } });
    } else {
      likeMovie({ variables: { tvShowId: id } });
    }
  }

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
              <ItemDetail
                date={tvShow?.firstAirDate}
                title={tvShow?.name}
                handleLikeBtnClick={handleLikeBtnClick}
                isFav={favorite}
                overview={tvShow?.overview}
                posterPath={tvShow?.posterPath}
                rating={tvShow?.voteAverage*10}
              />
            </Stack>
          </Stack>
            {tvShow && tvShow.credit.cast.length > 0 ? (
              <ActorsList actors={tvShow.credit.cast} />
            ) : (
              <></>
            )}
        </>
      )}
    </>
  )
}
