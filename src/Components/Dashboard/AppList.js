import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

let rows = [
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [isLoading, setLoading] = React.useState(false);
  
  async function GetAppsForUser() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    const username = userToken?.name;
    const foreign_key = userToken?.foreign_key;
    
    const dataFetch = async () => {
    const response = await (await fetch('https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/read_apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : username,
          token: token,
          foreign_key : foreign_key
        })
      }));
      if(response.ok){
        return response.json();
      }
    };
    return dataFetch();
  };

  var data = GetAppsForUser();
  data.then( result => {
    if(result && !isLoading)
    {
      setLoading(true);
      rows.push(result);
      console.log(rows);
    }
  });
  
  if(isLoading)
  {
    return (
      <React.Fragment>
        <Title>Applications</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.table_nr}</TableCell>
                <TableCell>{row.tables}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </React.Fragment>
    );
  }
  else
  {
    return(
      <React.Fragment>
      <Title>Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
    )
  }
}
