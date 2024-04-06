import * as React from 'react';
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
import StocksDisplayForm from './Stocks_Display_Form';

let stocks_row = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function Stocks({stock_created, create_stock_trigger}) {
    const [isLoading, setLoading] = React.useState(false);
    
     console.log(stock_created);
     React.useEffect(() => {
      if((!isLoading && (stocks_row.length == 0)) || (stock_created == true))
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
                   create_stock_trigger();
                   if(stocks_resp != null)
                   {
                        stocks_row = Object.keys(stocks_resp.data)
                                    .map(key => stocks_resp.data[key]);
                   }
               }

         }catch( error ){ console.log(error);}
         };
         fetchDataRead().then();
      }
   }, [isLoading, stock_created]);

  
  if(isLoading || (stocks_row.length != 0))
  {
    return (
      <React.Fragment >
        <Title>Stocks</Title>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>Display Stocks</TableCell>
              <TableCell>Date Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                  stocks_row.map((row) => (
                    row.map((element => 
                            <TableRow>
                                <TableCell><GutterlessList data={element[0]} /></TableCell>
                                <TableCell xs={{marginRight: -1}}>{element[1]}</TableCell>
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
