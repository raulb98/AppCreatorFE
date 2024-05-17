import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function NavBar() {
  const cookie = new Cookies();
  const name = cookie.get("n");
  const src_path = "static/Avatars/" + name + ".jpg"

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
            <Nav.Link href="/Login">LogIn</Nav.Link>
            <Nav.Link href="/Logout">LogOut</Nav.Link>
            <Nav.Link href="/Signup">SignUp</Nav.Link>
          </Nav>
          <Stack direction="row" spacing={2}>
            <Hello_Message />
            <Avatar alt={name} src={src_path} />
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
