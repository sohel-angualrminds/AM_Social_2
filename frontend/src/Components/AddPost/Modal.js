import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


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

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Box sx={{ flexGrow: 0 }}
                onClick={handleOpen}

            >
                <Tooltip title="Create Post">
                    <Fab
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 330,
                        }}
                        color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
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
                        <Stack>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton aria-label="upload picture" component="span">
                                    <PhotoSizeSelectActualIcon />
                                </IconButton>
                            </label>
                        </Stack>
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
                            />
                        </Box>
                        <Stack direction="row" spacing={2} sx={{
                            justifyContent: 'center',
                        }}>
                            <Button variant="outlined" onClick={handleClose} color="error" size="small" endIcon={<CancelIcon />}>
                                cancel
                            </Button>
                            <Button variant="contained" size="small" endIcon={<SendIcon />}>
                                Post
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
