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
import { useRef } from 'react';
import Orders from './Orders';
import Cookies from 'universal-cookie';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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
  const appName = useRef(undefined);
  const description = useRef(undefined);


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

  async function handleAppsClick() { // ASTA TREBUIE TRECUT IN SERVICES
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken?.jwt;
    const username = userToken?.name;
    const foreign_key = userToken?.foreign_key;
    
    return fetch('http://127.0.0.1:8080/create', {
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


  const DisplayCreateOrderTabs=()=> {
    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (tab == 3)){
      return(
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="OrderCreate" title="OrderCreateButton">
                    <Form>
                        <Form.Group className="mb-3" controlId="Order">
                            <Form.Label>Order</Form.Label>
                            <Form.Control type="text" placeholder="Enter Order"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="AppDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                                Create Oder
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        )
    }
  }

   const DisplayCreateTabs=()=> {
    const cookie = new Cookies();
    const token = cookie.get("jwt");
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

  const DisplayPaperPrimary=()=>{
    const cookie = new Cookies();
    const token = cookie.get("jwt");
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

  const DisplayPaperSecondary=()=>{
    const cookie = new Cookies();
    const token = cookie.get("jwt");
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

  const DisplayPaperTertiary=()=>{
    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (tab == 1)){
        return(
          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          </Paper>
        </Grid>
        )
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
          <DisplayCreateTabs />
            <Grid container spacing={3}>
              {/* Chart */}
              <DisplayPaperPrimary />
              {/* Recent Deposits */}
              <DisplayPaperSecondary />
                  <AppList my_tab={tab}/>
              {/* Recent Orders */}
              <DisplayPaperTertiary />
                  <Orders my_tab={tab}/>
              <DisplayCreateOrderTabs />
              </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
