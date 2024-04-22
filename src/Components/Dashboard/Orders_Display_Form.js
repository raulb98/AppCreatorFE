import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import { TextField, Alert } from '@mui/material';
import BackendService from "../../Services/Services";

export default function OrdersDisplayForm({my_tab}) {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [inputFields, setInputFields] = React.useState([
        { Item: '', Quantity: '' }
    ]);
    const intermediate = React.useRef(undefined);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('success');

    const addFields = () => {
        let newfield = { Item: '', Quantity: '' }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
     }

     const handleOrder = (event) => {
        event.preventDefault();
        setIsSubmit(true);
    };

    const handleAlertClose = (event, reason) => {
        setAlertOpen(false);
    };

     React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const ak = cookie.get('app_key');
        if (isSubmit) {
        const fetchData = async () => {
        try{
                var order = {};
                for (var index = 0; index < inputFields.length; index++)
                {
                    order[inputFields[index].Item] = Number(inputFields[index].Quantity);
                }
                const order_resp = await BackendService.create_order(ak, intermediate.current.value, order, token);
                if(order_resp.status == 200)
                {
                   setIsSubmit(false);
                   setAlertMessage('Order Set!');
                   setAlertSeverity('success');
                   setAlertOpen(true);
                }
                else if(order_resp.status == 201)
                {
                    setIsSubmit(false);
                    setAlertMessage("Something went bad!");
                    setAlertOpen(true);
                    setAlertSeverity('error');
                }
          }catch( error ){ setIsSubmit(false); console.log(error); }
          };
          fetchData().then();
        }
   }, [isSubmit]);

    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (my_tab == 3)){
      return(
            <Tabs
                defaultActiveKey="profile"
                id="orderTab"
                className="mb-3"
            >
                <Tab eventKey="OrderCreate" title="Create Order">
                    <Form>
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
                        <TextField
                                required
                                fullWidth
                                id="Email Employee"
                                label="Email Employee"
                                name="Email Employee"
                                type="Email Employee"
                                margin='normal'
                                inputRef={intermediate}
                                color={"info"}
                            />
                        <Button onClick={addFields}>Insert Product</Button>
                        <Button onClick={handleOrder} variant="primary" type="submit">
                                Create Order
                        </Button>
                        {inputFields.map((input, index) => {
                            return (
                                    <div key={index}>
                                    <TextField
                                        name='Item'
                                        placeholder='Item'
                                        value={input.name}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <TextField 
                                        name='Quantity'
                                        placeholder='Quantity'
                                        value={input.quantity}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <Button onClick={() => removeFields(index)}>Remove Product</Button>
                                    </div>
                                )
                            })}
                    </Form>
                </Tab>
            </Tabs>
        )
     }
}