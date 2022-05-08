import React from 'react'
import Header from '../Header/Header'

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '../Card/Card'
import Skeleton from '../Skeleton/Skeleton'
import Modal from '../AddPost/Modal'

function Parent() {
    return (
        <div>
            <Header />
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 0,
                    alignItems: "center"
                }}>
                    <Card />
                    <Card />
                    <Card />
                </Box>
                <Modal />

            </Container>
        </div >
    )
}

export default Parent




// <Box sx={{
//     height: "90vh",
//     transform: 'translateZ(0px)',
//     border: "1px solid black"
// }}
//     position="sticky"
// >
//     <SpeedDial
//         ariaLabel="SpeedDial basic example"
//         sx={{

//             bottom: 16,
//             right: 16,
//         }}
//         icon={<SpeedDialIcon sx={{ color: "black" }} />}
//         open={false}
//         FabProps={{
//             sx: {
//                 bgcolor: 'white',
//                 '&:hover': {
//                     bgcolor: 'white',
//                 }
//             }
//         }}
//     >
//     </SpeedDial>
// </Box>