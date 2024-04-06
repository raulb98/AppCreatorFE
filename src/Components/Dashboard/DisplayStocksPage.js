import * as React from 'react';
import Stocks from './Stocks';
import StocksDisplayForm from './Stocks_Display_Form';
import { Grid } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

function preventDefault(event) {
  event.preventDefault();
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function DisplayStocksPage({my_tab}) {
  const [stock_created, set_stock_created] = React.useState(false);
  
  const handleCreatedStockTrigger = () => {
    set_stock_created(prevState => !prevState);
  };

  if(my_tab == 2)
  {
    return (
            <Grid container spacing={2} direction="row">
                <Grid container spacing={2} direction="column" xs={5}>
                    <Grid item>
                        <Item>
                            <StocksDisplayForm create_stock_trigger={handleCreatedStockTrigger}/>
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                        <Stocks stock_created={stock_created} create_stock_trigger={handleCreatedStockTrigger}/> 
                    </Item>
                </Grid>
            </Grid>
    );
  }
}
