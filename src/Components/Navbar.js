import Container from 'react-bootstrap/Container';
import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const settings = ['Profile', 'Account', 'Logout'];

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cookie = new Cookies();
  const name = cookie.get("n");
  const src_path = "static/Avatars/" + name + ".jpg"

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Hello_Message=()=>{
    if(name){
      return(
          <Typography color="common.white">
              Hello, {name}
          </Typography>
      );
    }
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand href="#home">AppCreator Project</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/MainPage">MainPage</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            {name ?
            <Nav.Link href="/Logout">LogOut</Nav.Link>
            : 
            <Nav.Link href="/Login">LogIn</Nav.Link>
            }
            <Nav.Link href="/Signup">SignUp</Nav.Link>
          </Nav>
          <Stack direction="row" spacing={2}>
            <Hello_Message />
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={src_path} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
