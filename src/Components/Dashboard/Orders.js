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
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Button } from '@mui/material';
import GutterlessList from '../Tools/GutterlessList';

let orders_row = []

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({my_tab}) {
    const [isLoading, setLoading] = React.useState(false);
    

    /*
       {
          Object.keys(row[4]).map((key, index) => ( 
            <TableCell align="right">{key} | {row[4][key]}</TableCell> 
          ))
        } 
    */

    const displayOrder = (event) => {
      const id = event.currentTarget.getAttribute("data-rowid");
      console.log(id);
    };

     React.useEffect(() => {
      if(!isLoading)
      {
       const cookie = new Cookies();
       const token = cookie.get("jwt");
       const ak = cookie.get('ak');
       const fetchDataRead = async () => {
       try{
               const login_resp = await BackendService.read_orders(ak, token);
               if(login_resp.status == 200)
               {
                   setLoading(true);
                   //console.log(login_resp.data);
                   for(var index = 0; index < login_resp.data.length; index++)
                   {
                      var found_item = false;
                      for(var jdx = 0; jdx < orders_row.length; jdx++)
                      {
                        if(login_resp.data[index] === orders_row[jdx])
                          found_item = true;
                      }
                      if (!found_item)
                      orders_row.push(login_resp.data[index]);
                   }
                   console.log(orders_row);
               }

         }catch( error ){ console.log(error); }
         };
         fetchDataRead().then();
      }
   }, [isLoading]);

  
  if(isLoading && (my_tab == 3))
  {
    return (
      <React.Fragment>
        <Title>Orders</Title>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell align="right">Intermediate</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Finished</TableCell>
              <TableCell align="right">Display Order</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
              {
                  orders_row.map((row) => (
                    <TableRow key={row[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="right">{row[1]}</TableCell>
                        <TableCell align="right">{row[3]}</TableCell>
                        <TableCell align="right">{row[2]}</TableCell>
                        <TableCell align="right"><GutterlessList data={row[4]}/></TableCell>
                    </TableRow>
                    ))
              }
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
