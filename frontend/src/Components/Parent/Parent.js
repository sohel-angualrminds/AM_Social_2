import React from 'react'
import Header from '../Header/Header'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


function Parent() {
    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </div>
    )
}

export default Parent



