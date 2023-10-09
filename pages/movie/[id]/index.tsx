import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar';
import { Box, CircularProgress, Stack } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import {
  DISLIKE_MOVIE,
  DislikeMovieResult,
  LIKE_MOVIE,
  LikeMovieInput,
  LikeMovieResult,
  MOVIE,
  MovieResult
} from '../../../grapgql/queries/movie';
import { Movie } from '../../../types/movie.types';
import ActorsList from '../../../components/ActorsList';
import { useEffect, useState } from 'react';
import ItemDetail from '../../../components/ItemDetail';

export default function Movie () {
  const router = useRouter();
  const [ movie, setMovie ] = useState<Movie | null>(null);
  const [ favorite, setFavorite ] = useState(false);
  const id = +router.query.id;

  const { data, loading } = useQuery<MovieResult, { tmdbMovieId: number }>(MOVIE, { variables: { tmdbMovieId: id }});
  const [ likeMovie ] = useMutation<LikeMovieResult, LikeMovieInput>(LIKE_MOVIE, {
    onCompleted: () => {
      setFavorite(true);
    },
    update(cache, { data: { likeMovie }}) {
      cache.modify({
        fields: {
          movie(item = null, { readField }) {
            if (item === null) return;
            return {
              ...item,
              favorite: true
            };
          },
          favoriteMovies(existingItems = [], { readField }) {
            return [...existingItems, likeMovie];
          }
        }
      });
    }
  });

  const [ dislikeMovie ] = useMutation<DislikeMovieResult, LikeMovieInput>(DISLIKE_MOVIE, {
    onCompleted: () => {
      setFavorite(false);
    },
    update(cache, { data: { unlikeMovie }}) {
      cache.modify({
        fields: {
          favoriteMovies(existingItems = [], { readField }) {
            return existingItems.filter((itemRef) => readField('tmdbId', itemRef) !== unlikeMovie)
          },
          movie(item = null, { readField }) {
            if (item === null) return;
            return {
              ...item,
              favorite: false
            };
          }
        }
      });
    }
  });

  useEffect(() => {
    setMovie(data?.movie);
    setFavorite(data?.movie.favorite);
  }, [data]);

  const handleLikeBtnClick = () => {
    if (favorite) {
      dislikeMovie({ variables: { movieId: id } });
    } else {
      likeMovie({ variables: { movieId: id } });
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
                date={movie?.releaseDate}
                title={movie?.title}
                handleLikeBtnClick={handleLikeBtnClick}
                isFav={favorite}
                overview={movie?.overview}
                posterPath={movie?.posterPath}
                rating={movie?.voteAverage*10}
              />
            </Stack>
          </Stack>
            {movie && movie.credit.cast.length > 0 ? (
              <ActorsList actors={movie.credit.cast} />
            ) : (
              <></>
            )}
        </>
      )}
    </>
  )
}
