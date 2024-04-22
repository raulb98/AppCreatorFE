import * as React from 'react';
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';

function preventDefault(event) {
  event.preventDefault();
}

export default function DeleteOrder({email}) {
    const [isSubmit, setIsSubmit] = React.useState(false);

    const deleteOrder = (event) => {
      event.preventDefault();
      setIsSubmit(true);
    };
     
    React.useEffect(() => {
        if(isSubmit)
        {
         const cookie = new Cookies();
         const token = cookie.get("jwt");
         const ak = cookie.get("app_key");
         const fetchDataRead = async () => {
         try{
                //const employee_resp = await BackendService.delete_employee(ak, email, token); 
           }catch( error ){ console.log(error); }
           };
           fetchDataRead().then();
        }
     }, [isSubmit]);

    return (
        <Button onClick={deleteOrder} variant="primary" type="submit">
            Delete Order
        </Button>
    );
}
