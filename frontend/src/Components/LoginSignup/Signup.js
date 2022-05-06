import React from 'react'
import { AccountCircle, Visibility, VisibilityOff, Email } from '@mui/icons-material';

import {
    Box, Card,
    IconButton, FormControl,
    InputLabel, Input,
    InputAdornment, CardHeader,
    Typography, CardContent, Stack, Button, Link
} from '@mui/material';


function Signup() {
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
    });

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



    return (
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
                                        Register here
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
                                    <InputLabel htmlFor="input-with-icon-adornment-firstName">
                                        first name
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-adornment-firstName"
                                        type="text"
                                        value={values.firstName}
                                        onChange={handleChange('firstName')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <AccountCircle />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl variant="standard" sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="standard-adornment-lastName">last name</InputLabel>
                                    <Input
                                        id="standard-adornment-lastName"
                                        type={'text'}
                                        value={values.lastName}
                                        onChange={handleChange('lastName')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                >
                                                    <AccountCircle />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Stack>


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




                            <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ mb: 2 }}
                            >
                                if you have an account. <Link>sign-in</Link>
                            </Typography>

                            <Stack
                                spacing={1}
                                direction="row"
                                sx={{ justifyContent: "center", mb: 2 }}
                            >
                                <Button variant="outlined" size="small" color="error">Cancel</Button>
                                <Button variant="contained" size="small">Register</Button>
                            </Stack>
                        </CardContent>
                    </Box>
                </Card >
            </Box >
        </div>

    )
}

export default Signup
