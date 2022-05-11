import React, { useState, useEffect } from 'react'
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box, Card,
    IconButton, FormControl,
    InputLabel, Input,
    InputAdornment, CardHeader,
    Typography, CardContent, Stack, Button, Divider
} from '@mui/material';
import { GoogleLogin } from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google';
import { login } from '../../Services/Services';
import CustomSnackbar from '../Snackbar/snackbar'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { setItemToLocalStorage, setToken } from '../../Services/local';
import Fade from '@mui/material/Fade';


function Login() {
    let navigate = useNavigate();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [success, setSuccess] = useState(() => null);
    const [error, setError] = useState(() => null);
    let Location = useLocation();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        setError(null);
        setSuccess(null);
        event.preventDefault();
        const res = await login({ email: values.email, password: values.password });
        if (res.status === 200) {
            setSuccess({ success: true, message: "Login Succesfull", open: true, severity: "success" });
            setItemToLocalStorage("userINFO", res.data.userInfo);
            await setToken(res.data.token, 1);
            setTimeout(() => {
                navigate('/feed');
            }, 1000);
        }
        else {
            setError({ error: true, message: "invalid credentials", open: true, severity: "error" });

            return
        }
    }
    const responseGoogle = (res) => { }

    useEffect(() => {
        if (Location.state) {
            setSuccess(Location.state.success);
            Location.state = null;
        }
    }, []);


    return (
        <Fade in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 1000 } : {})}
        >
            <div style={{ width: "100%", height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        '& > :not(style)': {
                            m: 1,
                        },
                    }}
                >
                    <Card elevation={20}>
                        <Box sx={{ '& > :not(style)': { textAlign: "center", m: 2, p: 5 } }}>
                            <CardContent>
                                <CardHeader
                                    title={
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                fontFamily: "Ubuntu, san-serif",
                                                fontWeight: 800
                                            }}
                                            variant="h5"
                                            color="primary"
                                        >
                                            Login here
                                        </Typography>
                                    }
                                >

                                </CardHeader>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ justifyContent: "center", mb: 2 }}
                                >
                                    <FormControl variant="standard" sx={{ mb: 2 }}>
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            email address
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange('email')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <Email />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                    <FormControl variant="standard" sx={{ mb: 2 }}>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack
                                    spacing={1}
                                    direction="row"
                                    sx={{ justifyContent: "center", mb: 2 }}
                                >
                                    <Button variant="outlined" size="small" color="error">Cancel</Button>
                                    <Button variant="contained" onClick={handleSubmit} size="small">
                                        Login
                                    </Button>
                                </Stack>
                                <Divider
                                    sx={{ mb: 2 }}
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        other options
                                    </Typography>
                                </Divider>
                                <Stack
                                    spacing={1}
                                    direction="row"
                                    sx={{ justifyContent: "center", mb: 2 }}
                                >
                                    <GoogleLogin
                                        clientId="186822021258-a22h3l16t1vfn0vm2gb4srruekjvrtoi.apps.googleusercontent.com"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                            <GoogleIcon
                                                color="primary"
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                            />
                                        )}
                                        buttonText="Login"
                                    />
                                </Stack>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{ mb: 2 }}
                                >
                                    if you don't have an account.
                                    <Link to="/signup">
                                        sign-up
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card >
                </Box >
                {error && <CustomSnackbar object={error} />
                }
                {success && <CustomSnackbar object={success} />}
            </div >
        </Fade>
    )
}

export default Login
