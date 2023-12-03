import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, sender, receiver, item, amount) {
  return { id, date, sender, receiver, item, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Naga Banten',
    'Nasi',
    1,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'Naga Padang',
    'Nasi',
    1,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Naga Bogor', 'Nasi', 2),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Naga Jakarta',
    'Nasi',
    2,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Naga Depok',
    'Nasi',
    2,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Donation</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>Nama Donatur </TableCell>
            <TableCell>Nama Penerima</TableCell>
            <TableCell>Nama Makanan</TableCell>
            <TableCell align="right">Jumlah</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.sender}</TableCell>
              <TableCell>{row.receiver}</TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        More
      </Link>
    </React.Fragment>
  );
}
