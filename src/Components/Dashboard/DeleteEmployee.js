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

export default function DeleteEmployee({delete_employee_trigger, email}) {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('success');

    const handleAlertClose = (event, reason) => {
        setAlertOpen(false);
    };

    const handleEmployeeDelete = (event) => {
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
                const emp_create_resp = await BackendService.delete_employee(ak, email, token);
                if(emp_create_resp.status == 200)
                {
                    setIsSubmit(false);
                    setAlertMessage('Employee Created!');
                    setAlertSeverity('success');
                    delete_employee_trigger();
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
                <Button
                    type="submit" onClick={handleEmployeeDelete}>
{/* { alertOpen == true ?
    <Alert
        severity={alertSeverity}
        onClose={handleAlertClose}
        open={alertOpen}
        sx={{ mt: 2 }}>
            {alertMessage}
    </Alert>
    : <br/>
} */}
                    Delete
                </Button>
        )
     }
}