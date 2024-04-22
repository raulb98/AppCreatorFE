import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import sha256 from "crypto-js/sha256";
import BackendService from "../../Services/Services"

const defaultTheme = createTheme();

export default function SignUpUser() {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [userSignUpdata, setSignUpData] = React.useState(
        {password: "", email: "", name: ""}
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
    };

    const handleChange = async (event) => {
        const value = event.target.value;
        setSignUpData({
            ...userSignUpdata,
            [event.target.name]: value
        })
    };

    React.useEffect(() => {
        if (isSubmit) {
            const fetchData = async () => {
                try {
                    const sign_up_resp = await BackendService.create_client(
                        userSignUpdata["email"],
                        sha256(userSignUpdata["password"]).toString(),
                        userSignUpdata["name"],
                    );
                    if (sign_up_resp.status == 200) {
                        console.log(sign_up_resp);
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
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main'
                        }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3
                        }}>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="name"
                                    label="First Name"
                                    onChange={(event) => handleChange(event)}
                                    autoFocus="autoFocus"/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={(event) => handleChange(event)}
                                    autoComplete="email"/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(event) => handleChange(event)}
                                    autoComplete="new-password"/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth="fullWidth"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>
                            Sign Up
                        </Button>
                        <Grid container="container" justifyContent="flex-end">
                            <Grid item="item">
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
