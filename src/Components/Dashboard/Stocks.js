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
import GutterlessList from '../Tools/GutterlessList';

let stocks_row = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function Stocks({my_tab}) {
    const [isLoading, setLoading] = React.useState(false);

     React.useEffect(() => {
      if(!isLoading)
      {
       const cookie = new Cookies();
       const token = cookie.get("jwt");
       const ak = cookie.get('ak');
       const fetchDataRead = async () => {
       try{
               const stocks_resp = await BackendService.read_stocks(ak, token);
               if(stocks_resp.status == 200)
               {
                   setLoading(true);
                   if(stocks_resp != null)
                   {
                        stocks_row = Object.keys(stocks_resp.data)
                                    .map(key => stocks_resp.data[key]);
                   }
               }

         }catch( error ){ console.log(error); }
         };
         fetchDataRead().then();
      }
   }, [isLoading]);

  
  if(isLoading && (my_tab == 2))
  {
    return (
      <React.Fragment>
        <Title>Stocks</Title>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>Display Stocks</TableCell>
              <TableCell>TimeStamps</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
              {
                  stocks_row.map((row) => (
                    row.map((element => 
                            <TableRow>
                                <TableCell><GutterlessList data={element[0]} /></TableCell>
                                <TableCell>{element[1]}</TableCell>
                            </TableRow>
                        ))
                    ))
              }
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
