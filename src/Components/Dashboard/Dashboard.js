import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import AppList from './AppList';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import Orders from './Orders';
import Cookies from 'universal-cookie';
import OrdersDisplayForm from './Orders_Display_Form';
import DisplayCreateTabs from './DisplayCreateTabs';
import StocksDisplayForm from './Stocks_Display_Form'
import Stocks from './Stocks';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [tab, setTab] = React.useState(true);


    const toggleDrawer = () => {
      setOpen(!open);
    };

    const toggleRubric = (event) => {
      event.preventDefault();
      if(event.target.innerHTML == "Create Application")
      {
          setTab(1);
      }
      else if(event.target.innerHTML == "Stocks")
      {
          setTab(2);
      }
      else if(event.target.innerHTML == "Orders")
      {
          setTab(3);
      }
    } 

  const DisplayOrders=()=>{
    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (tab == 3)){
        return(
          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          </Paper>
        </Grid>
        )
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" onClick={toggleRubric}>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode == 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              <Grid container spacing={2}>
                <Orders my_tab={tab}/>
                <Grid xs={10} md={10}>
                  <br/>
                  <OrdersDisplayForm my_tab={tab}/>
                </Grid>
                <DisplayOrders />
              </Grid>
              <Grid container spacing={4}>
                <Grid xs={10}>
                  <Item>
                    <Stocks my_tab={tab}/>
                  </Item>
                  <Item>
                    <StocksDisplayForm my_tab={tab}/>
                  </Item>
                </Grid>
             </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
