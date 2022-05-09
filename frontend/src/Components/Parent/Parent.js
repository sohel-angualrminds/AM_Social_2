import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '../Card/Card';
import Skeleton from '../Skeleton/Skeleton'
import Modal from '../AddPost/Modal';
import { getAllPosts } from '../../Services/Services';
import Snakbar from '../Snackbar/Snackbars';

const fakeSkeleton = [1020, 1024, 2024, 3024, 4050];


function Parent() {
    /*for getting all states*/
    const [allPosts, setAllPost] = useState(() => []);
    const [error, setError] = useState(null);

    /********************************************************************************/
    //for getting all posts
    async function getsAllPosts() {
        try {
            const res = await getAllPosts(1);
            if (res.message !== "Network Error")
                return res.data.data;
            else {
                throw new Error(res);
            }
        } catch (err) {
            console.log(err);
            setError({
                msg: err.AxiosError,
                variant: "error"
            });
        }
    }


    /********************************************************************************/

    /*use effects */
    useEffect(() => {
        const get = async () => {
            try {
                const res = await getsAllPosts();
                // console.log(res);
                setAllPost(res.results);
            } catch (err) {
                console.error("use Effects", err)
            }
        }
        get();
    }, []);

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
                        allPosts.length > 0 ?
                            allPosts.map((post) => <Card key={post._id} data={post} />) :
                            fakeSkeleton.map(key => <Skeleton key={key} />)
                    }
                </Box>
                <Modal />
                {error && <Snakbar />}
            </Container>
        </div >
    )
}

export default Parent;