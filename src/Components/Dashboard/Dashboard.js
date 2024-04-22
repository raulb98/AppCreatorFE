import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppList from './AppList';
import Orders from './Orders';
import Cookies from 'universal-cookie';
import OrdersDisplayForm from './Orders_Display_Form';
import DisplayCreateTabs from './DisplayCreateTabs';
import DisplayStocksPage from './DisplayStocksPage';
import DisplayEmployeeTabs from './DisplayEmployeePage'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Dashboard({tab}) {
  const cookie = new Cookies();
  const permissions = cookie.get("p");

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
{permissions == 0 ? 
            <Grid container spacing={2}>
              <Grid item xs={8}>
                 <Item>
                    <DisplayCreateTabs tab={tab}/>
                 </Item>
                 <Item>
                    <AppList my_tab={tab}/>
                  </Item>
              </Grid>
           </Grid>
: null} 
              <Grid container spacing={2}>
                <Orders my_tab={tab}/>
                <Grid item xs={5} md={10}>
                  <OrdersDisplayForm my_tab={tab}/>
                </Grid>
              </Grid>
{permissions == 0 ? 
              <DisplayStocksPage my_tab={tab}/>
: null}

{permissions == 0 ? 

              <DisplayEmployeeTabs my_tab={tab}/>
:null}
      </Container>
  );
};
