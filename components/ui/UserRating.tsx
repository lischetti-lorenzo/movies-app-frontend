import { Box, BoxProps, CircularProgress, CircularProgressProps, Typography } from '@mui/material';

export function UserRating(
  props: BoxProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', maxWidth: '75px', maxHeight: '75px', ...props.sx }}>
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        value={props.value}
        sx={{ minWidth: '70px', minHeight: '70px', color: 'yellow'  }}
      />
      <Box
        p={1}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}`}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
        >
          %
        </Typography>
      </Box>
      <Box ml={2} my={'auto'}>
      <Typography
          variant="body1"
          component="div"
          fontSize={17}
          fontWeight={500}
        >
          User Rating
        </Typography>
      </Box>
    </Box>
  );
}
