import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import { TextField, Alert } from '@mui/material';
import BackendService from "../../Services/Services"
import Box from '@mui/material/Box';
import sha256 from "crypto-js/sha256";

export default function EmployeesDisplayForm({create_employee_trigger}) {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [newEmployeeData, setNewEmployeeData] = React.useState(
        {password: "", email: "", name: "", permissions: ""}
    );
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('success');

    const handleChange = async (event) => {
        const value = event.target.value;
        setNewEmployeeData({
            ...newEmployeeData,
            [event.target.name]: value
        })
    };

    const handleAlertClose = (event, reason) => {
        setAlertOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
    };

     React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const ak = cookie.get("app_key");
        if (isSubmit) {
            const fetchData = async () => {
            try{
                const emp_create_resp = await BackendService.create_employee(ak, newEmployeeData["email"],
                sha256(newEmployeeData["password"]).toString(), newEmployeeData["name"], newEmployeeData["permissions"], token);
                if(emp_create_resp.status == 200)
                {
                    setIsSubmit(false);
                    setAlertMessage('Employee Created!');
                    setAlertSeverity('success');
                    create_employee_trigger();
                    setAlertOpen(true);
                }
                else if (emp_create_resp.status == 503)
                {
                    setIsSubmit(false);
                    setAlertMessage('Employee Failed to Update!');
                    setAlertSeverity('error');
                    setAlertOpen(true);
                }
            }catch( error ){ setIsSubmit(false); console.log(error); }
          };
          fetchData().then();
        }
   }, [isSubmit]);

    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token){
      return(
            <Tabs
                defaultActiveKey="profile"
                id="employeeTab"
                className="mb-3"
            >
                <Tab eventKey="EmployeeCreate" title="Employee Create">
                        { alertOpen == true ?
                                <Alert
                                    severity={alertSeverity}
                                    onClose={handleAlertClose}
                                    open={alertOpen}
                                    sx={{ mt: 2 }}
                                    >
                                    {alertMessage}
                                </Alert>
                                : <br/>
                        }
                        <Box component="form" onSubmit={handleSubmit} noValidate="noValidate" sx={{ mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    name='email'
                                    label="Email"
                                    placeholder='Email'
                                    onChange={event => handleChange(event)}
                                />
                                <TextField 
                                    margin="normal"
                                    required
                                    label="Name"
                                    name='name'
                                    placeholder='Name'
                                    onChange={event => handleChange(event)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(event) => handleChange(event)}
                                    autoComplete="current-password"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    name="permissions"
                                    label="Permissions"
                                    id="permissions"
                                    onChange={(event) => handleChange(event)}
                                />
                                <Button
                                    type="submit">
                                    Create New Employee
                                </Button>
                        </Box>
                </Tab>
            </Tabs>
        )
     }
}