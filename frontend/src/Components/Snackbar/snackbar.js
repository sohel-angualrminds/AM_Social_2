import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const vertical = "top";
const horizontal = "right"
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function CustomSnackbar(props) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const { error, message, open, severity } = props.object;
        setOpen(open);
        setDetails({ message, error, severity })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert severity={details && details.severity} sx={{ width: '100%' }} onClose={handleClose}>{details && details.message}</Alert>
            </Snackbar>
        </div>
    );
}

