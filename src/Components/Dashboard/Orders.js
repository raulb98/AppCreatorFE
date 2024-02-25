import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({my_tab}) {
  const [isLoading, setLoading] = React.useState(false);
    
    React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const ak = cookie.get('ak');
        const order = {"paine": 5};
        const fetchData = async () => {
        try{
                const login_resp = await BackendService.create_order(ak, "Mihai", order, token);
                if(login_resp.status == 200)
                {
                    setLoading(true);
                }

          }catch( error ){ console.log(error); }
          };
          fetchData().then();
    }, [isLoading]);

  
  if(isLoading && (my_tab == 3))
  {
    return (
      <React.Fragment>
        <Title>Orders</Title>
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
      </React.Fragment>
    );
  }
  else
  {
    return(
      <React.Fragment>
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </React.Fragment>
    )
  }
}
