import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Add, Send, PhotoSizeSelectActual } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import { ThemeProvider, styled } from '@mui/material/styles';
import { color } from '../color'
import { postNewPost } from '../../Services/Services'
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

const Input = styled('input')({
    display: 'none',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

export default function TransitionsModal(props) {

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const { setState } = props;


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
        setImageUrl(null);
        setCaption('');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setState(false, { error: true, success: false, message: "please add image !!" });
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("caption", caption);

        const res = await postNewPost(formData);
        if (res.status === 201) {
            setLoading(true);
            setTimeout(() => {
                setState(true, { error: false, success: true, message: "Post Added Succesfully" });
            }, 4000);
        }
        else {
            setLoading(true);
            setTimeout(() => {
                setState(false, { error: true, success: false, message: res.data.message });
            }, 4000);
        }

        setTimeout(() => {
            setLoading(false);
            handleClose();
        }, 3000);
    }

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);



    return (
        <div>
            <Box sx={{ flexGrow: 0 }}
                onClick={handleOpen}>
                <ThemeProvider theme={color}>
                    <Tooltip title="Create Post">
                        <Fab
                            sx={{
                                position: 'fixed',
                                top: 85,
                                right: 360,
                                // boxShadow: "rgba(17, 17, 26, 0.8) 0px 4px 16px, rgba(17, 17, 26, 0.5) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;"
                            }}

                            color="error" aria-label="add">
                            <Add />
                        </Fab>
                    </Tooltip>
                </ThemeProvider>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add New Post
                        </Typography>
                        <Stack
                            spacing={2}
                        >
                            {imageUrl && selectedImage && (
                                <Box mt={2} textAlign="center">
                                    <Box mb={2}>
                                        <Chip label="Image Preview" size="small" />
                                    </Box>
                                    <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                </Box>
                            )}
                            <Stack
                                spacing={2}
                                sx={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <label htmlFor="icon-button-file">
                                    <Input name="image"
                                        accept="image/*" id="icon-button-file" type="file"
                                        onChange={e => setSelectedImage(e.target.files[0])}
                                    />
                                    <Chip label="Upload Image" size="small"
                                        icon={<PhotoSizeSelectActual />} />
                                </label>

                                <Box component="div"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="caption"
                                        color="grey"
                                        label="Caption"
                                        variant="outlined"
                                        size="small"
                                        value={caption}
                                        onChange={e => setCaption(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                        </Stack>

                        <Stack direction="row" spacing={2} sx={{
                            justifyContent: 'center',
                            mt: 2
                        }}>
                            <Button variant="outlined" onClick={handleClose} color="error" size="small" endIcon={<CancelIcon />}>
                                cancel
                            </Button>
                            <LoadingButton
                                loading={loading}
                                loadingPosition="end"
                                onClick={handleSubmit}
                                variant="contained"
                                size="small"
                                endIcon={<Send />}
                            >
                                Post
                            </LoadingButton>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
