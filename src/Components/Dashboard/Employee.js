import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridToolbar} from '@mui/x-data-grid';
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Button } from '@mui/material';
import DeleteEmployee from './DeleteEmployee';
import LinearIndeterminate from '../Utils/LinearIndeterminate';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

let employees_row = [];

export default function Employees({employee_created, create_employee_trigger, delete_employee_trigger}) {
    const [isLoading, setLoading] = React.useState(false);
    const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);
    const [isLoadingDeleted, setLoadingDeleted] = React.useState(false);
    const [newRow, setNewRow] = React.useState(undefined);
    const [employeeDeletedRow, setEmployeeDeleted] = React.useState(undefined);

    const columns = [
      { field: 'email', headerName: 'Email', width: 180, editable: false },
      {
        field: 'name',
        headerName: 'Name',
        editable: true,
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'permis',
        headerName: 'Permissions',
        type: 'number',
        width: 180,
        editable: true,
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
              setEmployeeDeleted(thisRow);
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
    	if(!isLoading)
      	{
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
                                    .map(key => employee_resp.data[key])[0];
  	                 	}
               		}
            	}catch( error ){ console.log(error); }
         	};
          	fetchDataRead().then();
        }
        
		if(isLoadingUpdate){
        	const fetchUpdateRead = async () => {
           	try{
                	const update_emp = await BackendService.update_employee(newRow['email'], newRow['name'], newRow['permis'], token);
                	if(update_emp.status == 200)
                	{
                		setLoadingUpdate(false);
                    	if(employees_row != null)
                    	{
                        employees_row.forEach(function(row) {
                          if(row.email == newRow['email'])
                          {
                            row.email = newRow['email'];
                            row.name = newRow['name'];
                            row.permis = newRow['permis'];
                          }
                        });
                   		}
                    	console.log(employees_row);
                	}
             	}catch( error ){ console.log(error); setLoadingUpdate(false);}
             };
         fetchUpdateRead().then();
      }

	  if(isLoadingDeleted){
		const fetchDeleteRead = async () => {
		   try{
				const update_emp = await BackendService.delete_employee(ak, employeeDeletedRow['email'], token);
				if(update_emp.status == 201)
				{
					setLoadingDeleted(false);
					if(employees_row != null)
					{
						let new_row = [];
						new_row = employees_row.filter(function(row) {
							if(row.email == employeeDeletedRow['email'])
							{
								return false;
							}
							return true;
						});
						employees_row = new_row;
					}
				}
			 }catch( error ){ console.log(error); setLoadingDeleted(false);}
		 };
		 fetchDeleteRead().then();
  }
   }, [isLoading, isLoadingUpdate, isLoadingDeleted]);

  
  if(isLoading || isLoadingUpdate || isLoadingDeleted)
  {
    return (
      <React.Fragment>
        <Title>Employees</Title>
        <TableContainer component={Paper}>
          <DataGrid slots={{toolbar: GridToolbar }} rows={employees_row} columns={columns} />  
        </TableContainer>
      </React.Fragment>
    );
  }
  else
  {
    return (
      <React.Fragment>
        <Title>Employees</Title>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <LinearIndeterminate />
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
