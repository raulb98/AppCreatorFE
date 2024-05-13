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
import DeleteOrder from './DeleteOrder';
import LinearIndeterminate from '../Utils/LinearIndeterminate';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridToolbar} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

let orders_row = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({create_order_trigger}) {
    const [isLoading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState([]);
    const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);
    const [isLoadingDeleted, setLoadingDeleted] = React.useState(false);
    const [newRow, setNewRow] = React.useState(undefined);
    const [OrderDeletedRow, setOrderDeleted] = React.useState(undefined);


    /*DE IMPLEMENTAT AICI EDIT*/
    const columns = [
      {
        field: 'email',
        headerName: 'Email',
        editable: true,
        align: 'left',
        flex: 1,
        headerAlign: 'left'
      },
      {
        field: 'id',
        headerName: 'ID',
        editable: false,
      },
      {
        field: 'date',
        headerName: 'Date',
        editable: false,
      },
      {
        field: 'finished',
        headerName: 'Finished',
        type: 'boolean',
        editable: false,
      },
      {
        field: 'order',
        headerName: 'Order',
        editable: true,
        valueGetter: (orders) => JSON.stringify(orders)
      },
      {
        field: "action",
        headerName: "Actions",
        sortable: false,
		    align: 'left',
        headerAlign: 'left',
        renderCell: (params) => {
          const onClickEdit = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            const api = params.api;
            const thisRow = {};
            api
              .getAllColumns()
              .filter((c) => c.field !== "action" && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.row[c.field])
              );
              setNewRow(thisRow);
              setLoadingUpdate(true);
        };

		const onClickDelete = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            const api = params.api;
            const thisRow = {};
            api
              .getAllColumns()
              .filter((c) => c.field !== "action" && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.row[c.field])
              );
              console.log(thisRow);
              setOrderDeleted(thisRow);
              setLoadingDeleted(true);
        };
    
        return  (
				<Stack direction="row" spacing={2}>
					<IconButton aria-label="edit">
						<EditIcon onClick={onClickEdit}/>
					</IconButton>
					<IconButton aria-label="delete">
						<DeleteIcon onClick={onClickDelete}/>
					</IconButton>
				</Stack>
			)
    	}
    }
    ];    

     React.useEffect(() => {
      const cookie = new Cookies();
      const token = cookie.get("jwt");
      const ak = cookie.get("app_key");
      const permissions = cookie.get("p");
      const email = cookie.get("email");

      if(!isLoading)
      {
       const fetchDataRead = async () => {
       try{
            let order_resp;
            if(permissions == 0)
            {
              order_resp = await BackendService.read_orders(ak, "", token);
            }  
            else
            {
              order_resp = await BackendService.read_orders(ak, email, token);
            }
            if(order_resp.status == 200)
            {
              setLoading(true);
              if(orders_row != null)
              {
                orders_row = Object.keys(order_resp.data)
                              .map(key => order_resp.data[key]);

              }
              setOrder(orders_row);
              console.log(orders_row);
            }
         }catch( error ){ console.log(error); }
         };
         fetchDataRead().then();
      }

      if(isLoadingDeleted)
      {
       const fetchDataRead = async () => {
       try{
            let order_resp;
            if(permissions == 0)
            {
              order_resp = await BackendService.delete_order(ak, OrderDeletedRow['id'], permissions, OrderDeletedRow['order'], token);
              if(order_resp.status == 201)
              {
                console.log(orders_row);
                if(orders_row != null)
                {
                  let new_row = [];
                  new_row = orders_row.filter(function(row) {
                    if(row.id == OrderDeletedRow['id'])
                    {
                      return false;
                    }
                    return true;
                  });
                  orders_row = new_row;
                }
              }
              setLoadingDeleted(false);
            }  
         }catch( error ){ console.log(error); setLoadingDeleted(false); }
         };
         fetchDataRead().then();
      }

   }, [isLoading, isLoadingDeleted]);

  
  if(isLoading || isLoadingDeleted)
  {
    return (
      <React.Fragment>
        <Title>Orders</Title>
          <TableContainer component={Paper}>
            <DataGrid getRowId={(row) => row.id} slots={{toolbar: GridToolbar }} rows={orders_row} columns={columns} />  
          </TableContainer>
      </React.Fragment>
    );
  }
  else
  {
    return (
      <React.Fragment>
        <Title>Orders</Title>
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
    );
  }
}
