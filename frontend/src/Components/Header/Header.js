import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { clearAll, getItemFromLocalStorage } from '../../Services/local';
import { useNavigate } from 'react-router-dom';
import "./header.css"


const settings = [
    { id: "1qw2", name: 'Edit Profile', callableFunction: "editProfile" },
    { id: "2rt3", name: 'Change Password', callableFunction: "changePassword" },
    { id: "3yu4", name: 'Logout', callableFunction: "logout" }
];

function Header(props) {
    let Navigate = useNavigate();
    /******************************************************************************/
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userINFO, setUserINFO] = useState(() => null);
    /******************************************************************************/
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const editProfile = () => { console.log("edit profile") }
    const changePassword = () => { console.log("change password") }
    const logout = () => {
        clearAll();
        Navigate('/');
    }

    //calling different different functions over here
    function callFunction(functionName) {
        switch (functionName) {
            case 'editProfile': editProfile(); break
            case 'changePassword': changePassword(); break
            case 'logout': logout(); break
            default: return;
        }
    }
    /******************************************************************************/
    //use effects
    useEffect(() => {
        let user = getItemFromLocalStorage()
        settings.unshift({
            id: "userInfo7",
            name: `${user.firstName} ${user.lastName}`,
            callableFunction: "noCall"
        })
        setUserINFO(getItemFromLocalStorage());
    }, []);



    /******************************************************************************/
    return (
        <AppBar position="sticky" sx={{ bgcolor: "white", color: "black" }}>
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>

                    <Stack direction={"row"} sx={{ alignItems: "center", cursor: "pointer" }}>
                        <CameraEnhanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Macondo,cursive',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            AM-Feed
                        </Typography>

                        <CameraEnhanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Macondo,cursive',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                                color: "#1a237e"
                            }}
                        >
                            AM-Feed
                        </Typography>
                    </Stack>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt={userINFO && `${userINFO.firstName} ${userINFO.lastName}`}
                                    src="/static/images/avatar/2.jpg" />
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
                                <Box key={setting.id}>
                                    {setting.name === "Logout" && <Divider sx={{ m: 0 }} />}
                                    <MenuItem key={setting.id}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            callFunction(setting.callableFunction)
                                        }}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                    {setting.id === "userInfo7" && <Divider sx={{ m: 0 }} />}
                                </Box>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
