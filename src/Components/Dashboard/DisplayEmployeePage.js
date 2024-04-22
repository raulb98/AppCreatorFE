import * as React from 'react';
import Employees from './Employee';
import EmployeesDisplayForm from './Employees_Display_Form';
import { Grid } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteEmployee from './DeleteEmployee';


function preventDefault(event) {
  event.preventDefault();
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function DisplayEmployeeTabs({my_tab}) {
  const [employee_created, set_employee_created] = React.useState(false);
  
  const handleCreatedEmployeeTrigger = () => {
    set_employee_created(prevState => !prevState);
  };

  const handleDeletedEmployeeTrigger = () => {
    set_employee_created(prevState => !prevState);
  };

  if(my_tab == 4)
  {
    return (
            <Grid container spacing={2} direction="row">
                <Grid container spacing={2} direction="column" xs={5}>
                    <Grid item>
                        <Item>
                            <EmployeesDisplayForm create_employee_trigger={handleCreatedEmployeeTrigger}/>
                        </Item>
                        <br/>
                        <Item>
                            <DeleteEmployee delete_employee_trigger={handleDeletedEmployeeTrigger}/>
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                        <Employees employee_created={employee_created} create_employee_trigger={handleCreatedEmployeeTrigger}/> 
                    </Item>
                </Grid>
            </Grid>
    );
  }
}
