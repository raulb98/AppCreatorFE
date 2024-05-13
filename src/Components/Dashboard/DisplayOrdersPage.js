import * as React from 'react';
import { Grid } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import OrdersDisplayForm from './Orders_Display_Form';

function preventDefault(event) {
  event.preventDefault();
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function DisplayOrdersPage({my_tab}) {
  const [order_created, set_order_created] = React.useState(false);
  
  const handleCreatedOrderTrigger = () => {
    set_order_created(prevState => !prevState);
  };

  if(my_tab == 3)
  {
    return (
            <Grid container spacing={2} direction="row">
                <Grid container spacing={2} direction="column" xs={5}>
                    <Grid item>
                        <Item>
                            <OrdersDisplayForm create_order_trigger={handleCreatedOrderTrigger}/>
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                        <Orders my_tab={my_tab} order_created={order_created} create_order_trigger={handleCreatedOrderTrigger}/> 
                    </Item>
                </Grid>
            </Grid>
    );
  }
}
