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
import LinearIndeterminate from '../Utils/LinearIndeterminate';
import { DataGrid, GridColDef, GridApi, GridCellValue , GridToolbar } from '@mui/x-data-grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { MarkEmailReadTwoTone } from '@mui/icons-material';

let stocks_row = [];
let chart_row = [];
let chart_lines = {};
let chart_lines_arr = [];

function preventDefault(event) {
  event.preventDefault();
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Stocks({stock_created, create_stock_trigger}) {
    const [isLoading, setLoading] = React.useState(false);
    const [stocks, setStocks] = React.useState([]);

    const columns = [
      {
        field: 'stock',
        headerName: 'Stock',
        editable: false,
        align: 'left',
        flex: 3,
        headerAlign: 'left',
        valueGetter: (stocks) => JSON.stringify(stocks)
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 180,
        editable: false,
      }
    ];

     React.useEffect(() => {
      if(!isLoading || stock_created)
      {
       const cookie = new Cookies();
       const token = cookie.get("jwt");
       const ak = cookie.get("app_key");
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
                                    .map(key => {
                                      return stocks_resp.data[key];
                                    })[0];

                        for (const [key, val] of Object.entries(stocks_row[0]['stock'])) {
                          if(!chart_row.find((element) => element.label == key))
                          {
                            chart_row.push({value: val, label: key})
                          }
                        }
                        
                        var idx = 0;
                        let marked = [];
                        for (idx = 0; idx < stocks_row.length; idx++)
                        {
                          for (const [key, val] of Object.entries(stocks_row[idx]['stock'])) {
                            if(marked.indexOf(key) == -1)
                            {
                              marked.push(key);
                              chart_lines[key] = {curve: "monotoneX", data: [val]};
                            }
                            else
                            {
                              chart_lines[key]['data'].push(val);
                            }
                          }
                        }
                        
                        marked = [];
                        for (const [key, val] of Object.entries(chart_lines)) {
                          if(marked.indexOf(key) == -1)
                          {
                            marked.push(key);
                            chart_lines_arr.push(val);
                          }
                        }
                        
                        console.log(chart_lines_arr);
                        setStocks(stocks_row);
                   }
                   console.log(stocks_row);
               }
         }catch( error ){ console.log(error);}
         };
         fetchDataRead().then();
      }
   }, [isLoading]);

  
  if(isLoading || (stocks_row.length != 0))
  {
    return (
      <React.Fragment >
        <Title>Stocks</Title>
          <Grid container direction="row">
            <Grid item>
              <Item>
                <DataGrid   slots={{ toolbar: GridToolbar }} 
                    rows={stocks_row} columns={columns} />
              </Item>
            </Grid>
            <Grid item>
              <Item>  
                <PieChart
                  series={[{data : chart_row}]}
                  width={400}
                  height={200}
                />
            </Item>
          </Grid>
          <Grid item>
              <Item>
              <LineChart
                series={chart_lines_arr}
                width={500}
                height={300}
              />
            </Item>
          </Grid>
          </Grid>
      </React.Fragment>
    );
  }
  else
  {
    return (
      <React.Fragment >
        <Title>Stocks</Title>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
            <LinearIndeterminate />
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    )
  };
}
