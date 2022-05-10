import React, { useState } from 'react'
import { AccountCircle, Visibility, VisibilityOff, Email } from '@mui/icons-material';
import Fade from '@mui/material/Fade';
import { useNavigate, Link } from 'react-router-dom';
import { validate } from '../validation'
import {
    Box, Card,
    IconButton,
    InputAdornment, CardHeader,
    Typography, CardContent, Stack, Button, TextField
} from '@mui/material';


function Signup() {
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
    });

    const [error, setError] = useState(null);

    const handleChange = (event, prop) => {
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

    const checkName = (prop) => (event) => {
        if (validate.name(event.target.value)) {
            setError({ ...error, [prop]: { status: true, text: `${prop} length greter than 4` } });
        } else {
            setError({ ...error, [prop]: null })
        }
    }
    const checkPassword = (e,prop) => {
        if (validate.password(e.target.value)) {
            
        } else {
            
        }
    }

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
                                    <TextField
                                        id="first-name"
                                        label=" first name"
                                        value={values.firstName}
                                        onChange={(e) => handleChange(e, 'firstName')}
                                        onBlur={checkName('firstName')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <AccountCircle />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        error={error && error.firstName && error.firstName.status}
                                        helperText={error && error.firstName && error.firstName.text}
                                        required
                                    />

                                    <TextField
                                        id="last-name"
                                        label="last name"
                                        value={values.lastName}
                                        onChange={(e) => handleChange(e, 'lastName')}
                                        onBlur={checkName('lastName')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <AccountCircle />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        error={error && error.lastName && error.lastName.status}
                                        helperText={error && error.lastName && error.lastName.text}
                                        required
                                    />
                                </Stack>


                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ justifyContent: "center", mb: 2 }}
                                >
                                    <TextField
                                        sx={{ mb: 2 }}
                                        id="email"
                                        label="email"
                                        type="email"
                                        value={values.email}
                                        onChange={(e) => handleChange(e, 'email')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <Email />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        required
                                    />

                                    <TextField
                                        sx={{ mb: 2 }}
                                        id="password"
                                        label="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e, 'password');
                                            checkPassword(e);
                                        }}
                                        error={error && error.password && error.password.status}
                                        helperText={error && error.password && error.password.text}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        required
                                    />
                                </Stack>
                                <Stack
                                    spacing={1}
                                    direction="row"
                                    sx={{ justifyContent: "center", mb: 2 }}
                                >
                                    <Button variant="outlined" size="small" color="error">Cancel</Button>
                                    <Button variant="contained" size="small">Register</Button>
                                </Stack>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{ mb: 2 }}
                                >
                                    if you have an account. <Link to="/">sign-in</Link>
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card >
                </Box >
            </div>
        </Fade>
    )
}

export default Signup
