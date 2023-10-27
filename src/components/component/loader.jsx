import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Stack sx={{ color: 'grey.500',size:'100px' }} spacing={2} direction="row">
      <CircularProgress color="error" />
    </Stack>
  );
}