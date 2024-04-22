import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PropTypes from 'prop-types';
import {useState} from 'react';
import sha256 from "crypto-js/sha256";
import {useNavigate} from "react-router-dom";
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AppCreator
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [userLogindata, setUserLogindata] = useState(
        {password: "", email: ""}
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
    };

    const navigate = useNavigate();

    const handleChange = async (event) => {
        const value = event.target.value;
        setUserLogindata({
            ...userLogindata,
            [event.target.name]: value
        })
    };

    React.useEffect(() => {
        const cookies = new Cookies();
        if (isSubmit) {
            const fetchData = async () => {
                try {
                    const login_resp = await BackendService.login(
                        userLogindata["email"],
                        sha256(userLogindata["password"]).toString()
                    );
                    if (login_resp.status == 200) {
                        console.log(login_resp.data["app_key"]);
                        cookies.set("app_key", login_resp.data["app_key"]);
                        cookies.set("email", userLogindata["email"]);
                        cookies.set("jwt", login_resp.data["token"]);
                        cookies.set("p", login_resp.data["permis"]);
                        cookies.set("n", login_resp.data["name"]);
                        navigate("/");
                    }
                } catch (error) {
                    setIsSubmit(false);
                }
            };
            fetchData().then();
        }
    }, [isSubmit]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                    <Avatar
                        sx={{m: 1,bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate="noValidate" sx={{ mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={(event) => handleChange(event)}
                            autoFocus/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(event) => handleChange(event)}
                            autoComplete="current-password"/>
                        <FormControlLabel
                            control={<Checkbox value = "remember" color = "primary" />}
                            label="Remember me"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3,mb: 2}}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright
                    sx={{mt: 8,mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}