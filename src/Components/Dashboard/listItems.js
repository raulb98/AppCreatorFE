import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText id="Create Application" primary="Create Application"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText id="Employee" primary="Employee"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText id="Stocks" primary="Stocks"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText id="Orders" primary="Orders"/>
        </ListItemButton>
    </React.Fragment>
);