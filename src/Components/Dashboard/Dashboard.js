import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import AppList from './AppList';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [tab, setTab] = React.useState(true);
  const [nodes, setNodes] = React.useState({});
  const appName = useRef(undefined);
  const description = useRef(undefined);
  const [respnse, setResponse] = React.useState(null);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleRubric = (event) => {
    event.preventDefault();
    if(event.target.innerHTML == "Create Application")
    {
        setTab(1);
    }
    else if(event.target.innerHTML == "Dashboard")
    {
        setTab(2);
    }
    else if(event.target.innerHTML == "Orders")
    {
        setTab(3);
    }
  } 

  async function handleAppsClick() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    const username = userToken?.name;
    const foreign_key = userToken?.foreign_key;
    
    return fetch('https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : username,
          app_name: appName.current.value,
          token: token,
          foreign_key : foreign_key
        })
      }).then(data => data.json())
  };


   const Display_Create_Tabs=()=> {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    if(token && (tab == 1)){

      return(
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="AppCreator" title="AppCreatorButton">
                    <Form onSubmit={handleAppsClick}>
                        <Form.Group className="mb-3" controlId="AppName">
                            <Form.Label>Application Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Application Name" ref={appName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="AppDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} ref={description} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                                Create
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        )
    }
  }

  const Display_Paper_Primary=()=>{
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    if(token && (tab == 1)){
        return(
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
        )
    }
  }

  const Display_Paper_Secondary=()=>{
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    if(token && (tab == 1)){
        return(
          <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          </Paper>
        </Grid>
        )
    }
  }

  const Display_Paper_Tertiary=()=>{
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    if(token && (tab == 1)){
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
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Display_Create_Tabs />
            <Grid container spacing={3}>
              {/* Chart */}
              <Display_Paper_Primary />
              {/* Recent Deposits */}
              <Display_Paper_Secondary />
                  <AppList />
              {/* Recent Orders */}
              <Display_Paper_Tertiary />
              </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
