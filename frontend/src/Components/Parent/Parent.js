import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '../Card/Card';
import Skeleton from '../Skeleton/Skeleton'
import Modal from '../AddPost/Modal';
import { getAllPosts } from '../../Services/Services';
import CustomSnackbar from '../Snackbar/snackbar'
import { Auth } from '../Auth/Auth'
import { useNavigate } from 'react-router-dom'
import { getItemFromLocalStorage } from '../../Services/local'

const fakeSkeleton = [1020, 1024, 2024, 3024, 4050];

function Parent() {
    let Navigate = useNavigate();
    /********************************************************************************/
    /*for getting all states*/
    const [allPosts, setAllPost] = useState(() => []);
    const [success, setSuccess] = useState(() => null);
    const [errors, setErrors] = useState(() => null);
    const [postAdded, setPostAdded] = useState(() => false);
    const [userINFO, setUserInfo] = useState(() => null);
    /********************************************************************************/


    /********************************************************************************/
    //for getting all posts
    function authenticate() {
        if (!Auth()) {
            Navigate('/');
            return;
        }
    }

    async function getsAllPosts() {
        try {
            const res = await getAllPosts(1);
            if (res.message !== "Network Error")
                return res.data.data;
            else {
                throw new Error(res);
            }
        } catch (err) {
            setErrors({
                msg: err.AxiosError,
                variant: "error"
            });
        }
    }


    async function setStatesValue(value, snackbar = {}) {
        await setErrors(null);
        const { error, success, message } = snackbar;
        if (error) {
            console.log(errors);
            setErrors({ error, message, open: true, severity: "error" });
            return;
        }
        await setSuccess(null);
        if (success) {
            setSuccess({ success, message, open: true, severity: "success" });
        }
        setPostAdded(value);
    }

    /********************************************************************************/

    /*use effects */
    useEffect(() => {
        authenticate();
        const get = async () => {
            try {
                const res = await getsAllPosts();
                setStatesValue(false);
                setAllPost(res.results);
            } catch (err) {
                console.error("use Effects", err)
            }
        }
        get();
    }, [postAdded]);


    /********************************************************************************/
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
                    {
                        allPosts.length > 0 ? allPosts.map((post) => <Card key={post._id} userINFO={userINFO} data={post} />)
                            : fakeSkeleton.map(key => <Skeleton key={key} />)
                    }
                </Box>
                <Modal setState={setStatesValue} />
                {/*Snackbars*/}
                {errors && <CustomSnackbar object={errors} />}
                {success && <CustomSnackbar object={success} />}
            </Container>
        </div >
    )
}

export default Parent;