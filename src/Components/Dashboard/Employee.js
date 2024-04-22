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

let employees_row = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function Employees({employee_created, create_employee_trigger}) {
    const [isLoading, setLoading] = React.useState(false);

     React.useEffect(() => {
      if(!isLoading)
      {
       const cookie = new Cookies();
       const token = cookie.get("jwt");
       const ak = cookie.get("app_key");
       const fetchDataRead = async () => {
       try{
               const employee_resp = await BackendService.read_employees(ak, token);
               if(employee_resp.status == 200)
               {
                  create_employee_trigger();
                   setLoading(true);
                   if(employees_row != null)
                   {
                      employees_row = Object.keys(employee_resp.data)
                                    .map(key => employee_resp.data[key]);
                   }
                   console.log(employees_row);
               }

         }catch( error ){ console.log(error); }
         };
         fetchDataRead().then();
      }
   }, [isLoading]);

  
  if(isLoading)
  {
    return (
      <React.Fragment>
        <Title>Employees</Title>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                  employees_row.map((row) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row}</TableCell>
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
