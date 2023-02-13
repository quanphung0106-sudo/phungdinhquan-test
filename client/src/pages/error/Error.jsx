import { Box } from '@mui/material';

export default function Error() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>This page is not exist!!!!</h1>
    </Box>
  );
}
