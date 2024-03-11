import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import { TextField } from '@mui/material';
import BackendService from "../../Services/Services"


export default function StocksDisplayForm({my_tab}) {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [inputFields, setInputFields] = React.useState([
        { Item: '', Quantity: '' }
    ]);
    const intermediate = React.useRef(undefined);

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

     React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const ak = cookie.get('ak');
        if (isSubmit) {
        const fetchData = async () => {
        try{
                var stocks = {};
                for (var index = 0; index < inputFields.length; index++)
                {
                    stocks[inputFields[index].Item] = Number(inputFields[index].Quantity);
                }
                const login_resp = await BackendService.create_stocks(ak, stocks, token);
                if(login_resp.status == 200)
                {
                    setIsSubmit(false);  
                }
          }catch( error ){ setIsSubmit(false); console.log(error); }
          };
          fetchData().then();
        }
   }, [isSubmit]);

    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (my_tab == 2)){
      return(
            <Tabs
                defaultActiveKey="profile"
                id="stockTab"
                className="mb-3"
            >
                <Tab eventKey="StockCreate" title="StockCreateButton">
                    <Form>
                        <Button onClick={addFields}>Insert Stock</Button>
                        <Button onClick={handleOrder} variant="primary" type="submit">
                                Create Stock
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