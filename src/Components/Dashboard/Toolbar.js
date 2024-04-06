import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Dashboard from './Dashboard';
import { mainListItems } from './listItems';

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

const defaultTheme = createTheme();

export default function MyToolbar() {
    const [open, setOpen] = React.useState(true);
    const [tab, setTab] = React.useState(0);

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
    <Dashboard tab={tab}/>
    </Box>
    </Box>
    </ThemeProvider>
  );
};