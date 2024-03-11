import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function NavBar() {
  const cookie = new Cookies();
  const email = cookie.get("email");

  const Hello_Message=()=>{
    if(email){
      return(
          <Typography color="common.white">
              Hello, {email}
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
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Blog">Blog</Nav.Link>
          </Nav>
          <Stack direction="row" spacing={2}>
            <Hello_Message />
            <Avatar alt="Raul" src="static/Avatars/Raul.jpg" />
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;