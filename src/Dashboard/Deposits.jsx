import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Jumlah makanan yang di donasi</Title>
      <Typography component="p" variant="h4">
        5
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Lihat Donasi
        </Link>
      </div>
    </React.Fragment>
  );
}
